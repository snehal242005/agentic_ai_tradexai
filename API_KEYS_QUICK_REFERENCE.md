# 🔑 API Keys Quick Reference

## Copy-Paste Template

Once you have your API keys, open `backend/.env` and replace the placeholders:

```env
OPENAI_API_KEY=sk-proj-YOUR_ACTUAL_KEY_HERE
NEWS_API_KEY=YOUR_ACTUAL_KEY_HERE
```

---

## Where to Get Keys (Quick Links)

### 1. OpenAI API Key
🔗 **Get it here**: https://platform.openai.com/api-keys

**Steps**:
1. Sign up/login
2. Click "Create new secret key"
3. Copy key (starts with `sk-`)
4. Paste in `.env` file

**Cost**: ~$2-5 for testing (pay-as-you-go)

---

### 2. NewsAPI Key
🔗 **Get it here**: https://newsapi.org/register

**Steps**:
1. Sign up for free
2. Verify email
3. Copy API key from dashboard
4. Paste in `.env` file

**Cost**: FREE (100 requests/day)

---

## After Adding Keys

1. **Save** the `backend/.env` file
2. **Restart** backend server:
   ```bash
   # Press Ctrl+C to stop current server
   # Then run:
   cd backend
   .\venv\Scripts\activate
   py run.py
   ```
3. **Test** AI Assistant at http://localhost:3000/ai-assistant

---

## What Each Key Enables

| API Key | Enables | Required? |
|---------|---------|-----------|
| OpenAI | AI Assistant chat | ✅ Yes (for chat) |
| NewsAPI | News sentiment analysis | ✅ Yes (for news) |
| Yahoo Finance | Stock data, predictions | ✅ Built-in (no key needed) |

---

## Troubleshooting

**"Invalid API key" error?**
- Check for extra spaces in `.env` file
- Make sure key is on same line as variable name
- Verify key is active in provider dashboard

**"Rate limit exceeded"?**
- NewsAPI free tier: 100 requests/day
- OpenAI: Check your usage limits
- Wait or upgrade plan

**Still not working?**
- Restart backend server after adding keys
- Check `backend/.env` file exists (not `.env.example`)
- Verify keys are not wrapped in quotes

---

## Example `.env` File (with fake keys)

```env
# Replace these with your actual keys:
OPENAI_API_KEY=sk-proj-abc123def456ghi789jkl012mno345pqr678stu901vwx234yz
NEWS_API_KEY=a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6
DATABASE_URL=sqlite:///./financial_copilot.db
HOST=0.0.0.0
PORT=8000
```

---

## 💡 Pro Tip

Start with just these 2 keys for full functionality:
1. **OpenAI** - For AI chat
2. **NewsAPI** - For news (free tier)

Everything else works without API keys!
