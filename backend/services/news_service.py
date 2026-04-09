from agents.news_agent import NewsAgent

class NewsService:
    """Service layer for news operations"""
    
    def __init__(self):
        self.news_agent = NewsAgent()
    
    def get_news_with_sentiment(self, symbol: str):
        """Get news articles with sentiment analysis"""
        return self.news_agent.analyze_sentiment(symbol)
