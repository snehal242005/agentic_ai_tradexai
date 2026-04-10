from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse, FileResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
from typing import List, Optional
import uvicorn
import json
import math
from pathlib import Path
from agents.orchestrator import AgentOrchestrator
from services.stock_service import StockService
from services.news_service import NewsService
from services.prediction_service import PredictionService
from services.portfolio_service import PortfolioService
from database.db import Database


class NaNSafeEncoder(json.JSONEncoder):
    def encode(self, obj):
        return super().encode(self._clean(obj))

    def _clean(self, obj):
        if isinstance(obj, float):
            return 0.0 if (math.isnan(obj) or math.isinf(obj)) else obj
        if isinstance(obj, dict):
            return {k: self._clean(v) for k, v in obj.items()}
        if isinstance(obj, (list, tuple)):
            return [self._clean(v) for v in obj]
        return obj


class NaNSafeResponse(JSONResponse):
    def render(self, content) -> bytes:
        return NaNSafeEncoder().encode(content).encode("utf-8")


app = FastAPI(title="AI Financial Copilot API", default_response_class=NaNSafeResponse)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
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
    risk_level: str


# ─────────────────────────────────────────────────────────────────────────────
# API ROUTES — must all be defined BEFORE the catch-all SPA route
# ─────────────────────────────────────────────────────────────────────────────

@app.get("/api/health")
async def health():
    return {"message": "AI Financial Copilot API", "status": "running"}


@app.post("/api/chat")
async def chat(request: ChatRequest):
    try:
        response = await orchestrator.process_query(request.message, request.user_id)
        return response
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/api/stocks/{symbol}/prediction")
async def get_stock_prediction(symbol: str):
    try:
        return prediction_service.predict_stock(symbol)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/api/stocks/{symbol}")
async def get_stock_data(symbol: str, period: str = "1mo"):
    try:
        return stock_service.get_stock_data(symbol, period)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/api/news/{symbol}")
async def get_stock_news(symbol: str):
    try:
        return news_service.get_news_with_sentiment(symbol)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/api/portfolio/create")
async def create_portfolio(request: PortfolioRequest):
    try:
        return portfolio_service.create_portfolio(
            request.user_id, request.budget, request.risk_level
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/api/portfolio/{user_id}")
async def get_portfolio(user_id: str):
    try:
        return portfolio_service.get_portfolio(user_id)
    except Exception as e:
        raise HTTPException(status_code=404, detail="Portfolio not found")


@app.get("/api/alerts/{user_id}")
async def get_alerts(user_id: str):
    try:
        alerts = db.get_alerts(user_id)
        return {"alerts": alerts}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/api/market/overview")
async def get_market_overview():
    try:
        return stock_service.get_market_overview()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# ─────────────────────────────────────────────────────────────────────────────
# STATIC FILE SERVING — must come AFTER all /api routes
# ─────────────────────────────────────────────────────────────────────────────

FRONTEND_DIST = Path(__file__).parent.parent / "frontend" / "dist"

if FRONTEND_DIST.exists():
    app.mount("/assets", StaticFiles(directory=FRONTEND_DIST / "assets"), name="assets")

    @app.get("/")
    async def serve_index():
        return FileResponse(FRONTEND_DIST / "index.html")

    @app.get("/{full_path:path}")
    async def serve_spa(full_path: str):
        if full_path.startswith("api/"):
            raise HTTPException(status_code=404, detail="API route not found")
        file_path = FRONTEND_DIST / full_path
        if file_path.exists() and file_path.is_file():
            return FileResponse(file_path)
        return FileResponse(FRONTEND_DIST / "index.html")
else:
    @app.get("/")
    async def root():
        return {"message": "TradeXAI API running", "note": "Frontend not built. Run: cd frontend && npm run build"}


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
