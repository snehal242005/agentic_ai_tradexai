from typing import Dict, List
import random

class PortfolioService:
    """Service for portfolio management"""
    
    def __init__(self, db):
        self.db = db
    
    def create_portfolio(self, user_id: str, budget: float, risk_level: str) -> Dict:
        """Create optimized portfolio based on budget and risk level"""
        
        # Define stock pools by risk level
        stock_pools = {
            "low": [
                {"symbol": "TCS", "allocation": 0.30},
                {"symbol": "INFY", "allocation": 0.25},
                {"symbol": "RELIANCE", "allocation": 0.25},
                {"symbol": "HDFC", "allocation": 0.20}
            ],
            "medium": [
                {"symbol": "AAPL", "allocation": 0.25},
                {"symbol": "MSFT", "allocation": 0.25},
                {"symbol": "GOOGL", "allocation": 0.20},
                {"symbol": "TCS", "allocation": 0.15},
                {"symbol": "AMZN", "allocation": 0.15}
            ],
            "high": [
                {"symbol": "TSLA", "allocation": 0.30},
                {"symbol": "NVDA", "allocation": 0.25},
                {"symbol": "AAPL", "allocation": 0.20},
                {"symbol": "GOOGL", "allocation": 0.15},
                {"symbol": "AMD", "allocation": 0.10}
            ]
        }
        
        selected_stocks = stock_pools.get(risk_level, stock_pools["medium"])
        
        # Calculate allocations
        holdings = []
        for stock in selected_stocks:
            amount = budget * stock["allocation"]
            holdings.append({
                "symbol": stock["symbol"],
                "allocation_percent": stock["allocation"] * 100,
                "amount": round(amount, 2),
                "shares": 0,  # Would calculate based on current price
                "current_value": round(amount, 2),
                "profit_loss": 0,
                "profit_loss_percent": 0
            })
        
        portfolio = {
            "user_id": user_id,
            "total_value": budget,
            "invested_amount": budget,
            "current_value": budget,
            "total_profit_loss": 0,
            "total_profit_loss_percent": 0,
            "risk_level": risk_level,
            "holdings": holdings,
            "performance_history": self._generate_performance_history(budget),
            "created_at": "2026-04-09T10:00:00Z"
        }
        
        # Save to database
        self.db.save_portfolio(user_id, portfolio)
        
        return portfolio
    
    def get_portfolio(self, user_id: str) -> Dict:
        """Get user portfolio"""
        portfolio = self.db.get_portfolio(user_id)
        if not portfolio:
            # Return demo portfolio
            return self.create_portfolio(user_id, 100000, "medium")
        return portfolio
    
    def _generate_performance_history(self, initial_value: float) -> List[Dict]:
        """Generate demo performance history"""
        history = []
        current_value = initial_value
        
        for i in range(30):
            change = random.uniform(-0.02, 0.03)
            current_value = current_value * (1 + change)
            history.append({
                "date": f"2026-03-{10+i:02d}" if i < 22 else f"2026-04-{i-21:02d}",
                "value": round(current_value, 2),
                "profit_loss": round(current_value - initial_value, 2),
                "profit_loss_percent": round((current_value - initial_value) / initial_value * 100, 2)
            })
        
        return history
