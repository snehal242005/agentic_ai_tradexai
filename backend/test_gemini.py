#!/usr/bin/env python3
"""Test Gemini API integration"""

from config import config

print("=" * 60)
print("🤖 Testing Gemini API Integration")
print("=" * 60)

print(f"\n🔑 Gemini Key: {config.GOOGLE_API_KEY[:20]}...")

try:
    import google.generativeai as genai
    genai.configure(api_key=config.GOOGLE_API_KEY)
    model = genai.GenerativeModel('gemini-2.5-flash')
    
    print(f"\n📡 Sending test message to Gemini...")
    
    response = model.generate_content("What is a stock? Answer in one sentence.")
    
    print(f"\n✅ Success!")
    print(f"\n💬 Response:")
    print(response.text)
    
except Exception as e:
    print(f"\n❌ Error: {e}")

print("\n" + "=" * 60)
