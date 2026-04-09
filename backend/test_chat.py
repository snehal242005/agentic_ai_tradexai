#!/usr/bin/env python3
"""Test the chat endpoint with OpenAI"""

import asyncio
from agents.orchestrator import AgentOrchestrator

async def test_chat():
    print("=" * 60)
    print("🤖 Testing AI Assistant")
    print("=" * 60)
    
    orchestrator = AgentOrchestrator()
    
    test_message = "Analyze AAPL stock"
    print(f"\n📝 User Message: {test_message}")
    print("\n⏳ Processing...")
    
    try:
        response = await orchestrator.process_query(test_message, "test_user")
        print("\n✅ Response received!")
        print(f"\n💬 AI Response:\n{response.get('response', 'No response')}")
        
        if response.get('data'):
            print(f"\n📊 Data: {response['data']}")
            
    except Exception as e:
        print(f"\n❌ Error: {str(e)}")
    
    print("\n" + "=" * 60)

if __name__ == "__main__":
    asyncio.run(test_chat())
