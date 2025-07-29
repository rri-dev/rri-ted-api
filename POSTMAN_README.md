# RRI TED API - Postman Collection

This folder contains Postman collection and environment files for testing the RRI TED API.

## Files

1. **RRI-TED-API.postman_collection.json** - The main collection file with all API endpoints
2. **RRI-TED-API.postman_environment.json** - Environment variables for production

## How to Use

### Import into Postman

1. Open Postman
2. Click "Import" button in the top left
3. Select both JSON files:
   - `RRI-TED-API.postman_collection.json`
   - `RRI-TED-API.postman_environment.json`
4. Click "Import"

### Set Up Environment

1. In Postman, click the environment dropdown (top right)
2. Select "RRI TED API - Production"
3. The API key is already configured with the current production key

### Test the API

The collection includes several example requests:

1. **Get Opportunities** - Main endpoint with all parameters
2. **Get Opportunities - First Page** - Example for getting the first page
3. **Get Opportunities - Second Page** - Example for pagination (offset=20)
4. **Get Opportunities - Large Batch** - Example for maximum batch size (100 records)
5. **Get Opportunities - Monthly** - Example for getting a specific month

### API Parameters

- **startDate** (required): Start date for filtering (YYYY-MM-DD format)
- **endDate** (required): End date for filtering (YYYY-MM-DD format)
- **limit** (optional): Number of records per page (default: 20, max: 100)
- **offset** (optional): Starting position for pagination (default: 0)

### Response Format

```json
{
  "data": [
    {
      "sfid": "0061234567890ABC",
      "name": "Opportunity Name",
      "accountid": "0011234567890ABC",
      "account_email__c": "customer@example.com",
      "closedate": "2024-03-15",
      "amount": 5000,
      "stagename": "Closed Won",
      "type": "New Business",
      "createddate": "2024-03-01T10:00:00.000Z",
      "total_price__c": 5000,
      "total_payments__c": 5000,
      "remaining_balance__c": 0,
      "firstname": "John",
      "lastname": "Doe",
      "personemail": "john.doe@example.com",
      "phone": "+1234567890",
      "lineItems": [
        {
          "sfid": "00k1234567890ABC",
          "opportunityid": "0061234567890ABC",
          "product2id": "01t1234567890ABC",
          "productcode": "PROD-001",
          "name": "Product Name",
          "quantity": 1,
          "unitprice": 5000,
          "totalprice": 5000
        }
      ]
    }
  ],
  "pagination": {
    "total": 50,
    "limit": 20,
    "offset": 0,
    "hasMore": true
  }
}
```

### Authentication

The API uses API key authentication. Include the API key in the `Authorization` header:

```
Authorization: +JcvxohS5oEhMP6hnV/HEELywInTFCKY0tvSlDaKPu8=
```

### Error Responses

- **401 Unauthorized**: Missing or invalid API key
- **400 Bad Request**: Missing required parameters or invalid parameter values
- **500 Internal Server Error**: Server-side error

### Notes

- The API only returns opportunities with "Closed Won" status
- Opportunities must have at least one line item with the configured product code
- All line items for qualifying opportunities are returned
- Results are sorted by close date (newest first)