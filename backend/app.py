from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from typing import List, Optional
import uvicorn
import json
import math
from agents.orchestrator import AgentOrchestrator
from services.stock_service import StockService
from services.news_service import NewsService
from services.prediction_service import PredictionService
from services.portfolio_service import PortfolioService
from database.db import Database
import os

class NaNSafeEncoder(json.JSONEncoder):
    def encode(self, obj):
        return super().encode(self._clean(obj))
    def _clean(self, obj):
        if isinstance(obj, float):
            if math.isnan(obj) or math.isinf(obj):
                return 0.0
            return obj
        if isinstance(obj, dict):
            return {k: self._clean(v) for k, v in obj.items()}
        if isinstance(obj, (list, tuple)):
            return [self._clean(v) for v in obj]
        return obj

class NaNSafeResponse(JSONResponse):
    def render(self, content) -> bytes:
        return NaNSafeEncoder().encode(content).encode("utf-8")

app = FastAPI(title="AI Financial Copilot API", default_response_class=NaNSafeResponse)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize services
db = Database()
orchestrator = AgentOrchestrator()
stock_service = StockService()
news_service = NewsService()
prediction_service = PredictionService()
portfolio_service = PortfolioService(db)

# Request/Response Models
class ChatRequest(BaseModel):
    message: str
    user_id: Optional[str] = "default_user"

class PortfolioRequest(BaseModel):
    user_id: str
    budget: float
    risk_level: str  # low, medium, high

class StockRequest(BaseModel):
    symbol: str
    period: Optional[str] = "1mo"

@app.get("/")
async def root():
    return {"message": "AI Financial Copilot API", "status": "running"}

@app.post("/api/chat")
async def chat(request: ChatRequest):
    """Main chat endpoint - orchestrates multi-agent workflow"""
    try:
        response = await orchestrator.process_query(request.message, request.user_id)
        return response
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/stocks/{symbol}")
async def get_stock_data(symbol: str, period: str = "1mo"):
    """Get stock data and analysis"""
    try:
        data = stock_service.get_stock_data(symbol, period)
        return data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/stocks/{symbol}/prediction")
async def get_stock_prediction(symbol: str):
    """Get stock price prediction"""
    try:
        prediction = prediction_service.predict_stock(symbol)
        return prediction
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/news/{symbol}")
async def get_stock_news(symbol: str):
    """Get news and sentiment analysis"""
    try:
        news = news_service.get_news_with_sentiment(symbol)
        return news
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/portfolio/create")
async def create_portfolio(request: PortfolioRequest):
    """Create optimized portfolio based on budget and risk"""
    try:
        portfolio = portfolio_service.create_portfolio(
            request.user_id, request.budget, request.risk_level
        )
        return portfolio
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/portfolio/{user_id}")
async def get_portfolio(user_id: str):
    """Get user portfolio"""
    try:
        portfolio = portfolio_service.get_portfolio(user_id)
        return portfolio
    except Exception as e:
        raise HTTPException(status_code=404, detail="Portfolio not found")

@app.get("/api/alerts/{user_id}")
async def get_alerts(user_id: str):
    """Get user alerts"""
    try:
        alerts = db.get_alerts(user_id)
        return {"alerts": alerts}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/market/overview")
async def get_market_overview():
    """Get market overview with top stocks"""
    try:
        overview = stock_service.get_market_overview()
        return overview
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
