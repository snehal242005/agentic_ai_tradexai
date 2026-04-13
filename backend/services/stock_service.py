from agents.data_agent import DataAgent
from datetime import datetime

class StockService:
    """Service layer for stock operations"""

    def __init__(self):
        self.data_agent = DataAgent()

    def get_stock_data(self, symbol: str, period: str = "1mo"):
        """Get comprehensive stock data — always fetches live from yfinance"""
        return self.data_agent.fetch_stock_data(symbol, period)

    def get_market_overview(self):
        """Get real-time market overview with top US stocks"""
        top_stocks = ["AAPL", "GOOGL", "MSFT", "AMZN", "TSLA", "NVDA", "META", "NFLX"]

        stocks = []
        for symbol in top_stocks:
            data = self.data_agent.fetch_stock_data(symbol, "1d")
            stocks.append({
                "symbol": symbol,
                "price": data.get("current_price", 0),
                "change": data.get("change", 0),
                "change_percent": data.get("change_percent", 0),
                "volume": data.get("volume", 0)
            })

        return {
            "stocks": stocks,
            "market_status": "open",
            "last_updated": datetime.now().isoformat()
        }
