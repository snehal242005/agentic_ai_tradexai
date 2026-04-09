from agents.prediction_agent import PredictionAgent

class PredictionService:
    """Service layer for prediction operations"""
    
    def __init__(self):
        self.prediction_agent = PredictionAgent()
    
    def predict_stock(self, symbol: str, days: int = 7):
        """Get stock price predictions"""
        return self.prediction_agent.predict(symbol, days)
