# API Documentation

## Base URL
```
http://localhost:8000/api
```

## Authentication
Currently no authentication required. Future versions will implement JWT tokens.

---

## Endpoints

### 1. Chat

#### Send Message
Send a message to the AI assistant and get intelligent financial advice.

**Endpoint**: `POST /api/chat`

**Request Body**:
```json
{
  "message": "Which stocks should I buy?",
  "user_id": "default_user"
}
```

**Response**:
```json
{
  "response": "**AAPL** (₹175.50): BUY - Strong buy signal...",
  "recommendations": [
    {
      "symbol": "AAPL",
      "action": "BUY",
      "confidence": "high",
      "reasoning": "Strong buy signal based on...",
      "factors": {
        "technical": {...},
        "sentiment": {...},
        "prediction": {...}
      },
      "current_price": 175.50,
      "risk_level": "medium"
    }
  ],
  "intent": "stock_analysis",
  "data": {...}
}
```

**Status Codes**:
- `200`: Success
- `500`: Server error

---

### 2. Stocks

#### Get Stock Data
Retrieve comprehensive stock data including price, volume, and technical indicators.

**Endpoint**: `GET /api/stocks/{symbol}`

**Parameters**:
- `symbol` (path): Stock symbol (e.g., AAPL, GOOGL)
- `period` (query, optional): Time period (1d, 1w, 1mo, 3mo, 1y). Default: 1mo

**Example**:
```
GET /api/stocks/AAPL?period=1mo
```

**Response**:
```json
{
  "symbol": "AAPL",
  "current_price": 175.50,
  "change": 2.30,
  "change_percent": 1.33,
  "volume": 50000000,
  "high_52w": 198.23,
  "low_52w": 124.17,
  "sma_20": 172.45,
  "sma_50": 168.90,
  "market_cap": 2800000000000,
  "pe_ratio": 28.5,
  "trend": "bullish",
  "historical_data": [
    {
      "date": "2026-04-01",
      "open": 173.20,
      "high": 176.80,
      "low": 172.50,
      "close": 175.50,
      "volume": 48000000
    }
  ]
}
```

**Status Codes**:
- `200`: Success
- `500`: Server error

---

#### Get Stock Prediction
Get AI-powered price predictions for the next 7 days.

**Endpoint**: `GET /api/stocks/{symbol}/prediction`

**Parameters**:
- `symbol` (path): Stock symbol

**Example**:
```
GET /api/stocks/AAPL/prediction
```

**Response**:
```json
{
  "symbol": "AAPL",
  "current_price": 175.50,
  "predictions": [
    {
      "date": "2026-04-10",
      "predicted_price": 177.20,
      "confidence": 0.85
    },
    {
      "date": "2026-04-11",
      "predicted_price": 178.50,
      "confidence": 0.83
    }
  ],
  "trend": "upward",
  "metrics": {
    "accuracy": 87.5,
    "mse": 2.3,
    "mae": 1.8,
    "confidence": "high"
  },
  "historical_actual": [
    {
      "date": "2026-04-01",
      "price": 173.20
    }
  ]
}
```

**Status Codes**:
- `200`: Success
- `500`: Server error

---

### 3. News

#### Get News with Sentiment
Retrieve news articles with AI-powered sentiment analysis.

**Endpoint**: `GET /api/news/{symbol}`

**Parameters**:
- `symbol` (path): Stock symbol

**Example**:
```
GET /api/news/AAPL
```

**Response**:
```json
{
  "symbol": "AAPL",
  "overall_sentiment": "positive",
  "sentiment_score": 0.7,
  "positive_count": 8,
  "negative_count": 2,
  "neutral_count": 3,
  "sentiment_distribution": {
    "positive": 8,
    "negative": 2,
    "neutral": 3
  },
  "articles": [
    {
      "title": "Apple Reports Strong Q4 Earnings",
      "description": "Apple announced quarterly earnings...",
      "url": "https://example.com/news1",
      "source": "Financial Times",
      "published_at": "2026-04-09T08:00:00Z",
      "sentiment": "positive"
    }
  ]
}
```

**Status Codes**:
- `200`: Success
- `500`: Server error

---

### 4. Portfolio

#### Create Portfolio
Create an optimized investment portfolio based on budget and risk level.

**Endpoint**: `POST /api/portfolio/create`

**Request Body**:
```json
{
  "user_id": "default_user",
  "budget": 50000,
  "risk_level": "medium"
}
```

**Risk Levels**:
- `low`: Conservative, stable stocks
- `medium`: Balanced mix
- `high`: Aggressive, growth stocks

**Response**:
```json
{
  "user_id": "default_user",
  "total_value": 50000,
  "invested_amount": 50000,
  "current_value": 50000,
  "total_profit_loss": 0,
  "total_profit_loss_percent": 0,
  "risk_level": "medium",
  "holdings": [
    {
      "symbol": "AAPL",
      "allocation_percent": 25,
      "amount": 12500,
      "shares": 0,
      "current_value": 12500,
      "profit_loss": 0,
      "profit_loss_percent": 0
    }
  ],
  "performance_history": [
    {
      "date": "2026-04-01",
      "value": 50000,
      "profit_loss": 0,
      "profit_loss_percent": 0
    }
  ],
  "created_at": "2026-04-09T10:00:00Z"
}
```

**Status Codes**:
- `200`: Success
- `500`: Server error

---

#### Get Portfolio
Retrieve user's portfolio information.

**Endpoint**: `GET /api/portfolio/{user_id}`

**Parameters**:
- `user_id` (path): User identifier

**Example**:
```
GET /api/portfolio/default_user
```

**Response**: Same as Create Portfolio response

**Status Codes**:
- `200`: Success
- `404`: Portfolio not found
- `500`: Server error

---

### 5. Alerts

#### Get Alerts
Retrieve user's alerts and notifications.

**Endpoint**: `GET /api/alerts/{user_id}`

**Parameters**:
- `user_id` (path): User identifier

**Example**:
```
GET /api/alerts/default_user
```

**Response**:
```json
{
  "alerts": [
    {
      "id": "1",
      "type": "price_alert",
      "symbol": "AAPL",
      "message": "AAPL reached your target price of $175",
      "severity": "info",
      "timestamp": "2026-04-09T09:30:00Z",
      "read": false
    },
    {
      "id": "2",
      "type": "opportunity",
      "symbol": "TSLA",
      "message": "Buy opportunity detected for TSLA",
      "severity": "success",
      "timestamp": "2026-04-09T08:15:00Z",
      "read": false
    }
  ]
}
```

**Alert Types**:
- `price_alert`: Price threshold reached
- `opportunity`: Buy/sell opportunity
- `warning`: Risk warning
- `news`: News-based alert

**Severity Levels**:
- `info`: Informational
- `success`: Positive opportunity
- `warning`: Caution needed
- `error`: Critical issue

**Status Codes**:
- `200`: Success
- `500`: Server error

---

### 6. Market

#### Get Market Overview
Get overview of market status and top stocks.

**Endpoint**: `GET /api/market/overview`

**Example**:
```
GET /api/market/overview
```

**Response**:
```json
{
  "stocks": [
    {
      "symbol": "AAPL",
      "price": 175.50,
      "change": 2.30,
      "change_percent": 1.33,
      "volume": 50000000
    },
    {
      "symbol": "GOOGL",
      "price": 142.80,
      "change": -1.20,
      "change_percent": -0.83,
      "volume": 28000000
    }
  ],
  "market_status": "open",
  "last_updated": "2026-04-09T10:30:00Z"
}
```

**Market Status**:
- `open`: Market is open
- `closed`: Market is closed
- `pre_market`: Pre-market trading
- `after_hours`: After-hours trading

**Status Codes**:
- `200`: Success
- `500`: Server error

---

## Error Responses

All endpoints may return error responses in this format:

```json
{
  "detail": "Error message describing what went wrong"
}
```

### Common Error Codes

| Code | Meaning |
|------|---------|
| 400 | Bad Request - Invalid parameters |
| 404 | Not Found - Resource doesn't exist |
| 500 | Internal Server Error - Server issue |

---

## Rate Limiting

Currently no rate limiting. Future versions will implement:
- 100 requests per minute per IP
- 1000 requests per hour per user

---

## Data Freshness

- **Stock Data**: Real-time (with 15-min delay for free tier)
- **News**: Updated every 15 minutes
- **Predictions**: Regenerated daily
- **Portfolio**: Real-time calculations

---

## Demo Mode

When API keys are not configured, endpoints return demo data:
- Realistic but simulated stock prices
- Pre-defined news articles
- Generated predictions
- Sample portfolios

---

## Interactive Documentation

Visit `http://localhost:8000/docs` for interactive API documentation with:
- Try-it-out functionality
- Request/response examples
- Schema definitions
- Authentication testing

Alternative: `http://localhost:8000/redoc` for ReDoc documentation

---

## Code Examples

### Python
```python
import requests

# Get stock data
response = requests.get('http://localhost:8000/api/stocks/AAPL')
data = response.json()
print(f"Price: ${data['current_price']}")

# Send chat message
response = requests.post('http://localhost:8000/api/chat', json={
    'message': 'Which stocks should I buy?',
    'user_id': 'user123'
})
result = response.json()
print(result['response'])
```

### JavaScript
```javascript
// Get stock data
fetch('http://localhost:8000/api/stocks/AAPL')
  .then(res => res.json())
  .then(data => console.log(`Price: $${data.current_price}`));

// Send chat message
fetch('http://localhost:8000/api/chat', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    message: 'Which stocks should I buy?',
    user_id: 'user123'
  })
})
  .then(res => res.json())
  .then(data => console.log(data.response));
```

### cURL
```bash
# Get stock data
curl http://localhost:8000/api/stocks/AAPL

# Send chat message
curl -X POST http://localhost:8000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"Which stocks should I buy?","user_id":"user123"}'

# Create portfolio
curl -X POST http://localhost:8000/api/portfolio/create \
  -H "Content-Type: application/json" \
  -d '{"user_id":"user123","budget":50000,"risk_level":"medium"}'
```

---

## WebSocket Support (Future)

Future versions will support WebSocket for real-time updates:

```javascript
const ws = new WebSocket('ws://localhost:8000/ws');

ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  console.log('Real-time update:', data);
};
```

---

## Versioning

Current version: `v1`

Future versions will use URL versioning:
- `http://localhost:8000/api/v1/...`
- `http://localhost:8000/api/v2/...`

---

## Support

For API issues:
- Check `/docs` for interactive testing
- Review error messages
- Check backend logs
- Verify API keys in `.env`

---

## Changelog

### v1.0.0 (2026-04-09)
- Initial release
- All core endpoints
- Demo mode support
- Interactive documentation

---

Happy coding! 🚀
