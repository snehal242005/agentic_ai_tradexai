import os
from typing import Dict, Any
from agents.data_agent import DataAgent
from agents.news_agent import NewsAgent
from agents.prediction_agent import PredictionAgent
from agents.decision_agent import DecisionAgent

class AgentOrchestrator:
    """Orchestrates multi-agent workflow for financial analysis"""
    
    def __init__(self):
        # Initialize agents
        self.data_agent = DataAgent()
        self.news_agent = NewsAgent()
        self.prediction_agent = PredictionAgent()
        self.decision_agent = DecisionAgent()
        
    async def process_query(self, user_message: str, user_id: str) -> Dict[str, Any]:
        """
        Main workflow:
        1. Detect intent from user message
        2. Extract entities (stock symbols, budget, etc.)
        3. Route to appropriate agents
        4. Aggregate results
        5. Generate final response
        """
        
        # Step 1: Intent detection and entity extraction
        intent_data = self._detect_intent(user_message)
        
        # Step 2: Execute agents based on intent
        agent_results = await self._execute_agents(intent_data)
        
        # Step 3: Decision agent aggregates and generates recommendation
        final_response = self.decision_agent.generate_recommendation(
            user_message, intent_data, agent_results
        )
        
        return final_response
    
    def _detect_intent(self, message: str) -> Dict[str, Any]:
        """Simple keyword-based intent detection"""
        return self._fallback_intent_detection(message)
    
    def _parse_intent_response(self, response: str, message: str) -> Dict[str, Any]:
        """Parse LLM response to extract intent data"""
        import re
        
        # Simple parsing logic
        intent_data = {
            "intent": "general_query",
            "symbols": [],
            "budget": None,
            "risk_level": "medium"
        }
        
        # Extract stock symbols (common patterns)
        symbols = re.findall(r'\b[A-Z]{2,5}\b', message.upper())
        common_stocks = ['AAPL', 'GOOGL', 'MSFT', 'AMZN', 'TSLA', 'TCS', 'INFY', 'RELIANCE']
        intent_data["symbols"] = [s for s in symbols if s in common_stocks][:3]
        
        # Detect intent from keywords
        message_lower = message.lower()
        if any(word in message_lower for word in ['portfolio', 'allocate', 'diversify', 'create portfolio', 'build portfolio']):
            intent_data["intent"] = "portfolio_creation"
        elif any(word in message_lower for word in ['predict', 'forecast', 'future', 'will', 'next week', 'price target']):
            intent_data["intent"] = "price_prediction"
        elif any(word in message_lower for word in ['news', 'why', 'falling', 'rising', 'sentiment']):
            intent_data["intent"] = "news_analysis"
        elif any(word in message_lower for word in ['analyze', 'analysis', 'buy', 'sell', 'invest', 'purchase', 'recommend', 'should i', 'worth', 'good stock', 'check']):
            intent_data["intent"] = "stock_analysis"
        elif intent_data["symbols"]:
            # If stock symbols are mentioned but no clear intent, default to stock analysis
            intent_data["intent"] = "stock_analysis"
        
        # Extract budget
        budget_match = re.search(r'₹?\s*(\d+(?:,\d+)*(?:\.\d+)?)\s*(?:rupees|rs|inr|dollars)?', message_lower)
        if budget_match:
            intent_data["budget"] = float(budget_match.group(1).replace(',', ''))
        
        # Extract risk level
        if 'low risk' in message_lower or 'safe' in message_lower:
            intent_data["risk_level"] = "low"
        elif 'high risk' in message_lower or 'aggressive' in message_lower:
            intent_data["risk_level"] = "high"
        
        return intent_data
    
    def _fallback_intent_detection(self, message: str) -> Dict[str, Any]:
        """Fallback keyword-based intent detection"""
        return self._parse_intent_response("", message)
    
    async def _execute_agents(self, intent_data: Dict[str, Any]) -> Dict[str, Any]:
        """Execute relevant agents based on intent"""
        
        results = {}
        symbols = intent_data.get("symbols", [])
        
        # Default symbols if none provided
        if not symbols:
            symbols = ["AAPL", "GOOGL", "MSFT"]
        
        # Data Agent - always fetch stock data
        results["stock_data"] = {}
        for symbol in symbols:
            results["stock_data"][symbol] = self.data_agent.fetch_stock_data(symbol)
        
        # News Agent - fetch news and sentiment
        if intent_data["intent"] in ["news_analysis", "stock_analysis"]:
            results["news_sentiment"] = {}
            for symbol in symbols:
                results["news_sentiment"][symbol] = self.news_agent.analyze_sentiment(symbol)
        
        # Prediction Agent - generate predictions
        if intent_data["intent"] in ["price_prediction", "stock_analysis"]:
            results["predictions"] = {}
            for symbol in symbols:
                results["predictions"][symbol] = self.prediction_agent.predict(symbol)
        
        return results
