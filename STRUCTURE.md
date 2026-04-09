# Project Structure

```
ai-financial-copilot/
│
├── 📁 backend/                          # Python FastAPI Backend
│   ├── 📁 agents/                       # Multi-Agent System
│   │   ├── __init__.py
│   │   ├── data_agent.py               # Stock data fetching (Yahoo Finance)
│   │   ├── news_agent.py               # News sentiment analysis (NewsAPI + TextBlob)
│   │   ├── prediction_agent.py         # ML price prediction (sklearn)
│   │   ├── decision_agent.py           # Final recommendation engine
│   │   └── orchestrator.py             # Agent coordination & LLM integration
│   │
│   ├── 📁 services/                     # Business Logic Layer
│   │   ├── __init__.py
│   │   ├── stock_service.py            # Stock operations
│   │   ├── news_service.py             # News operations
│   │   ├── prediction_service.py       # Prediction operations
│   │   └── portfolio_service.py        # Portfolio management
│   │
│   ├── 📁 database/                     # Data Persistence
│   │   ├── __init__.py
│   │   └── db.py                       # File-based database (JSON)
│   │
│   ├── app.py                          # FastAPI application & routes
│   ├── config.py                       # Configuration management
│   ├── run.py                          # Server startup script
│   ├── requirements.txt                # Python dependencies
│   └── .env.example                    # Environment variables template
│
├── 📁 frontend/                         # React Frontend
│   ├── 📁 src/
│   │   ├── 📁 components/              # React Components
│   │   │   ├── Header.jsx              # Top navigation bar
│   │   │   ├── ChatPanel.jsx           # AI chatbot interface
│   │   │   ├── StockDashboard.jsx      # Stock data & charts
│   │   │   ├── PredictionPanel.jsx     # Price prediction visualization
│   │   │   ├── NewsPanel.jsx           # News sentiment display
│   │   │   ├── PortfolioPanel.jsx      # Portfolio management
│   │   │   └── AlertsPanel.jsx         # Notifications & alerts
│   │   │
│   │   ├── 📁 services/
│   │   │   └── api.js                  # API client (Axios)
│   │   │
│   │   ├── App.jsx                     # Main application component
│   │   ├── main.jsx                    # React entry point
│   │   └── index.css                   # Global styles (Tailwind)
│   │
│   ├── index.html                      # HTML template
│   ├── package.json                    # Node dependencies
│   ├── vite.config.js                  # Vite configuration
│   ├── tailwind.config.js              # Tailwind CSS configuration
│   └── postcss.config.js               # PostCSS configuration
│
├── 📄 README.md                         # Main documentation
├── 📄 SETUP.md                          # Setup instructions
├── 📄 PROJECT_OVERVIEW.md               # Detailed project overview
├── 📄 STRUCTURE.md                      # This file
├── 📄 .gitignore                        # Git ignore rules
├── 🚀 start.sh                          # Linux/Mac startup script
└── 🚀 start.bat                         # Windows startup script
```

## Component Relationships

### Backend Flow
```
User Request
    ↓
FastAPI Routes (app.py)
    ↓
Agent Orchestrator
    ↓
┌─────────────┬──────────────┬─────────────────┬──────────────┐
│ Data Agent  │ News Agent   │ Prediction Agent│ Decision Agent│
└─────────────┴──────────────┴─────────────────┴──────────────┘
    ↓
Services Layer
    ↓
Database
    ↓
JSON Response
```

### Frontend Flow
```
User Interaction
    ↓
React Components
    ↓
API Service (api.js)
    ↓
Backend API
    ↓
State Update
    ↓
UI Re-render with Charts
```

## Key Files Explained

### Backend

**app.py** (Main API)
- Defines all REST endpoints
- CORS configuration
- Request/response handling
- Error management

**agents/orchestrator.py** (Brain)
- LLM-powered intent detection
- Task decomposition
- Agent coordination
- Response aggregation

**agents/data_agent.py** (Data)
- Yahoo Finance integration
- Historical data processing
- Technical indicators
- Demo data fallback

**agents/news_agent.py** (Sentiment)
- NewsAPI integration
- TextBlob sentiment analysis
- Article aggregation
- Sentiment scoring

**agents/prediction_agent.py** (ML)
- Price prediction models
- EMA calculations
- Accuracy metrics
- Trend analysis

**agents/decision_agent.py** (Recommendations)
- Factor analysis
- Buy/sell/hold logic
- Explainable reasoning
- Risk assessment

**config.py** (Configuration)
- Environment variables
- API key management
- Default settings
- Validation

**database/db.py** (Storage)
- Portfolio persistence
- Alert storage
- User preferences
- JSON file operations

### Frontend

**App.jsx** (Main)
- Layout structure
- State management
- Component orchestration
- Data flow

**components/ChatPanel.jsx** (AI Chat)
- Message handling
- LLM integration
- Conversation history
- Quick suggestions

**components/StockDashboard.jsx** (Stocks)
- Real-time data display
- Area charts (Recharts)
- Technical indicators
- Period selection

**components/PredictionPanel.jsx** (Predictions)
- Prediction visualization
- Line charts
- Accuracy metrics
- Trend indicators

**components/NewsPanel.jsx** (News)
- Sentiment distribution
- Article list
- Pie charts
- Source attribution

**components/PortfolioPanel.jsx** (Portfolio)
- Allocation pie chart
- Performance line chart
- Holdings table
- P/L tracking

**components/AlertsPanel.jsx** (Alerts)
- Notification list
- Alert types
- Dismiss functionality
- Summary stats

**services/api.js** (API Client)
- Axios configuration
- Endpoint definitions
- Error handling
- Request/response formatting

## Data Models

### Stock Data
```javascript
{
  symbol: "AAPL",
  current_price: 175.50,
  change: 2.30,
  change_percent: 1.33,
  volume: 50000000,
  high_52w: 198.23,
  low_52w: 124.17,
  sma_20: 172.45,
  sma_50: 168.90,
  trend: "bullish",
  historical_data: [...]
}
```

### Prediction Data
```javascript
{
  symbol: "AAPL",
  current_price: 175.50,
  predictions: [
    { date: "2026-04-10", predicted_price: 177.20, confidence: 0.85 }
  ],
  trend: "upward",
  metrics: {
    accuracy: 87.5,
    mse: 2.3,
    mae: 1.8
  }
}
```

### News Data
```javascript
{
  symbol: "AAPL",
  overall_sentiment: "positive",
  sentiment_score: 0.7,
  positive_count: 8,
  negative_count: 2,
  neutral_count: 3,
  articles: [...]
}
```

### Portfolio Data
```javascript
{
  user_id: "default_user",
  total_value: 100000,
  invested_amount: 95000,
  total_profit_loss: 5000,
  total_profit_loss_percent: 5.26,
  risk_level: "medium",
  holdings: [...],
  performance_history: [...]
}
```

## Technology Stack Summary

### Backend Stack
| Technology | Purpose | Version |
|------------|---------|---------|
| Python | Language | 3.9+ |
| FastAPI | Web Framework | 0.104+ |
| LangChain | LLM Integration | 0.0.340+ |
| OpenAI | AI Models | 1.3+ |
| yfinance | Stock Data | 0.2.32+ |
| pandas | Data Processing | 2.1+ |
| scikit-learn | ML Models | 1.3+ |
| TextBlob | Sentiment Analysis | 0.17+ |

### Frontend Stack
| Technology | Purpose | Version |
|------------|---------|---------|
| React | UI Framework | 18.2+ |
| Vite | Build Tool | 5.0+ |
| Tailwind CSS | Styling | 3.4+ |
| Recharts | Charts | 2.10+ |
| Framer Motion | Animations | 10.16+ |
| Axios | HTTP Client | 1.6+ |
| Lucide React | Icons | 0.300+ |

## File Sizes (Approximate)

```
Backend:
- agents/orchestrator.py      ~8 KB
- agents/data_agent.py         ~6 KB
- agents/news_agent.py         ~7 KB
- agents/prediction_agent.py   ~8 KB
- agents/decision_agent.py     ~12 KB
- app.py                       ~4 KB
- Total Backend Code           ~50 KB

Frontend:
- components/ChatPanel.jsx     ~6 KB
- components/StockDashboard.jsx ~8 KB
- components/PredictionPanel.jsx ~7 KB
- components/NewsPanel.jsx     ~7 KB
- components/PortfolioPanel.jsx ~10 KB
- components/AlertsPanel.jsx   ~5 KB
- Total Frontend Code          ~50 KB

Total Project Code: ~100 KB (excluding dependencies)
```

## Development Workflow

1. **Start Backend**: `cd backend && python run.py`
2. **Start Frontend**: `cd frontend && npm run dev`
3. **Make Changes**: Edit files in respective directories
4. **Hot Reload**: Both servers auto-reload on changes
5. **Test**: Use browser and API docs
6. **Build**: `npm run build` for production

## Deployment Structure

```
Production:
├── Backend (API Server)
│   ├── Heroku / AWS / GCP
│   └── Environment Variables
│
└── Frontend (Static Files)
    ├── Vercel / Netlify / S3
    └── API_BASE_URL → Backend URL
```

---

This structure provides a clean separation of concerns, scalability, and maintainability.
