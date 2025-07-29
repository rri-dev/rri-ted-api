# Project Context

## Overview
This is an Express.js API built with TypeScript that provides a single endpoint for a partner company to retrieve Salesforce Opportunity data.

## Key Requirements

### API Endpoint
- Single endpoint to pull Salesforce Opportunities
- Filters opportunities by date range (passed via URL parameters)
- Returns only "Closed Won" opportunities
- Filters by specific product code (defined in ENV variable)
- Product information comes from OpportunityLineItem table

### Pagination
- Supports pagination via URL parameters:
  - `limit`: Number of records per page (default: 20)
  - `offset`: Starting position (default: 0)

### Authentication
- API key authentication via Authorization header

### Data Source
- Salesforce database (accessible via SalesforceDB MCP tool)
- Main tables: Opportunity, OpportunityLineItem

### Deployment
- Hosted on Heroku
- TypeScript compiled to JavaScript for production

## Environment Variables
- `PRODUCT_CODE`: The specific product code to filter opportunities
- `API_KEY`: The API key for authentication
- Database connection details for Salesforce

## Build Commands
- `npm run build`: Compile TypeScript to JavaScript
- `npm run dev`: Run development server with hot reload
- `npm start`: Run production server