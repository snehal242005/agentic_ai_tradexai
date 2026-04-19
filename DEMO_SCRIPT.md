# TradeXAI — Complete Demo Script
### "How to Present This Project to Anyone"

---

## OVERVIEW — What is TradeXAI?

TradeXAI is an **AI-powered financial assistant** that helps anyone — beginner or expert — make smarter investment decisions. It combines:
- **Real-time stock data** from Yahoo Finance
- **Multi-agent AI architecture** for analysis
- **Google Gemini AI** for natural language responses
- **Machine Learning** for 7-day price predictions
- **News sentiment analysis** to gauge market mood

Think of it as having a financial advisor, a data analyst, a news reader, and a portfolio manager — all in one chat window.

---

## PART 1 — THE LANDING PAGE
### *"Let's start from the very beginning"*

**Open browser → go to http://localhost:3000**

---

### What the user sees:
A professional dark-themed landing page with the TradeXAI logo, navigation links (Features, About, Contact), and two buttons: **"Get Started"** and **"Start Trading Now"**.

---

### Script:

> *"So when someone first visits TradeXAI, they land on this home page. Notice the dark professional theme — this is intentional. Financial platforms use dark UI because it reduces eye strain during long analysis sessions.*
>
> *You can scroll down to see the Features section — AI-Powered Analysis, Price Predictions, Portfolio Management, Real-Time Data, Risk Assessment, and Security.*
>
> *There's also an About section explaining the technology behind it.*
>
> *Now — to actually use the platform, you click this button..."*

**[Click "Get Started" or "Start Trading Now"]**

---

### What happens technically:

```
User clicks "Get Started"
        ↓
React state: isLoggedIn = false → true   (in App.jsx)
        ↓
Component switches from <LandingPage /> to <Router> with <Header> + <Routes>
        ↓
Default route "/" renders <AIAssistant /> component
        ↓
User lands on the AI Chatbot page
```

> *"Notice — there's no actual login form with username and password. This is a demo version. In production, you'd integrate Firebase Auth or JWT-based authentication here. For now, clicking Get Started gives you instant access."*

---

## PART 2 — THE AI ASSISTANT (CHATBOT)
### *"The heart of the application"*

---

### What the user sees:
- A chat interface on the left (2/3 width)
- Quick Action buttons on the right sidebar
- AI Capabilities list
- Pro Tips panel

---

### Script:

> *"This is the main page — the AI Assistant. This is where all the magic happens. Think of this like WhatsApp, but instead of chatting with a friend, you're chatting with a financial expert powered by AI.*
>
> *On the right side, you'll notice Quick Action buttons — these are pre-written questions you can click instead of typing. Let's start with one of them."*

**[Click "Analyze AAPL stock"]**

---

### What happens — STEP BY STEP (Deep Technical Explanation):

> *"I just clicked 'Analyze AAPL stock'. Watch what happens — the message appears on the right side in blue (that's our message), and the AI starts thinking..."*

**[Show the loading spinner "AI is thinking..."]**

> *"Now let me explain exactly what is happening behind the scenes while we wait for this response. This is the most important part — the multi-agent architecture."*

---

#### BACKEND FLOW — The 5-Step Pipeline:

```
STEP 1: Your message hits the FastAPI backend
─────────────────────────────────────────────
POST http://localhost:8000/api/chat
Body: { "message": "Analyze AAPL stock", "user_id": "default_user" }

STEP 2: Intent Detection (orchestrator.py)
─────────────────────────────────────────────
The Orchestrator reads your message and detects:
- Intent: "stock_analysis" (because the word "Analyze" is a keyword)
- Symbol: "AAPL" (detected using regex pattern matching)
- Risk Level: "medium" (default)

STEP 3: Agent Routing — 3 agents activated in parallel
─────────────────────────────────────────────
┌─────────────────┐  ┌─────────────────┐  ┌─────────────────────┐
│   DATA AGENT    │  │   NEWS AGENT    │  │  PREDICTION AGENT   │
│                 │  │                 │  │                     │
│ Calls yfinance  │  │ Calls NewsAPI   │  │ Runs ML model       │
│ Gets:           │  │ Fetches latest  │  │ (Linear Regression  │
│ - Current price │  │ AAPL articles   │  │ + trend analysis)   │
│ - Change %      │  │ Runs TextBlob   │  │ Predicts next 7     │
│ - Volume        │  │ sentiment on    │  │ days of prices      │
│ - SMA 20 & 50   │  │ each headline   │  │                     │
│ - 52W High/Low  │  │ Returns:        │  │ Returns:            │
│ - Historical    │  │ Positive/       │  │ - Predicted prices  │
│   chart data    │  │ Negative/       │  │ - Trend direction   │
│                 │  │ Neutral score   │  │ - Confidence score  │
└─────────────────┘  └─────────────────┘  └─────────────────────┘

STEP 4: Decision Agent — Scoring & Recommendation
─────────────────────────────────────────────
Collects all 3 agent results and runs a scoring algorithm:

Technical Score:  Price > SMA20?  → +30 points
                  SMA20 > SMA50?  → +20 points
                  Strong uptrend? → +10 points

Sentiment Score:  Positive news?  → +40 points
                  Negative news?  → -30 points
                  Neutral news?   → +10 points

Prediction Score: Model predicts >5% gain?  → +30 points
                  Model predicts <-5% loss? → -30 points

Total Score → BUY / HOLD / SELL decision:
  Score ≥ 60  → Strong BUY  (high confidence)
  Score ≥ 30  → Moderate BUY (medium confidence)
  Score ≥ -20 → HOLD
  Score ≥ -50 → SELL (medium confidence)
  Score < -50 → Strong SELL (high confidence)

STEP 5: Gemini AI generates the final response
─────────────────────────────────────────────
All the collected data + the recommendation is sent to Google Gemini
as a structured prompt. Gemini formats it into a natural,
conversational reply with bold text, bullet points, and clear reasoning.

FastAPI sends the response back → React renders it as markdown.
```

---

### The Response Appears:

> *"And there it is. The AI has analyzed AAPL using 3 different data sources and given us a recommendation. Notice it's not just saying 'Buy' — it explains WHY. It tells you the current price, what the technical indicators say, what the news sentiment is, and what the ML model predicts.*
>
> *This is what makes TradeXAI different from just Googling a stock price. It aggregates multiple signals and explains the reasoning — just like a real financial analyst would."*

---

## PART 3 — TRYING DIFFERENT QUERY TYPES

### Query 1: Price Prediction

**Type in chat:** `"Predict TSLA price for next week"`

> *"Now I'm asking for a price prediction. Watch — the intent detection picks up the word 'predict' and routes this to the Prediction Agent.*
>
> *The ML model uses historical price data from the last 60 days, fits a trend line using scikit-learn, and projects it forward 7 days. Each day gets a confidence score.*
>
> *The Gemini AI then explains what this forecast means — is it a good time to buy ahead of the predicted rise? Or should you wait?"*

---

### Query 2: News Sentiment

**Type in chat:** `"What's the news about GOOGL?"`

> *"Here I'm asking about news. The News Agent fetches the latest articles from NewsAPI — a service that aggregates headlines from hundreds of financial news sources.*
>
> *Each article title and description is run through TextBlob — a natural language processing library — which assigns a sentiment score between -1.0 (very negative) and +1.0 (very positive).*
>
> *The system counts how many articles are positive, negative, and neutral, then gives an overall market mood for GOOGL. This tells us: what does the market FEEL about this stock right now?"*

---

### Query 3: Portfolio Creation

**Type in chat:** `"Create a portfolio with $50000 for medium risk"`

> *"Now I'm asking it to build me a portfolio. The system detects the word 'portfolio', extracts the budget ($50,000) and risk level (medium).*
>
> *The Decision Agent then applies a pre-built allocation strategy:*
> - *Low risk → Stable, dividend-paying stocks (TCS, INFY)*
> - *Medium risk → Balanced mix (AAPL 30%, MSFT 30%, GOOGL 25%, TCS 15%)*
> - *High risk → Growth stocks (TSLA 35%, AAPL 35%, GOOGL 30%)*
>
> *Gemini AI then explains why each stock was chosen, the expected risk-reward trade-off, and investment tips — in plain English."*

---

### Query 4: General Finance Question

**Type in chat:** `"What is a P/E ratio?"`

> *"I can also ask general finance questions — not just about specific stocks. The system detects this as a 'general_query' and sends it directly to Gemini AI, which gives a clear educational explanation.*
>
> *So TradeXAI is not just a stock analyzer — it's also a financial education tool."*

---

## PART 4 — THE NAVIGATION PAGES

### Click "Stock Analysis" in the header

> *"The Stock Analysis page lets you type any stock symbol and get a full analysis with a price chart. You can switch between 1 day, 1 week, 1 month, 3 months, or 1 year views.*
>
> *The chart is powered by Recharts — a React charting library. The data comes directly from Yahoo Finance (yfinance) in real-time."*

---

### Click "Predictions" in the header

> *"The Predictions page gives you a dedicated view for price forecasting. You get:*
> - *A line chart showing actual prices (blue) vs predicted prices (purple dashed)*
> - *A day-by-day table with predicted price and % change*
> - *The trend direction — Upward or Downward"*

---

### Click "News" in the header

> *"The News Sentiment page gives you a full analysis of news for any stock. The donut chart shows the breakdown — what percentage of recent articles are positive, negative, or neutral. You can read the actual headlines too."*

---

### Click "Portfolio" in the header

> *"The Portfolio Creator lets you input a budget and risk level, and it generates a diversified portfolio. You get a pie chart of allocation, a breakdown table with investment amount per stock, and a risk profile explanation."*

---

## PART 5 — ARCHITECTURE SUMMARY
### *"The big picture — how everything connects"*

```
┌─────────────────────────────────────────────────────┐
│                    USER'S BROWSER                    │
│                                                      │
│  React (Vite) + Tailwind CSS + Recharts + Framer    │
│                                                      │
│  Pages: AIAssistant, StockAnalysis, PricePrediction │
│         NewsSentiment, PortfolioCreator             │
└───────────────────────┬─────────────────────────────┘
                        │ HTTP requests via Axios
                        │ (GET/POST to /api/*)
                        ▼
┌─────────────────────────────────────────────────────┐
│              FASTAPI BACKEND (Python)                │
│                    port 8000                         │
│                                                      │
│  app.py → Routes → Services → Agents                │
│                                                      │
│  ┌──────────────────────────────────────────────┐   │
│  │           AGENT ORCHESTRATOR                 │   │
│  │                                              │   │
│  │  ┌──────────┐ ┌──────────┐ ┌────────────┐  │   │
│  │  │   DATA   │ │  NEWS    │ │ PREDICTION │  │   │
│  │  │  AGENT   │ │  AGENT   │ │   AGENT    │  │   │
│  │  │ yfinance │ │ NewsAPI  │ │ scikit-    │  │   │
│  │  │          │ │ TextBlob │ │ learn ML   │  │   │
│  │  └──────────┘ └──────────┘ └────────────┘  │   │
│  │                                              │   │
│  │  ┌──────────────────────────────────────┐   │   │
│  │  │         DECISION AGENT               │   │   │
│  │  │  Scoring + Google Gemini AI          │   │   │
│  │  │  → Natural language response         │   │   │
│  │  └──────────────────────────────────────┘   │   │
│  └──────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────┘
                        │
          ┌─────────────┼─────────────┐
          ▼             ▼             ▼
    Yahoo Finance    NewsAPI     Google Gemini
    (stock data)   (headlines)  (AI responses)
```

---

## PART 6 — KEY TECHNICAL HIGHLIGHTS
### *"What makes this impressive technically"*

| Feature | Technology | Why it matters |
|---|---|---|
| Multi-agent AI | Custom Python agents | Each agent specializes in one task — cleaner, scalable |
| Real-time data | yfinance (Yahoo Finance) | Free, no API key needed, live prices |
| NLP sentiment | TextBlob | Classifies news mood without expensive APIs |
| ML predictions | scikit-learn LinearRegression | Lightweight, fast, deployable anywhere |
| AI responses | Google Gemini 2.5 Flash | Latest Gemini model, free tier available |
| NaN-safe JSON | Custom FastAPI encoder | Prevents crashes from missing financial data |
| Auto-refresh | React setInterval (30s) | Live dashboard without page reload |
| Single host | FastAPI serves React build | One URL for both frontend and backend |

---

## PART 7 — EXAMPLE CONVERSATION FLOW
### *"Live demo script — say this word for word"*

| Step | You say | You type |
|---|---|---|
| 1 | "Let me open the app" | *(open browser)* |
| 2 | "This is the landing page — I click Get Started" | *(click button)* |
| 3 | "I'm now on the AI Assistant — let me ask about Apple stock" | `Analyze AAPL` |
| 4 | "While it loads, let me explain the 3 agents working in parallel..." | *(explain backend)* |
| 5 | "See — it says BUY with reasoning. Now let me predict Tesla's price" | `Predict TSLA price` |
| 6 | "7-day forecast with confidence. Now news sentiment for Google" | `News about GOOGL` |
| 7 | "Positive/Negative/Neutral breakdown. Now let me build a portfolio" | `Create portfolio with $10000 medium risk` |
| 8 | "It allocated my $10,000 across 4 stocks with explanation" | *(show result)* |
| 9 | "I can also ask general questions" | `What is inflation?` |
| 10 | "Gemini answers like a finance professor. Let me show the other pages..." | *(click nav)* |

---

## PART 8 — DEPLOYMENT INFO

- **Local:** Frontend on `http://localhost:3000`, Backend on `http://localhost:8000`
- **Production:** Deployed on **Render** as a single unified service
- **GitHub:** https://github.com/snehal242005/agentic_ai_tradexai
- **Stack:** Python 3.11 + FastAPI + React 18 + Vite + Tailwind CSS
- **Free APIs used:** Yahoo Finance (no key), Google Gemini (free tier), NewsAPI (free tier)

---

*Document prepared for TradeXAI — AI Financial Copilot*
*Built with FastAPI + React + Google Gemini + Multi-Agent Architecture*
