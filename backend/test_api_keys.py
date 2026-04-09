#!/usr/bin/env python3
"""Quick test to verify API keys are loaded correctly"""

from config import config

print("=" * 60)
print("🔑 API Keys Configuration Check")
print("=" * 60)

# Check OpenAI Key
if config.OPENAI_API_KEY and config.OPENAI_API_KEY != "your-openai-api-key-here":
    print("✅ OpenAI API Key: LOADED")
    print(f"   Key starts with: {config.OPENAI_API_KEY[:15]}...")
else:
    print("❌ OpenAI API Key: NOT SET")

# Check NewsAPI Key
if config.NEWS_API_KEY and config.NEWS_API_KEY != "your-news-api-key-here":
    print("✅ NewsAPI Key: LOADED")
    print(f"   Key starts with: {config.NEWS_API_KEY[:10]}...")
else:
    print("❌ NewsAPI Key: NOT SET")

# Check for warnings
warnings = config.validate()
if warnings:
    print("\n⚠️  Warnings:")
    for warning in warnings:
        print(f"   - {warning}")
else:
    print("\n🎉 All API keys configured correctly!")

print("=" * 60)
