export interface Opportunity {
  sfid: string;
  name: string;
  accountid: string;
  closedate: string;
  amount: number;
  stagename: string;
  type: string;
  createddate: string;
  total_price__c: number;
  total_payments__c: number;
  remaining_balance__c: number;
  shipping_address1__c: string | null;
  shipping_address2__c: string | null;
  shipping_address3__c: string | null;
  shipping_city__c: string | null;
  shipping_state__c: string | null;
  shipping_zip_postal__c: string | null;
  shippingcountry__c: string | null;
  shipping_email__c: string | null;
  shipping_phone__c: string | null;
  shipping_method__c: string | null;
  shipping_charge__c: number | null;
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