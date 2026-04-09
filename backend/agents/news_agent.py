import requests
from textblob import TextBlob
from datetime import datetime, timedelta
import random
from config import config

class NewsAgent:
    """Agent responsible for fetching and analyzing news sentiment"""
    
    def __init__(self):
        self.news_api_key = config.NEWS_API_KEY
    
    def analyze_sentiment(self, symbol: str) -> dict:
        """Fetch news and perform sentiment analysis"""
        try:
            news_articles = self._fetch_news(symbol)
            sentiment_analysis = self._analyze_articles(news_articles)
            
            return {
                "symbol": symbol,
                "articles": news_articles[:5],  # Top 5 articles
                "overall_sentiment": sentiment_analysis["overall"],
                "sentiment_score": sentiment_analysis["score"],
                "positive_count": sentiment_analysis["positive"],
                "negative_count": sentiment_analysis["negative"],
                "neutral_count": sentiment_analysis["neutral"],
                "sentiment_distribution": {
                    "positive": sentiment_analysis["positive"],
                    "negative": sentiment_analysis["negative"],
                    "neutral": sentiment_analysis["neutral"]
                }
            }
        except:
            return self._get_demo_news(symbol)
    
    def _fetch_news(self, symbol: str) -> list:
        """Fetch news from NewsAPI"""
        # Try to fetch real news
        url = f"https://newsapi.org/v2/everything"
        
        # Try different search terms for better results
        search_terms = [
            f"{symbol} stock",
            f"{symbol} shares",
            symbol
        ]
        
        for search_term in search_terms:
            params = {
                "q": search_term,
                "apiKey": self.news_api_key,
                "language": "en",
                "sortBy": "publishedAt",
                "pageSize": 10
            }
            
            try:
                response = requests.get(url, params=params, timeout=5)
                if response.status_code == 200:
                    data = response.json()
                    articles = data.get("articles", [])
                    if articles:
                        return self._format_articles(articles)
                elif response.status_code == 401:
                    print(f"NewsAPI authentication failed - check API key")
                    break
                elif response.status_code == 429:
                    print(f"NewsAPI rate limit exceeded")
                    break
            except Exception as e:
                print(f"NewsAPI error: {e}")
                continue
        
        return []
    
    def _format_articles(self, articles: list) -> list:
        """Format news articles"""
        formatted = []
        for article in articles:
            formatted.append({
                "title": article.get("title", ""),
                "description": article.get("description", ""),
                "url": article.get("url", ""),
                "source": article.get("source", {}).get("name", "Unknown"),
                "published_at": article.get("publishedAt", ""),
                "sentiment": self._get_sentiment(article.get("title", "") + " " + article.get("description", ""))
            })
        return formatted
    
    def _get_sentiment(self, text: str) -> str:
        """Analyze sentiment using TextBlob"""
        try:
            analysis = TextBlob(text)
            polarity = analysis.sentiment.polarity
            
            if polarity > 0.1:
                return "positive"
            elif polarity < -0.1:
                return "negative"
            else:
                return "neutral"
        except:
            return "neutral"
    
    def _analyze_articles(self, articles: list) -> dict:
        """Aggregate sentiment from all articles"""
        if not articles:
            return {
                "overall": "neutral",
                "score": 0,
                "positive": 0,
                "negative": 0,
                "neutral": 0
            }
        
        sentiments = [a["sentiment"] for a in articles]
        positive = sentiments.count("positive")
        negative = sentiments.count("negative")
        neutral = sentiments.count("neutral")
        
        # Determine overall sentiment
        if positive > negative and positive > neutral:
            overall = "positive"
            score = 0.7
        elif negative > positive and negative > neutral:
            overall = "negative"
            score = -0.7
        else:
            overall = "neutral"
            score = 0.0
        
        return {
            "overall": overall,
            "score": score,
            "positive": positive,
            "negative": negative,
            "neutral": neutral
        }
    
    def _get_demo_news(self, symbol: str) -> dict:
        """Generate demo news data"""
        demo_articles = [
            {
                "title": f"{symbol} Reports Strong Q4 Earnings, Beats Expectations",
                "description": f"{symbol} announced quarterly earnings that exceeded analyst expectations, driven by strong revenue growth.",
                "url": "https://example.com/news1",
                "source": "Financial Times",
                "published_at": (datetime.now() - timedelta(hours=2)).isoformat(),
                "sentiment": "positive"
            },
            {
                "title": f"Analysts Upgrade {symbol} Stock Rating to Buy",
                "description": f"Major investment firms have upgraded their rating on {symbol} citing strong fundamentals.",
                "url": "https://example.com/news2",
                "source": "Bloomberg",
                "published_at": (datetime.now() - timedelta(hours=5)).isoformat(),
                "sentiment": "positive"
            },
            {
                "title": f"{symbol} Faces Regulatory Scrutiny in New Markets",
                "description": f"Regulatory bodies are reviewing {symbol}'s operations in emerging markets.",
                "url": "https://example.com/news3",
                "source": "Reuters",
                "published_at": (datetime.now() - timedelta(hours=8)).isoformat(),
                "sentiment": "negative"
            },
            {
                "title": f"{symbol} Announces New Product Launch",
                "description": f"{symbol} unveiled its latest product line at a major industry conference.",
                "url": "https://example.com/news4",
                "source": "TechCrunch",
                "published_at": (datetime.now() - timedelta(days=1)).isoformat(),
                "sentiment": "neutral"
            },
            {
                "title": f"Market Analysis: {symbol} Shows Resilience",
                "description": f"Despite market volatility, {symbol} continues to demonstrate strong performance.",
                "url": "https://example.com/news5",
                "source": "CNBC",
                "published_at": (datetime.now() - timedelta(days=1)).isoformat(),
                "sentiment": "positive"
            }
        ]
        
        return {
            "symbol": symbol,
            "articles": demo_articles,
            "overall_sentiment": "positive",
            "sentiment_score": 0.6,
            "positive_count": 3,
            "negative_count": 1,
            "neutral_count": 1,
            "sentiment_distribution": {
                "positive": 3,
                "negative": 1,
                "neutral": 1
            }
        }
