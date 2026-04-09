#!/usr/bin/env python3
"""Test OpenAI integration"""

from config import config

print("=" * 60)
print("🤖 Testing OpenAI Integration")
print("=" * 60)

print(f"\n🔑 OpenAI Key: {config.OPENAI_API_KEY[:20]}...")

try:
    from openai import OpenAI
    client = OpenAI(api_key=config.OPENAI_API_KEY)
    
    print(f"\n📡 Sending test message to OpenAI...")
    
    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "You are a helpful financial advisor."},
            {"role": "user", "content": "What is a stock?"}
        ],
        max_tokens=100
    )
    
    print(f"\n✅ Success!")
    print(f"\n💬 Response:")
    print(response.choices[0].message.content)
    
except Exception as e:
    print(f"\n❌ Error: {e}")

print("\n" + "=" * 60)
