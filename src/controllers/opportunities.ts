import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import { pool } from '../config/database';
import { Opportunity, OpportunityLineItem } from '../types';

export const getOpportunities = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { 
      startDate, 
      endDate, 
      limit = '20', 
      offset = '0' 
    } = req.query as Record<string, string>;

    if (!startDate || !endDate) {
      res.status(400).json({ error: 'startDate and endDate are required query parameters' });
      return;
    }

    const limitNum = parseInt(limit);
    const offsetNum = parseInt(offset);

    if (isNaN(limitNum) || limitNum < 1 || limitNum > 100) {
      res.status(400).json({ error: 'limit must be a number between 1 and 100' });
      return;
    }

    if (isNaN(offsetNum) || offsetNum < 0) {
      res.status(400).json({ error: 'offset must be a non-negative number' });
      return;
    }

    const productCode = process.env.PRODUCT_CODE;
    if (!productCode) {
      res.status(500).json({ error: 'PRODUCT_CODE environment variable not configured' });
      return;
    }

    const opportunitiesQuery = `
      SELECT DISTINCT
        o.sfid,
        o.name,
        o.accountid,
        o.closedate,
        o.amount,
        o.stagename,
        o.type,
        o.createddate,
        o.total_price__c,
        o.total_payments__c,
        o.remaining_balance__c,
        o.shipping_address1__c,
        o.shipping_address2__c,
        o.shipping_address3__c,
        o.shipping_city__c,
        o.shipping_state__c,
        o.shipping_zip_postal__c,
        o.shippingcountry__c,
        o.shipping_email__c,
        o.shipping_phone__c,
        o.shipping_method__c,
        o.shipping_charge__c,
        a.firstname,
        a.lastname,
        a.personemail,
        a.phone
      FROM salesforce.opportunity o
      INNER JOIN salesforce.opportunitylineitem oli ON o.sfid = oli.opportunityid
      LEFT JOIN salesforce.account a ON o.accountid = a.sfid
      WHERE o.stagename = 'Closed Won'
        AND o.closedate >= $1
        AND o.closedate <= $2
        AND oli.productcode = $3
        AND o.isdeleted = false
        AND oli.isdeleted = false
        AND o.amount > 0
      ORDER BY o.closedate DESC
      LIMIT $4 OFFSET $5
    `;

    const countQuery = `
      SELECT COUNT(DISTINCT o.sfid) as total
      FROM salesforce.opportunity o
      INNER JOIN salesforce.opportunitylineitem oli ON o.sfid = oli.opportunityid
      LEFT JOIN salesforce.account a ON o.accountid = a.sfid
      WHERE o.stagename = 'Closed Won'
        AND o.closedate >= $1
        AND o.closedate <= $2
        AND oli.productcode = $3
        AND o.isdeleted = false
        AND oli.isdeleted = false
    `;

    const [opportunitiesResult, countResult] = await Promise.all([
      pool.query<Opportunity>(opportunitiesQuery, [startDate, endDate, productCode, limitNum, offsetNum]),
      pool.query<{ total: string }>(countQuery, [startDate, endDate, productCode])
    ]);

    const opportunities = opportunitiesResult.rows;
    const total = parseInt(countResult.rows[0]?.total || '0');

    if (opportunities.length > 0) {
      const opportunityIds = opportunities.map(o => o.sfid);
      
      const lineItemsQuery = `
        SELECT 
          sfid,
          opportunityid,
          product2id,
          productcode,
          name,
          quantity,
          unitprice,
          totalprice
        FROM salesforce.opportunitylineitem
        WHERE opportunityid = ANY($1)
          AND isdeleted = false
        ORDER BY opportunityid, name
      `;

      const lineItemsResult = await pool.query<OpportunityLineItem>(lineItemsQuery, [opportunityIds]);
      
      const lineItemsByOpportunity = lineItemsResult.rows.reduce((acc, item) => {
        if (!acc[item.opportunityid]) {
          acc[item.opportunityid] = [];
        }
        acc[item.opportunityid].push(item);
        return acc;
      }, {} as Record<string, OpportunityLineItem[]>);

      opportunities.forEach(opp => {
        opp.lineItems = lineItemsByOpportunity[opp.sfid] || [];
      });
    }

    res.json({
      data: opportunities,
      pagination: {
        total,
        limit: limitNum,
        offset: offsetNum,
        hasMore: offsetNum + limitNum < total
      }
    });
  } catch (error) {
    console.error('Error fetching opportunities:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};