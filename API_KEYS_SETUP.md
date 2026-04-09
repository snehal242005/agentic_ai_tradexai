# 🔑 API Keys Setup Guide

## Required API Keys for TradeXAI

To make the entire project fully functional, you need the following API keys:

---

## 1. OpenAI API Key (REQUIRED for AI Chat)

**Purpose**: Powers the AI Assistant chatbot with natural language understanding

**How to Get**:
1. Go to https://platform.openai.com/
2. Sign up or log in
3. Navigate to API Keys section
4. Click "Create new secret key"
5. Copy the key (starts with `sk-...`)

**Cost**: 
- Pay-as-you-go pricing
- ~$0.002 per 1K tokens (very affordable for testing)
- Free trial credits available for new accounts

**Alternative**: Google Gemini API (see below)

---

## 2. NewsAPI Key (REQUIRED for News Sentiment)

**Purpose**: Fetches real-time financial news for sentiment analysis

**How to Get**:
1. Go to https://newsapi.org/
2. Click "Get API Key"
3. Sign up for free account
4. Copy your API key from dashboard

**Cost**: 
- FREE tier: 100 requests/day (sufficient for testing)
- Developer tier: $449/month (for production)

**Note**: Free tier is perfect for development and demo purposes

---

## 3. Google Gemini API (OPTIONAL - Alternative to OpenAI)

**Purpose**: Alternative LLM for AI chat if you prefer Google's model

**How to Get**:
1. Go to https://makersuite.google.com/app/apikey
2. Sign in with Google account
3. Click "Create API Key"
4. Copy the key

**Cost**: 
- FREE tier with generous limits
- Good alternative if you don't want to use OpenAI

---

## 📝 How to Add API Keys

### Step 1: Open the `.env` file
Navigate to `backend/.env` (create it if it doesn't exist)

### Step 2: Add your keys
```env
# OpenAI API Key (for AI Assistant)
OPENAI_API_KEY=sk-your-actual-openai-key-here

# NewsAPI Key (for news sentiment)
NEWS_API_KEY=your-actual-newsapi-key-here

# Optional: Google Gemini (alternative to OpenAI)
GOOGLE_API_KEY=your-gemini-key-here

# Database (default is fine)
DATABASE_URL=sqlite:///./financial_copilot.db

# Server settings (default is fine)
HOST=0.0.0.0
PORT=8000
```

### Step 3: Save the file

### Step 4: Restart the backend server
```bash
# Stop the current backend (Ctrl+C in terminal)
# Then restart:
cd backend
.\venv\Scripts\activate
py run.py
```

---

## 🎯 What Works WITHOUT API Keys?

Even without API keys, the following features work:

✅ **Stock Data**: Real-time prices from Yahoo Finance (free, no key needed)
✅ **Price Predictions**: ML-based predictions using historical data
✅ **Portfolio Creation**: AI-optimized portfolio allocation
✅ **Technical Analysis**: Charts, indicators, trends
✅ **Dashboard**: All visualizations and panels

❌ **What DOESN'T work without keys**:
- AI Assistant chat (needs OpenAI or Gemini)
- Real-time news articles (needs NewsAPI)
- News sentiment analysis (needs NewsAPI)

---

## 🔒 Security Best Practices

1. **Never commit `.env` file to Git**
   - Already in `.gitignore`
   - Keep your keys private

2. **Use environment variables in production**
   - Don't hardcode keys in code
   - Use secure secret management

3. **Rotate keys regularly**
   - Generate new keys periodically
   - Revoke old keys

4. **Monitor usage**
   - Check API dashboards for unusual activity
   - Set up billing alerts

---

## 💰 Cost Estimate for Testing

**For 1 month of testing/demo:**

| Service | Usage | Cost |
|---------|-------|------|
| OpenAI API | ~1000 chat messages | ~$2-5 |
| NewsAPI | Free tier (100/day) | $0 |
| Yahoo Finance | Unlimited | $0 |
| **Total** | | **~$2-5/month** |

**Very affordable for development and demo purposes!**

---

## 🚀 Quick Start (Minimum Setup)

**For basic testing, you only need:**

1. **OpenAI API Key** - For AI chat functionality
2. **NewsAPI Key** - For news features (free tier)

**Everything else works without API keys!**

---

## 📧 Where to Get Help

- **OpenAI**: https://help.openai.com/
- **NewsAPI**: https://newsapi.org/docs
- **Google Gemini**: https://ai.google.dev/docs

---

## ✅ Verification

After adding keys, test each feature:

1. **AI Assistant**: Go to `/ai-assistant` and send a message
2. **News Sentiment**: Go to `/news-sentiment` and analyze a stock
3. **Stock Analysis**: Should work without keys (uses Yahoo Finance)
4. **Predictions**: Should work without keys (uses ML models)

---

## 🎉 Ready to Go!

Once you add the API keys:
1. Restart backend server
2. Refresh frontend
3. Test AI Assistant page
4. All features should be fully functional!

**Note**: The project is designed to gracefully handle missing keys - features that require keys will show demo data or error messages, while other features continue to work normally.
