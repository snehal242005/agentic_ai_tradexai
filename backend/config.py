import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    """Application configuration"""
    
    # API Keys
    OPENAI_API_KEY = os.getenv("OPENAI_API_KEY", "")
    GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY", "")
    NEWS_API_KEY = os.getenv("NEWS_API_KEY", "")
    
    # Server
    HOST = os.getenv("HOST", "0.0.0.0")
    PORT = int(os.getenv("PORT", 8000))
    
    # Database
    DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./financial_copilot.db")
    
    # CORS
    CORS_ORIGINS = [
        "http://localhost:3000",
        "http://localhost:5173",
        "http://127.0.0.1:3000",
        "http://127.0.0.1:5173"
    ]
    
    # Stock Data
    DEFAULT_STOCKS = ["AAPL", "GOOGL", "MSFT", "AMZN", "TSLA", "TCS", "INFY", "RELIANCE"]
    
    # Prediction
    PREDICTION_DAYS = 7
    
    @classmethod
    def validate(cls):
        """Validate configuration"""
        warnings = []
        
        if not cls.OPENAI_API_KEY:
            warnings.append("OPENAI_API_KEY not set - using demo mode")
        
        if not cls.NEWS_API_KEY:
            warnings.append("NEWS_API_KEY not set - using demo news")
        
        return warnings

config = Config()
