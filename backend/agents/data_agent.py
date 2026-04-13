import yfinance as yf
import pandas as pd
import math
from datetime import datetime, timedelta

def safe_float(value, default=0.0):
    """Return default if value is NaN or None"""
    try:
        v = float(value)
        return default if math.isnan(v) or math.isinf(v) else round(v, 2)
    except (TypeError, ValueError):
        return default

class DataAgent:
    """Agent responsible for fetching real-time and historical stock data"""
    
    def __init__(self):
        self.cache = {}
    
    def fetch_stock_data(self, symbol: str, period: str = "1mo") -> dict:
        """Fetch stock data from Yahoo Finance"""
        try:
            stock = yf.Ticker(symbol)
            
            # Get historical data
            hist = stock.history(period=period)
            
            # Get current info
            info = stock.info
            
            # Calculate metrics — use previous day close for accurate daily change
            current_price = hist['Close'].iloc[-1] if len(hist) > 0 else 0
            prev_price = hist['Close'].iloc[-2] if len(hist) > 1 else current_price
            change = current_price - prev_price
            change_percent = (change / prev_price * 100) if prev_price > 0 else 0
            
            # Technical indicators
            sma_20 = hist['Close'].rolling(window=20).mean().iloc[-1] if len(hist) >= 20 else current_price
            sma_50 = hist['Close'].rolling(window=50).mean().iloc[-1] if len(hist) >= 50 else current_price
            
            return {
                "symbol": symbol,
                "current_price": safe_float(current_price),
                "change": safe_float(change),
                "change_percent": safe_float(change_percent),
                "volume": int(hist['Volume'].iloc[-1]) if len(hist) > 0 else 0,
                "high_52w": safe_float(hist['High'].max()) if len(hist) > 0 else 0,
                "low_52w": safe_float(hist['Low'].min()) if len(hist) > 0 else 0,
                "sma_20": safe_float(sma_20, safe_float(current_price)),
                "sma_50": safe_float(sma_50, safe_float(current_price)),
                "market_cap": info.get('marketCap', 0) or 0,
                "pe_ratio": safe_float(info.get('trailingPE', 0)),
                "historical_data": self._format_historical_data(hist),
                "trend": "bullish" if safe_float(current_price) > safe_float(sma_20) else "bearish"
            }
        except Exception as e:
            # Return demo data if API fails
            return self._get_demo_data(symbol)
    
    def _format_historical_data(self, hist: pd.DataFrame) -> list:
        """Format historical data for frontend charts"""
        data = []
        for index, row in hist.iterrows():
            data.append({
                "date": index.strftime("%Y-%m-%d"),
                "open": round(row['Open'], 2),
                "high": round(row['High'], 2),
                "low": round(row['Low'], 2),
                "close": round(row['Close'], 2),
                "volume": int(row['Volume'])
            })
        return data
    
    def _get_demo_data(self, symbol: str) -> dict:
        """Return demo data when API fails"""
        import random
        base_price = random.uniform(100, 500)
        
        return {
            "symbol": symbol,
            "current_price": round(base_price, 2),
            "change": round(random.uniform(-10, 10), 2),
            "change_percent": round(random.uniform(-5, 5), 2),
            "volume": random.randint(1000000, 10000000),
            "high_52w": round(base_price * 1.3, 2),
            "low_52w": round(base_price * 0.7, 2),
            "sma_20": round(base_price * 0.98, 2),
            "sma_50": round(base_price * 0.95, 2),
            "market_cap": random.randint(1000000000, 1000000000000),
            "pe_ratio": round(random.uniform(10, 40), 2),
            "historical_data": self._generate_demo_historical(base_price),
            "trend": random.choice(["bullish", "bearish"])
        }
    
    def _generate_demo_historical(self, base_price: float) -> list:
        """Generate demo historical data"""
        import random
        data = []
        current_date = datetime.now()
        
        for i in range(30):
            date = current_date - timedelta(days=30-i)
            price = base_price * (1 + random.uniform(-0.05, 0.05))
            data.append({
                "date": date.strftime("%Y-%m-%d"),
                "open": round(price * 0.99, 2),
                "high": round(price * 1.02, 2),
                "low": round(price * 0.98, 2),
                "close": round(price, 2),
                "volume": random.randint(1000000, 5000000)
            })
        
        return data
