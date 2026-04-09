from agents.data_agent import DataAgent

class StockService:
    """Service layer for stock operations"""
    
    def __init__(self):
        self.data_agent = DataAgent()
    
    def get_stock_data(self, symbol: str, period: str = "1mo"):
        """Get comprehensive stock data"""
        return self.data_agent.fetch_stock_data(symbol, period)
    
    def get_market_overview(self):
        """Get market overview with top stocks"""
        top_stocks = ["AAPL", "GOOGL", "MSFT", "AMZN", "TSLA", "TCS", "INFY", "RELIANCE"]
        
        overview = {
            "stocks": [],
            "market_status": "open",
            "last_updated": "2026-04-09T10:30:00Z"
        }
        
        for symbol in top_stocks[:6]:
            data = self.data_agent.fetch_stock_data(symbol, "1d")
            overview["stocks"].append({
                "symbol": symbol,
                "price": data.get("current_price"),
                "change": data.get("change"),
                "change_percent": data.get("change_percent"),
                "volume": data.get("volume")
            })
        
        return overview
