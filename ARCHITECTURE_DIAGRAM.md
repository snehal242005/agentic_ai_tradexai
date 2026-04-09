# Architecture Diagrams

Visual representations of the AI Financial Copilot architecture.

---

## System Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                         USER INTERFACE                          │
│                    (React + Tailwind CSS)                       │
│                                                                 │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐      │
│  │  Chat    │  │  Stock   │  │Portfolio │  │  Alerts  │      │
│  │  Panel   │  │Dashboard │  │  Panel   │  │  Panel   │      │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘      │
│                                                                 │
│  ┌──────────┐  ┌──────────┐                                   │
│  │Prediction│  │   News   │                                   │
│  │  Panel   │  │  Panel   │                                   │
│  └──────────┘  └──────────┘                                   │
└─────────────────────────────────────────────────────────────────┘
                              │
                              │ HTTP/REST API
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                      BACKEND API LAYER                          │
│                        (FastAPI)                                │
│                                                                 │
│  /chat  /stocks  /news  /predictions  /portfolio  /alerts      │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    AGENT ORCHESTRATOR                           │
│                  (LLM Intent Detection)                         │
│                                                                 │
│  ┌──────────────────────────────────────────────────────┐      │
│  │  1. Detect Intent                                    │      │
│  │  2. Extract Entities (symbols, budget, risk)        │      │
│  │  3. Route to Agents                                  │      │
│  │  4. Aggregate Results                                │      │
│  │  5. Generate Response                                │      │
│  └──────────────────────────────────────────────────────┘      │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                      MULTI-AGENT SYSTEM                         │
│                                                                 │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐      │
│  │   Data   │  │   News   │  │Prediction│  │ Decision │      │
│  │  Agent   │  │  Agent   │  │  Agent   │  │  Agent   │      │
│  │          │  │          │  │          │  │          │      │
│  │ Yahoo    │  │ NewsAPI  │  │ ML Model │  │ Reasoning│      │
│  │ Finance  │  │ TextBlob │  │ sklearn  │  │  Logic   │      │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘      │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                      EXTERNAL SERVICES                          │
│                                                                 │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐      │
│  │  Yahoo   │  │ NewsAPI  │  │  OpenAI  │  │ Database │      │
│  │ Finance  │  │   API    │  │   API    │  │  (JSON)  │      │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘      │
└─────────────────────────────────────────────────────────────────┘
```

---

## Multi-Agent Workflow

```
┌─────────────────────────────────────────────────────────────────┐
│                         USER QUERY                              │
│              "Which stocks should I buy?"                       │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    LLM INTENT DETECTION                         │
│                      (OpenAI GPT-3.5)                           │
│                                                                 │
│  Intent: stock_analysis                                         │
│  Symbols: [AAPL, GOOGL, MSFT]                                  │
│  Budget: None                                                   │
│  Risk: medium                                                   │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    PARALLEL AGENT EXECUTION                     │
│                                                                 │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐         │
│  │ Data Agent   │  │ News Agent   │  │ Prediction   │         │
│  │              │  │              │  │ Agent        │         │
│  │ Fetch AAPL   │  │ Analyze AAPL │  │ Predict AAPL │         │
│  │ Fetch GOOGL  │  │ Analyze GOOGL│  │ Predict GOOGL│         │
│  │ Fetch MSFT   │  │ Analyze MSFT │  │ Predict MSFT │         │
│  │              │  │              │  │              │         │
│  │ Returns:     │  │ Returns:     │  │ Returns:     │         │
│  │ - Price      │  │ - Sentiment  │  │ - Forecast   │         │
│  │ - Volume     │  │ - Articles   │  │ - Trend      │         │
│  │ - Indicators │  │ - Score      │  │ - Confidence │         │
│  └──────────────┘  └──────────────┘  └──────────────┘         │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                      DECISION AGENT                             │
│                   (Aggregation & Analysis)                      │
│                                                                 │
│  For each stock:                                                │
│  1. Analyze technical factors (price, SMA, trend)              │
│  2. Analyze sentiment factors (news, score)                    │
│  3. Analyze prediction factors (forecast, confidence)          │
│  4. Calculate overall score                                    │
│  5. Determine recommendation (BUY/SELL/HOLD)                   │
│  6. Generate reasoning                                         │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                      FINAL RESPONSE                             │
│                                                                 │
│  AAPL (₹175.50): BUY                                           │
│  - Strong buy signal based on positive technical indicators    │
│  - Favorable sentiment (8 positive, 2 negative articles)       │
│  - Upward price prediction (+5.2% in 7 days)                   │
│  - Confidence: High (87%)                                      │
│                                                                 │
│  GOOGL (₹142.80): HOLD                                         │
│  - Mixed signals suggest holding position                      │
│  - Neutral sentiment                                           │
│  - Moderate prediction confidence                              │
│                                                                 │
│  MSFT (₹380.20): BUY                                           │
│  - Positive momentum with strong fundamentals                  │
│  - Excellent sentiment                                         │
│  - Strong upward trend predicted                               │
└─────────────────────────────────────────────────────────────────┘
```

---

## Data Flow Diagram

```
┌──────────┐
│  User    │
│ Browser  │
└────┬─────┘
     │
     │ 1. User types query
     ▼
┌──────────────┐
│ Chat Panel   │
│  (React)     │
└────┬─────────┘
     │
     │ 2. POST /api/chat
     ▼
┌──────────────┐
│   FastAPI    │
│   Routes     │
└────┬─────────┘
     │
     │ 3. Forward to orchestrator
     ▼
┌──────────────┐
│ Orchestrator │
│   (LLM)      │
└────┬─────────┘
     │
     │ 4. Detect intent & entities
     ├─────────────┬─────────────┬─────────────┐
     ▼             ▼             ▼             ▼
┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐
│  Data   │  │  News   │  │Predict  │  │Decision │
│  Agent  │  │  Agent  │  │  Agent  │  │  Agent  │
└────┬────┘  └────┬────┘  └────┬────┘  └────┬────┘
     │            │            │            │
     │ 5. Fetch  │ 6. Analyze │ 7. Predict │ 8. Decide
     │    data   │    sentiment│    prices  │    action
     │            │            │            │
     ▼            ▼            ▼            ▼
┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐
│ Yahoo   │  │NewsAPI  │  │ ML      │  │ Logic   │
│ Finance │  │TextBlob │  │ Model   │  │ Engine  │
└─────────┘  └─────────┘  └─────────┘  └─────────┘
     │            │            │            │
     └────────────┴────────────┴────────────┘
                  │
                  │ 9. Aggregate results
                  ▼
            ┌──────────┐
            │ Response │
            │   JSON   │
            └────┬─────┘
                 │
                 │ 10. Return to frontend
                 ▼
            ┌──────────┐
            │   Chat   │
            │  Display │
            └──────────┘
```

---

## Component Hierarchy

```
App.jsx
│
├── Header.jsx
│   ├── Logo
│   ├── Market Status
│   └── Top Stocks Ticker
│
├── ChatPanel.jsx
│   ├── Message List
│   │   ├── User Messages
│   │   └── AI Messages
│   │       └── Recommendations
│   ├── Input Field
│   └── Quick Suggestions
│
├── StockDashboard.jsx
│   ├── Price Display
│   ├── Period Selector
│   ├── Area Chart (Recharts)
│   ├── Stats Grid
│   └── Technical Indicators
│
├── PredictionPanel.jsx
│   ├── Trend Indicator
│   ├── Line Chart (Recharts)
│   ├── Metrics Display
│   └── Confidence Score
│
├── NewsPanel.jsx
│   ├── Sentiment Badge
│   ├── Pie Chart (Recharts)
│   ├── Article List
│   └── Sentiment Icons
│
├── PortfolioPanel.jsx
│   ├── Overview Stats
│   ├── Allocation Pie Chart
│   ├── Performance Line Chart
│   └── Holdings Table
│
└── AlertsPanel.jsx
    ├── Alert List
    │   └── Alert Cards
    └── Summary Stats
```

---

## Agent Decision Flow

```
                    ┌─────────────────┐
                    │  Stock Data     │
                    │  - Price: $175  │
                    │  - SMA20: $172  │
                    │  - Trend: Up    │
                    └────────┬────────┘
                             │
                             ▼
                    ┌─────────────────┐
                    │ Technical Score │
                    │    +30 points   │
                    └────────┬────────┘
                             │
                             ├──────────────────┐
                             │                  │
                    ┌────────▼────────┐  ┌──────▼──────┐
                    │  News Data      │  │ Prediction  │
                    │  - Sentiment: + │  │ - Trend: Up │
                    │  - Score: 0.7   │  │ - Conf: 85% │
                    └────────┬────────┘  └──────┬──────┘
                             │                  │
                             ▼                  ▼
                    ┌─────────────────┐  ┌──────────────┐
                    │ Sentiment Score │  │ Predict Score│
                    │   +40 points    │  │  +30 points  │
                    └────────┬────────┘  └──────┬───────┘
                             │                  │
                             └──────────┬───────┘
                                        │
                                        ▼
                              ┌──────────────────┐
                              │  Overall Score   │
                              │   +100 points    │
                              └────────┬─────────┘
                                       │
                                       ▼
                              ┌──────────────────┐
                              │   Score >= 60?   │
                              └────────┬─────────┘
                                       │
                         ┌─────────────┼─────────────┐
                         │             │             │
                    YES  ▼             ▼  NO         ▼
                ┌──────────┐    ┌──────────┐   ┌──────────┐
                │   BUY    │    │   HOLD   │   │   SELL   │
                │ High Conf│    │  Med Conf│   │ High Conf│
                └──────────┘    └──────────┘   └──────────┘
```

---

## Database Schema

```
portfolios.json
{
  "user_id": {
    "total_value": 100000,
    "invested_amount": 95000,
    "holdings": [
      {
        "symbol": "AAPL",
        "allocation_percent": 30,
        "amount": 30000,
        "current_value": 31500,
        "profit_loss": 1500
      }
    ],
    "performance_history": [...]
  }
}

alerts.json
{
  "user_id": [
    {
      "id": "1",
      "type": "price_alert",
      "symbol": "AAPL",
      "message": "...",
      "severity": "info",
      "timestamp": "...",
      "read": false
    }
  ]
}

preferences.json
{
  "user_id": {
    "risk_level": "medium",
    "budget": 100000,
    "favorite_stocks": ["AAPL", "GOOGL"],
    "alert_preferences": {...}
  }
}
```

---

## API Request/Response Flow

```
Frontend                Backend                 Agents              External
   │                       │                      │                    │
   │  POST /api/chat       │                      │                    │
   ├──────────────────────>│                      │                    │
   │                       │  Detect Intent       │                    │
   │                       ├─────────────────────>│                    │
   │                       │                      │  Fetch Stock Data  │
   │                       │                      ├───────────────────>│
   │                       │                      │<───────────────────┤
   │                       │                      │  Stock Data        │
   │                       │                      │                    │
   │                       │                      │  Fetch News        │
   │                       │                      ├───────────────────>│
   │                       │                      │<───────────────────┤
   │                       │                      │  News Articles     │
   │                       │                      │                    │
   │                       │  Aggregated Results  │                    │
   │                       │<─────────────────────┤                    │
   │  JSON Response        │                      │                    │
   │<──────────────────────┤                      │                    │
   │                       │                      │                    │
   │  Update UI            │                      │                    │
   │  - Display message    │                      │                    │
   │  - Show recommendations                      │                    │
   │  - Update charts      │                      │                    │
   │                       │                      │                    │
```

---

## Deployment Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         PRODUCTION                              │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                    CDN / Static Hosting                   │  │
│  │              (Vercel / Netlify / S3)                      │  │
│  │                                                           │  │
│  │  ┌────────────────────────────────────────────────────┐  │  │
│  │  │         React Frontend (Built)                     │  │  │
│  │  │         - HTML, CSS, JS bundles                    │  │  │
│  │  │         - Optimized assets                         │  │  │
│  │  └────────────────────────────────────────────────────┘  │  │
│  └──────────────────────────────────────────────────────────┘  │
│                              │                                  │
│                              │ HTTPS                            │
│                              ▼                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                    API Server                             │  │
│  │              (Heroku / AWS / GCP)                         │  │
│  │                                                           │  │
│  │  ┌────────────────────────────────────────────────────┐  │  │
│  │  │         FastAPI Backend                            │  │  │
│  │  │         - Multi-agent system                       │  │  │
│  │  │         - LLM integration                          │  │  │
│  │  │         - Database                                 │  │  │
│  │  └────────────────────────────────────────────────────┘  │  │
│  └──────────────────────────────────────────────────────────┘  │
│                              │                                  │
│                              │ API Calls                        │
│                              ▼                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                 External Services                         │  │
│  │                                                           │  │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐              │  │
│  │  │  Yahoo   │  │ NewsAPI  │  │  OpenAI  │              │  │
│  │  │ Finance  │  │          │  │   API    │              │  │
│  │  └──────────┘  └──────────┘  └──────────┘              │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

---

These diagrams provide a visual understanding of the AI Financial Copilot architecture! 🎨📊
