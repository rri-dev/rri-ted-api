# RRI TED API

Express.js TypeScript API for retrieving Salesforce Opportunities data for partner integration.

## Features

- Fetch Closed Won opportunities with specific product codes
- Date range filtering
- Pagination support
- API key authentication
- Includes opportunity line items

## Setup

1. Copy `.env.example` to `.env` and configure:
   ```
   PORT=3000
   DATABASE_URL=postgresql://username:password@host:5432/dbname
   API_KEY=your-secure-api-key
   PRODUCT_CODE=YOUR_PRODUCT_CODE
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run development server:
   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   ```

## API Endpoints

### GET /api/v1/opportunities

Fetch opportunities within a date range.

**Headers:**
- `Authorization`: Your API key

**Query Parameters:**
- `startDate` (required): Start date in YYYY-MM-DD format
- `endDate` (required): End date in YYYY-MM-DD format  
- `limit` (optional): Number of results per page (default: 20, max: 100)
- `offset` (optional): Number of results to skip (default: 0)

**Example Request:**
```
GET /api/v1/opportunities?startDate=2024-01-01&endDate=2024-12-31&limit=10&offset=0
Authorization: your-api-key
```

**Response:**
```json
{
  "data": [
    {
      "sfid": "006...",
      "name": "Opportunity Name",
      "accountid": "001...",
      "account_email__c": "customer@example.com",
      "closedate": "2024-03-15",
      "amount": 1000.00,
      "stagename": "Closed Won",
      "type": "New Business",
      "createddate": "2024-03-01T10:00:00.000Z",
      "total_price__c": 1000.00,
      "total_payments__c": 1000.00,
      "remaining_balance__c": 0.00,
      "lineItems": [
        {
          "sfid": "00k...",
          "opportunityid": "006...",
          "product2id": "01t...",
          "productcode": "PROD123",
          "name": "Product Name",
          "quantity": 1,
          "unitprice": 1000.00,
          "totalprice": 1000.00
        }
      ]
    }
  ],
  "pagination": {
    "total": 100,
    "limit": 10,
    "offset": 0,
    "hasMore": true
  }
}
```

### GET /health

Health check endpoint.

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## Deployment to Heroku

The app is configured for Heroku deployment:

1. Create a new Heroku app
2. Add PostgreSQL addon (or use external database)
3. Set environment variables:
   ```bash
   heroku config:set API_KEY=your-secure-api-key
   heroku config:set PRODUCT_CODE=YOUR_PRODUCT_CODE
   heroku config:set DATABASE_URL=your-database-url
   ```
4. Deploy:
   ```bash
   git push heroku main
   ```

The app will automatically build TypeScript on deployment via the `postinstall` script.