# Quick Start Guide

## ⚡ 5-Minute Setup

### Prerequisites Check
```bash
# Check Python
python --version  # Should be 3.9+

# Check Node.js
node --version    # Should be 18+

# Check npm
npm --version     # Should be 9+
```

### Automated Setup

**Windows**:
```bash
start.bat
```

**Linux/Mac**:
```bash
chmod +x start.sh
./start.sh
```

That's it! The application will:
1. Set up Python virtual environment
2. Install all dependencies
3. Start backend on port 8000
4. Start frontend on port 3000
5. Open in your browser

---

## 🎯 First Steps

### 1. Access the Application
Open your browser and go to: **http://localhost:3000**

### 2. Try the Chat
Click on the chat panel and try these queries:

```
"Which stocks should I buy?"
"Predict AAPL price"
"Create portfolio with ₹50000"
```

### 3. Explore the Dashboard
- View real-time stock data
- Check price predictions
- Read news sentiment
- See portfolio allocation
- Review alerts

---

## 🔑 API Keys (Optional)

The app works with demo data, but for real data:

### OpenAI API Key
1. Go to https://platform.openai.com/api-keys
2. Create account and generate key
3. Add to `backend/.env`:
```
OPENAI_API_KEY=sk-your-key-here
```

### NewsAPI Key
1. Go to https://newsapi.org/register
2. Sign up for free account
3. Add to `backend/.env`:
```
NEWS_API_KEY=your-key-here
```

**Restart backend** after adding keys:
```bash
cd backend
python run.py
```

---

## 📱 Common Tasks

### View Stock Analysis
1. Type stock symbol in chat: "Analyze AAPL"
2. Or click on any stock in the dashboard
3. View price, charts, and indicators

### Get Price Prediction
1. Ask: "Predict [SYMBOL] price"
2. View 7-day forecast
3. Check accuracy metrics

### Create Portfolio
1. Ask: "Create portfolio with ₹[AMOUNT] budget"
2. Specify risk level (low/medium/high)
3. View allocation and performance

### Check News Sentiment
1. Ask: "What's the sentiment for [SYMBOL]?"
2. View sentiment distribution
3. Read recent articles

### Set Up Alerts
Alerts are automatically generated for:
- Price changes >3%
- Buy/sell opportunities
- News sentiment changes
- Portfolio updates

---

## 🛠️ Troubleshooting

### Backend Not Starting
```bash
cd backend
source venv/bin/activate  # Linux/Mac
venv\Scripts\activate     # Windows
pip install -r requirements.txt
python run.py
```

### Frontend Not Starting
```bash
cd frontend
rm -rf node_modules
npm install
npm run dev
```

### Port Already in Use
**Backend (8000)**:
```bash
# Linux/Mac
lsof -ti:8000 | xargs kill -9

# Windows
netstat -ano | findstr :8000
taskkill /PID [PID] /F
```

**Frontend (3000)**:
Edit `frontend/vite.config.js`:
```javascript
server: { port: 3001 }
```

### CORS Errors
Add your frontend URL to `backend/app.py`:
```python
allow_origins=["http://localhost:3000", "http://localhost:3001"]
```

---

## 📚 Quick Reference

### Chat Commands
| Query | Result |
|-------|--------|
| "Buy stocks" | Stock recommendations |
| "Predict [SYMBOL]" | Price forecast |
| "Portfolio ₹[AMOUNT]" | Portfolio creation |
| "News [SYMBOL]" | Sentiment analysis |
| "Why is [SYMBOL] falling?" | Analysis with reasoning |

### API Endpoints
| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/chat` | POST | Chat with AI |
| `/api/stocks/{symbol}` | GET | Stock data |
| `/api/stocks/{symbol}/prediction` | GET | Predictions |
| `/api/news/{symbol}` | GET | News sentiment |
| `/api/portfolio/create` | POST | Create portfolio |
| `/api/alerts/{user_id}` | GET | Get alerts |

### Keyboard Shortcuts
| Key | Action |
|-----|--------|
| Enter | Send chat message |
| Esc | Clear input |
| Ctrl+K | Focus chat input |

---

## 🎨 Customization

### Change Theme Colors
Edit `frontend/tailwind.config.js`:
```javascript
colors: {
  accent: {
    blue: '#your-color',
    green: '#your-color',
    // ...
  }
}
```

### Add New Stocks
Edit `backend/config.py`:
```python
DEFAULT_STOCKS = ["AAPL", "GOOGL", "YOUR_STOCK"]
```

### Modify Prediction Days
Edit `backend/config.py`:
```python
PREDICTION_DAYS = 14  # Change from 7 to 14
```

---

## 📊 Demo Mode

Without API keys, the app uses demo data:
- ✅ Stock prices (simulated)
- ✅ Historical charts (generated)
- ✅ News articles (pre-defined)
- ✅ Predictions (simulated)
- ✅ Portfolio (demo allocations)
- ⚠️ Chat (limited, keyword-based)

**For full functionality, add API keys!**

---

## 🚀 Next Steps

1. ✅ Complete setup
2. ✅ Try demo queries
3. ✅ Add API keys (optional)
4. ✅ Explore all features
5. 📖 Read full documentation
6. 🎨 Customize to your needs
7. 🚢 Deploy to production

---

## 📞 Need Help?

- 📖 Read [README.md](README.md) for detailed info
- 🔧 Check [SETUP.md](SETUP.md) for setup issues
- 🎯 See [FEATURES.md](FEATURES.md) for feature details
- 🏗️ Review [PROJECT_OVERVIEW.md](PROJECT_OVERVIEW.md) for architecture

---

## 🎉 You're Ready!

Start exploring AI Financial Copilot and make intelligent investment decisions! 🚀📈

**Happy Investing!** 💰
