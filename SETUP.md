# Setup Guide - AI Financial Copilot

## Quick Start

### Option 1: Automated Setup (Recommended)

#### On Linux/Mac:
```bash
chmod +x start.sh
./start.sh
```

#### On Windows:
```bash
start.bat
```

The script will:
1. Check prerequisites
2. Set up Python virtual environment
3. Install backend dependencies
4. Install frontend dependencies
5. Start both servers

### Option 2: Manual Setup

#### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Create and activate virtual environment:
```bash
# Linux/Mac
python3 -m venv venv
source venv/bin/activate

# Windows
python -m venv venv
venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Create environment file:
```bash
cp .env.example .env
```

5. Edit `.env` and add your API keys:
```
OPENAI_API_KEY=sk-your-key-here
NEWS_API_KEY=your-news-api-key-here
```

6. Run the backend:
```bash
python run.py
```

Backend will be available at `http://localhost:8000`

#### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm run dev
```

Frontend will be available at `http://localhost:3000`

## Getting API Keys

### OpenAI API Key (Required for AI Chat)

1. Go to https://platform.openai.com/signup
2. Create an account or sign in
3. Navigate to API Keys section
4. Click "Create new secret key"
5. Copy the key and add to `.env` file

**Note**: OpenAI API requires payment. You'll need to add credits to your account.

### NewsAPI Key (Optional - for real news)

1. Go to https://newsapi.org/register
2. Sign up for a free account
3. Copy your API key from the dashboard
4. Add to `.env` file

**Note**: Free tier allows 100 requests per day. The app works with demo data if not provided.

## Verification

### Check Backend
Open http://localhost:8000/docs in your browser. You should see the FastAPI interactive documentation.

### Check Frontend
Open http://localhost:3000 in your browser. You should see the AI Financial Copilot dashboard.

### Test the Chat
1. Type a message in the chat panel: "Which stocks should I buy?"
2. The AI should respond with recommendations

## Troubleshooting

### Backend Issues

**Port 8000 already in use:**
```bash
# Linux/Mac
lsof -ti:8000 | xargs kill -9

# Windows
netstat -ano | findstr :8000
taskkill /PID <PID> /F
```

**Module not found errors:**
```bash
pip install -r requirements.txt --force-reinstall
```

**API key errors:**
- Check `.env` file exists in backend directory
- Verify API keys are correct (no extra spaces)
- The app works with demo data if keys are missing

### Frontend Issues

**Port 3000 already in use:**
Edit `frontend/vite.config.js` and change the port:
```javascript
server: {
  port: 3001  // Change to any available port
}
```

**Module not found errors:**
```bash
rm -rf node_modules package-lock.json
npm install
```

**Blank screen:**
- Check browser console for errors (F12)
- Verify backend is running on port 8000
- Check CORS settings in `backend/app.py`

### CORS Issues

If you see CORS errors in browser console:

1. Open `backend/app.py`
2. Add your frontend URL to CORS origins:
```python
allow_origins=["http://localhost:3000", "http://localhost:3001"]
```

## Development Tips

### Hot Reload

Both backend and frontend support hot reload:
- Backend: Changes to Python files automatically restart the server
- Frontend: Changes to React files automatically refresh the browser

### API Documentation

FastAPI provides interactive API docs at:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

### Debug Mode

Enable debug logging in backend:
```python
# In backend/run.py
uvicorn.run(..., log_level="debug")
```

### Demo Mode

The app works without API keys using demo data:
- Stock data: Generated random data
- News: Pre-defined demo articles
- Predictions: Simulated forecasts
- Chat: Basic keyword-based responses

## Production Deployment

### Backend

1. Set environment variables:
```bash
export OPENAI_API_KEY=your-key
export NEWS_API_KEY=your-key
```

2. Use production ASGI server:
```bash
gunicorn -w 4 -k uvicorn.workers.UvicornWorker app:app
```

### Frontend

1. Build for production:
```bash
npm run build
```

2. Serve static files:
```bash
npm install -g serve
serve -s dist
```

Or deploy to:
- Vercel
- Netlify
- AWS S3 + CloudFront
- Any static hosting service

## System Requirements

### Minimum
- Python 3.9+
- Node.js 18+
- 4GB RAM
- 2GB free disk space

### Recommended
- Python 3.11+
- Node.js 20+
- 8GB RAM
- 5GB free disk space
- Modern browser (Chrome, Firefox, Safari, Edge)

## Next Steps

1. Explore the dashboard and try different queries
2. Check out the API documentation
3. Customize the agents in `backend/agents/`
4. Modify the UI components in `frontend/src/components/`
5. Add your own stock symbols and preferences

## Support

For issues and questions:
- Check the main README.md
- Review the troubleshooting section
- Check browser console for errors
- Check backend logs for errors

Happy investing! 🚀📈
