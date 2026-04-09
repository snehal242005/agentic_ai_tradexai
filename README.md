# TradeXAI - AI Financial Copilot

A complete end-to-end web application that combines Generative AI and Agentic AI to help users analyze stocks, manage investments, and make intelligent financial decisions.

## 🎯 Interactive Feature Pages

### 1. AI Assistant (`/ai-assistant`)
- **Full conversational AI chatbot** with natural language understanding
- Multi-agent system for comprehensive financial analysis
- Real-time responses with explainable AI reasoning
- Quick action buttons for common queries
- Chat history with timestamps

### 2. Stock Analysis (`/stock-analysis`)
- User input: Stock symbol + time period
- Real-time price data and historical charts
- Technical indicators (SMA 20, SMA 50, P/E ratio)
- 52-week high/low, volume, market cap
- Trend analysis (bullish/bearish)

### 3. Price Prediction (`/price-prediction`)
- User input: Stock symbol
- 7-day ML-powered predictions with confidence scores
- Historical vs predicted price charts
- Model accuracy metrics
- Detailed prediction table

### 4. News Sentiment (`/news-sentiment`)
- User input: Stock symbol
- Latest financial news articles
- AI-powered sentiment analysis (positive/negative/neutral)
- Sentiment score visualization
- Article summaries with sources

### 5. Portfolio Creator (`/portfolio-creator`)
- User input: Budget + risk level (low/medium/high)
- AI-optimized portfolio allocation
- Interactive pie charts
- Stock breakdown with shares and amounts
- Expected returns and risk analysis
- Personalized recommendations

### 6. Dashboard (`/`)
- Overview of all features in one place
- Live market data
- Quick access to all tools

## Features

### 🤖 Multi-Agent Architecture
- **Data Agent**: Fetches real-time and historical stock data from Yahoo Finance
- **News Agent**: Analyzes news sentiment (positive/negative/neutral)
- **Prediction Agent**: ML-powered price forecasting using LSTM/regression
- **Decision Agent**: Aggregates all data to generate final recommendations

### 💬 Conversational AI Chatbot
- Natural language queries: "Which stocks should I buy?", "Why is TCS falling?"
- LLM-powered intent detection and task decomposition
- Explainable AI with reasoning for every recommendation

### 📊 Premium Dark Mode Dashboard
- Real-time stock market data with interactive charts
- Price prediction visualization (predicted vs actual)
- News sentiment analysis with visual indicators
- Portfolio management with allocation charts
- Autonomous alerts and notifications

### 📈 Advanced Visualizations
- Interactive line charts (stock trends)
- Area charts with gradients
- Pie charts (portfolio allocation)
- Candlestick charts support
- Real-time updates

## Tech Stack

### Backend
- **Framework**: FastAPI
- **AI/ML**: LangChain, OpenAI API, scikit-learn
- **Data**: Yahoo Finance API, NewsAPI
- **Sentiment Analysis**: TextBlob

### Frontend
- **Framework**: React 18 with Vite
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Notifications**: React Hot Toast

## Installation

### Prerequisites
- Python 3.9+
- Node.js 18+
- npm or yarn

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Create virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Create `.env` file:
```bash
cp .env.example .env
```

5. Add your API keys to `.env`:
```
OPENAI_API_KEY=your-openai-api-key
NEWS_API_KEY=your-news-api-key
```

6. Run the backend:
```bash
python app.py
```

Backend will run on `http://localhost:8000`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

Frontend will run on `http://localhost:3000`

## Usage

1. Open your browser and navigate to `http://localhost:3000`
2. The dashboard will load with demo data
3. Use the chat panel to ask questions:
   - "Which stocks should I buy?"
   - "Predict AAPL price for next week"
   - "Create a portfolio with ₹50,000 budget"
   - "Why is TCS falling?"
4. Click on stock symbols to view detailed analysis
5. Explore portfolio allocation and performance charts
6. Check alerts for buy/sell opportunities

## API Endpoints

### Chat
- `POST /api/chat` - Send message to AI assistant

### Stocks
- `GET /api/stocks/{symbol}` - Get stock data
- `GET /api/stocks/{symbol}/prediction` - Get price predictions

### News
- `GET /api/news/{symbol}` - Get news with sentiment analysis

### Portfolio
- `POST /api/portfolio/create` - Create optimized portfolio
- `GET /api/portfolio/{user_id}` - Get user portfolio

### Alerts
- `GET /api/alerts/{user_id}` - Get user alerts

### Market
- `GET /api/market/overview` - Get market overview

## Project Structure

```
ai-financial-copilot/
├── backend/
│   ├── agents/
│   │   ├── data_agent.py          # Stock data fetching
│   │   ├── news_agent.py          # News sentiment analysis
│   │   ├── prediction_agent.py    # Price prediction ML
│   │   ├── decision_agent.py      # Final recommendations
│   │   └── orchestrator.py        # Multi-agent coordination
│   ├── services/
│   │   ├── stock_service.py
│   │   ├── news_service.py
│   │   ├── prediction_service.py
│   │   └── portfolio_service.py
│   ├── database/
│   │   └── db.py                  # Simple file-based DB
│   ├── app.py                     # FastAPI application
│   ├── requirements.txt
│   └── .env.example
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.jsx
│   │   │   ├── ChatPanel.jsx
│   │   │   ├── StockDashboard.jsx
│   │   │   ├── PredictionPanel.jsx
│   │   │   ├── NewsPanel.jsx
│   │   │   ├── PortfolioPanel.jsx
│   │   │   └── AlertsPanel.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── index.html
└── README.md
```

## Features in Detail

### Explainable AI
Every recommendation includes:
- Technical analysis signals
- Sentiment analysis results
- Prediction model insights
- Risk assessment
- Confidence levels

### User Memory
- Stores user preferences (risk level, budget)
- Personalizes responses based on history
- Remembers favorite stocks

### Autonomous Alerts
- Price change notifications
- Buy/sell opportunity detection
- News-based alerts
- Portfolio performance updates

## Demo Data

The application includes fallback demo data for:
- Stock prices and historical data
- News articles with sentiment
- Price predictions
- Portfolio allocations

This ensures the app works even without API keys for demonstration purposes.

## API Keys

### OpenAI API
Get your key from: https://platform.openai.com/api-keys

### NewsAPI
Get your key from: https://newsapi.org/register

Note: The app works with demo data if API keys are not provided.

## Development

### Backend Development
```bash
cd backend
uvicorn app:app --reload --host 0.0.0.0 --port 8000
```

### Frontend Development
```bash
cd frontend
npm run dev
```

### Build for Production
```bash
cd frontend
npm run build
```

## Troubleshooting

### Backend Issues
- Ensure Python 3.9+ is installed
- Check if all dependencies are installed: `pip list`
- Verify API keys in `.env` file
- Check if port 8000 is available

### Frontend Issues
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- Check if port 3000 is available
- Verify backend is running on port 8000

### CORS Issues
- Backend includes CORS middleware for localhost:3000
- If using different port, update CORS settings in `backend/app.py`

## Future Enhancements

- Real-time WebSocket updates
- Advanced ML models (LSTM, Transformer)
- Social trading features
- Mobile app (React Native)
- Advanced portfolio optimization
- Backtesting capabilities
- Multi-currency support
- Integration with trading platforms

## License

MIT License - feel free to use this project for learning and development.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Support

For issues and questions, please open an issue on GitHub.
