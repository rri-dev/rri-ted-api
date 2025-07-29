export interface Opportunity {
  sfid: string;
  name: string;
  accountid: string;
  account_email__c: string;
  closedate: string;
  amount: number;
  stagename: string;
  type: string;
  createddate: string;
  total_price__c: number;
  total_payments__c: number;
  remaining_balance__c: number;
  firstname: string | null;
  lastname: string | null;
  personemail: string | null;
  phone: string | null;
  lineItems?: OpportunityLineItem[];
}

export interface OpportunityLineItem {
  sfid: string;
  opportunityid: string;
  product2id: string;
  productcode: string;
  name: string;
  quantity: number;
  unitprice: number;
  totalprice: number;
}

export interface PaginationParams {
  limit: number;
  offset: number;
}

export interface DateRangeParams {
  startDate: string;
  endDate: string;
}

export interface OpportunityQueryParams extends PaginationParams, DateRangeParams {}