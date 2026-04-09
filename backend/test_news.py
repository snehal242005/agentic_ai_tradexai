#!/usr/bin/env python3
"""Test NewsAPI integration"""

from agents.news_agent import NewsAgent
from config import config

print("=" * 60)
print("📰 Testing NewsAPI Integration")
print("=" * 60)

print(f"\n🔑 NewsAPI Key: {config.NEWS_API_KEY[:10]}...")

agent = NewsAgent()
print(f"\n📡 Fetching news for AAPL...")

try:
    result = agent.analyze_sentiment("AAPL")
    
    print(f"\n✅ Success!")
    print(f"Symbol: {result['symbol']}")
    print(f"Overall Sentiment: {result['overall_sentiment']}")
    print(f"Articles found: {len(result['articles'])}")
    
    if result['articles']:
        print(f"\n📄 First article:")
        article = result['articles'][0]
        print(f"  Title: {article['title'][:80]}...")
        print(f"  Source: {article['source']}")
        print(f"  Sentiment: {article['sentiment']}")
    
except Exception as e:
    print(f"\n❌ Error: {e}")

print("\n" + "=" * 60)
