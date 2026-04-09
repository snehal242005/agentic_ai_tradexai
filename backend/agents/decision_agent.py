from typing import Dict, Any, List
from config import config

class DecisionAgent:
    """Agent that aggregates all data and generates final recommendations"""

    def __init__(self):
        self.use_openai = bool(config.OPENAI_API_KEY and config.OPENAI_API_KEY != "your-openai-api-key-here")
        self.use_gemini = bool(config.GOOGLE_API_KEY and config.GOOGLE_API_KEY != "your-gemini-api-key-here")

        self.openai_client = None
        self.gemini_client = None
        self.gemini_model = "gemini-2.5-flash"

        if self.use_openai:
            try:
                from openai import OpenAI
                self.openai_client = OpenAI(api_key=config.OPENAI_API_KEY)
                print("OpenAI client initialized")
            except Exception as e:
                print(f"OpenAI initialization failed: {e}")
                self.use_openai = False

        if self.use_gemini:
            try:
                from google import genai
                self.gemini_client = genai.Client(api_key=config.GOOGLE_API_KEY)
                print("Gemini client initialized")
            except Exception as e:
                print(f"Gemini initialization failed: {e}")
                self.use_gemini = False

    def _generate_ai_response(self, system_prompt: str, user_prompt: str, max_tokens: int = 300) -> str:
        """Generate AI response using OpenAI or Gemini with retry on 503"""
        import time

        # Try OpenAI first
        if self.use_openai and self.openai_client:
            try:
                response = self.openai_client.chat.completions.create(
                    model="gpt-3.5-turbo",
                    messages=[
                        {"role": "system", "content": system_prompt},
                        {"role": "user", "content": user_prompt}
                    ],
                    max_tokens=max_tokens,
                    temperature=0.7
                )
                return response.choices[0].message.content
            except Exception as e:
                error_msg = str(e)
                if "insufficient_quota" in error_msg or "429" in error_msg:
                    print("OpenAI quota exceeded - trying Gemini")
                    self.use_openai = False
                else:
                    print(f"OpenAI error: {e}")

        # Try Gemini with up to 3 retries on 503
        if self.use_gemini and self.gemini_client:
            full_prompt = f"{system_prompt}\n\nUser: {user_prompt}"
            for attempt in range(3):
                try:
                    response = self.gemini_client.models.generate_content(
                        model=self.gemini_model,
                        contents=full_prompt
                    )
                    return response.text
                except Exception as e:
                    error_msg = str(e)
                    if "503" in error_msg or "UNAVAILABLE" in error_msg:
                        if attempt < 2:
                            wait = 2 ** attempt  # 1s, 2s
                            print(f"Gemini 503, retrying in {wait}s (attempt {attempt+1}/3)")
                            time.sleep(wait)
                            continue
                        print(f"Gemini unavailable after 3 attempts")
                    elif "429" in error_msg or "RESOURCE_EXHAUSTED" in error_msg:
                        print(f"Gemini quota exceeded")
                        self.use_gemini = False
                    else:
                        print(f"Gemini error: {e}")
                    break

        return None  # No AI available

    def generate_recommendation(self, user_message: str, intent_data: Dict, agent_results: Dict) -> Dict[str, Any]:
        """
        Aggregate results from all agents and generate final recommendation
        with explainable reasoning
        """

        intent = intent_data.get("intent", "general_query")
        symbols = intent_data.get("symbols", [])

        if intent == "stock_analysis":
            return self._generate_stock_recommendation(user_message, symbols, agent_results)
        elif intent == "portfolio_creation":
            return self._generate_portfolio_recommendation(user_message, intent_data, agent_results)
        elif intent == "price_prediction":
            return self._generate_prediction_analysis(user_message, symbols, agent_results)
        elif intent == "news_analysis":
            return self._generate_news_analysis(user_message, symbols, agent_results)
        else:
            return self._generate_general_response(user_message, agent_results)

    def _generate_stock_recommendation(self, message: str, symbols: List[str], results: Dict) -> Dict[str, Any]:
        """Generate stock buy/sell recommendation with reasoning"""

        recommendations = []

        for symbol in symbols:
            stock_data = results.get("stock_data", {}).get(symbol, {})
            news_data = results.get("news_sentiment", {}).get(symbol, {})
            prediction_data = results.get("predictions", {}).get(symbol, {})

            factors = self._analyze_factors(stock_data, news_data, prediction_data)
            recommendation = self._determine_recommendation(factors)

            recommendations.append({
                "symbol": symbol,
                "action": recommendation["action"],
                "confidence": recommendation["confidence"],
                "reasoning": recommendation["reasoning"],
                "factors": factors,
                "current_price": stock_data.get("current_price", 0),
                "target_price": recommendation.get("target_price"),
                "risk_level": recommendation["risk_level"]
            })

        response_text = self._generate_response_text(message, recommendations)

        return {
            "response": response_text,
            "recommendations": recommendations,
            "intent": "stock_analysis",
            "data": {
                "stocks": results.get("stock_data", {}),
                "news": results.get("news_sentiment", {}),
                "predictions": results.get("predictions", {})
            }
        }

    def _analyze_factors(self, stock_data: Dict, news_data: Dict, prediction_data: Dict) -> Dict:
        """Analyze all factors for decision making"""

        factors = {
            "technical": {"score": 0, "signals": []},
            "sentiment": {"score": 0, "signals": []},
            "prediction": {"score": 0, "signals": []},
            "overall_score": 0
        }

        if stock_data:
            current_price = stock_data.get("current_price", 0)
            sma_20 = stock_data.get("sma_20", 0)
            sma_50 = stock_data.get("sma_50", 0)
            change_percent = stock_data.get("change_percent", 0)

            if current_price > sma_20:
                factors["technical"]["score"] += 30
                factors["technical"]["signals"].append("Price above 20-day moving average (bullish)")
            else:
                factors["technical"]["score"] -= 20
                factors["technical"]["signals"].append("Price below 20-day moving average (bearish)")

            if sma_20 > sma_50:
                factors["technical"]["score"] += 20
                factors["technical"]["signals"].append("Short-term trend is positive")

            if change_percent > 2:
                factors["technical"]["signals"].append(f"Strong upward momentum (+{change_percent}%)")
            elif change_percent < -2:
                factors["technical"]["signals"].append(f"Downward pressure ({change_percent}%)")

        if news_data:
            sentiment = news_data.get("overall_sentiment", "neutral")

            if sentiment == "positive":
                factors["sentiment"]["score"] += 40
                factors["sentiment"]["signals"].append("Positive news sentiment detected")
            elif sentiment == "negative":
                factors["sentiment"]["score"] -= 30
                factors["sentiment"]["signals"].append("Negative news sentiment detected")
            else:
                factors["sentiment"]["score"] += 10
                factors["sentiment"]["signals"].append("Neutral news sentiment")

        if prediction_data:
            current = prediction_data.get("current_price", 0)
            predictions = prediction_data.get("predictions", [])

            if predictions and current > 0:
                future_price = predictions[-1].get("predicted_price", current)
                expected_return = ((future_price - current) / current) * 100

                if expected_return > 5:
                    factors["prediction"]["score"] += 30
                    factors["prediction"]["signals"].append(f"Model predicts {expected_return:.1f}% upside")
                elif expected_return < -5:
                    factors["prediction"]["score"] -= 30
                    factors["prediction"]["signals"].append(f"Model predicts {expected_return:.1f}% downside")

        factors["overall_score"] = (
            factors["technical"]["score"] +
            factors["sentiment"]["score"] +
            factors["prediction"]["score"]
        )

        return factors

    def _determine_recommendation(self, factors: Dict) -> Dict:
        """Determine buy/sell/hold recommendation"""

        score = factors["overall_score"]

        if score >= 60:
            action, confidence, risk_level = "BUY", "high", "medium"
            reasoning = "Strong buy signal based on positive technical indicators, favorable sentiment, and upward price prediction."
        elif score >= 30:
            action, confidence, risk_level = "BUY", "medium", "medium"
            reasoning = "Moderate buy signal with some positive indicators, but exercise caution."
        elif score >= -20:
            action, confidence, risk_level = "HOLD", "medium", "low"
            reasoning = "Mixed signals suggest holding current position and monitoring developments."
        elif score >= -50:
            action, confidence, risk_level = "SELL", "medium", "high"
            reasoning = "Weak performance indicators suggest considering exit or reducing position."
        else:
            action, confidence, risk_level = "SELL", "high", "high"
            reasoning = "Strong sell signal due to negative technical indicators, poor sentiment, and downward prediction."

        all_signals = (
            factors["technical"]["signals"] +
            factors["sentiment"]["signals"] +
            factors["prediction"]["signals"]
        )

        detailed_reasoning = reasoning + " Key factors: " + "; ".join(all_signals[:3])

        return {
            "action": action,
            "confidence": confidence,
            "risk_level": risk_level,
            "reasoning": detailed_reasoning,
            "target_price": None
        }

    def _generate_response_text(self, message: str, recommendations: List[Dict]) -> str:
        """Generate natural language response"""

        if not recommendations:
            return "I couldn't find sufficient data to make a recommendation. Please try with valid stock symbols."

        context = f"User asked: {message}\n\nAnalysis results:\n"
        for rec in recommendations:
            context += f"\n{rec['symbol']}: {rec['action']} (Price: ${rec['current_price']})\n"
            context += f"Reasoning: {rec['reasoning']}\n"

        ai_response = self._generate_ai_response(
            "You are a professional financial advisor. Provide clear, concise investment advice based on the analysis provided. Be helpful and explain your reasoning.",
            context,
            300
        )

        if ai_response:
            return ai_response

        # Template-based fallback
        response_parts = []
        for rec in recommendations:
            response_parts.append(
                f"**{rec['symbol']}** - Current Price: ${rec['current_price']}\n"
                f"Recommendation: **{rec['action']}** (Confidence: {rec['confidence']})\n"
                f"Analysis: {rec['reasoning']}"
            )

        return "Based on my multi-agent analysis, here are my recommendations:\n\n" + "\n\n".join(response_parts)

    def _generate_portfolio_recommendation(self, message: str, intent_data: Dict, results: Dict) -> Dict:
        """Generate portfolio allocation recommendation"""

        budget = intent_data.get("budget", 10000)
        risk_level = intent_data.get("risk_level", "medium")

        if risk_level == "low":
            allocation = [
                {"symbol": "TCS", "percentage": 40, "amount": budget * 0.4},
                {"symbol": "INFY", "percentage": 30, "amount": budget * 0.3},
                {"symbol": "RELIANCE", "percentage": 30, "amount": budget * 0.3}
            ]
        elif risk_level == "high":
            allocation = [
                {"symbol": "TSLA", "percentage": 35, "amount": budget * 0.35},
                {"symbol": "AAPL", "percentage": 35, "amount": budget * 0.35},
                {"symbol": "GOOGL", "percentage": 30, "amount": budget * 0.3}
            ]
        else:
            allocation = [
                {"symbol": "AAPL", "percentage": 30, "amount": budget * 0.3},
                {"symbol": "MSFT", "percentage": 30, "amount": budget * 0.3},
                {"symbol": "GOOGL", "percentage": 25, "amount": budget * 0.25},
                {"symbol": "TCS", "percentage": 15, "amount": budget * 0.15}
            ]

        # Build context for Gemini
        allocation_text = "\n".join(
            f"- {item['symbol']}: {item['percentage']}% (${item['amount']:,.0f})"
            for item in allocation
        )
        context = (
            f"User request: {message}\n\n"
            f"Budget: ${budget:,.0f} | Risk level: {risk_level}\n\n"
            f"Suggested allocation:\n{allocation_text}\n\n"
            f"Please explain this portfolio recommendation in a helpful, conversational way. "
            f"Explain why each stock was chosen, the risk profile, and any tips for the user."
        )

        ai_response = self._generate_ai_response(
            "You are a professional financial advisor helping a user build an investment portfolio. Be clear, friendly, and educational.",
            context, 400
        )

        response_text = ai_response if ai_response else (
            f"Based on your budget of ${budget:,.0f} and {risk_level} risk tolerance, here is your portfolio:\n\n{allocation_text}"
        )

        return {
            "response": response_text,
            "portfolio": allocation,
            "intent": "portfolio_creation",
            "data": results
        }

    def _generate_prediction_analysis(self, message: str, symbols: List[str], results: Dict) -> Dict:
        """Generate prediction analysis response"""

        predictions = results.get("predictions", {})

        # Build context for Gemini
        pred_summary = []
        for symbol in symbols:
            pred_data = predictions.get(symbol, {})
            if pred_data:
                current = pred_data.get("current_price", 0)
                future = pred_data.get("predictions", [])
                if future:
                    future_price = future[-1].get("predicted_price", 0)
                    change = ((future_price - current) / current * 100) if current > 0 else 0
                    trend = pred_data.get("trend", "neutral")
                    accuracy = pred_data.get('metrics', {}).get('accuracy', 85)
                    pred_summary.append(
                        f"{symbol}: Current ${current} → Predicted ${future_price} in 7 days "
                        f"({'+' if change > 0 else ''}{change:.1f}%), trend: {trend}, model accuracy: {accuracy}%"
                    )

        context = (
            f"User request: {message}\n\n"
            f"7-day ML price predictions:\n" + "\n".join(pred_summary) + "\n\n"
            f"Please interpret these predictions for the user. Explain what the trend means, "
            f"whether it's a good time to buy/sell, and any caveats about prediction accuracy."
        )

        ai_response = self._generate_ai_response(
            "You are a financial analyst explaining stock price predictions to a user. Be informative and honest about the limitations of predictions.",
            context, 400
        )

        fallback = "\n\n".join(pred_summary) if pred_summary else "Prediction data unavailable."
        return {
            "response": ai_response if ai_response else fallback,
            "predictions": predictions,
            "intent": "price_prediction",
            "data": results
        }

    def _generate_news_analysis(self, message: str, symbols: List[str], results: Dict) -> Dict:
        """Generate news sentiment analysis response"""

        news_data = results.get("news_sentiment", {})

        # Build context for Gemini
        news_summary = []
        for symbol in symbols:
            news = news_data.get(symbol, {})
            if news:
                sentiment = news.get("overall_sentiment", "neutral")
                articles = news.get("articles", [])
                headlines = [a.get("title", "") for a in articles[:3]]
                news_summary.append(
                    f"{symbol}: Overall sentiment = {sentiment.upper()}\n"
                    f"  Positive: {news.get('positive_count',0)}, Negative: {news.get('negative_count',0)}, Neutral: {news.get('neutral_count',0)}\n"
                    f"  Top headlines: {'; '.join(headlines)}"
                )

        context = (
            f"User request: {message}\n\n"
            f"News sentiment analysis:\n" + "\n\n".join(news_summary) + "\n\n"
            f"Please explain what this news sentiment means for the stock(s), "
            f"how it might impact the price, and what the user should watch out for."
        )

        ai_response = self._generate_ai_response(
            "You are a financial news analyst. Explain news sentiment and its market implications in a clear, helpful way.",
            context, 400
        )

        fallback = "\n\n".join(news_summary) if news_summary else "No recent news found."
        return {
            "response": ai_response if ai_response else fallback,
            "news": news_data,
            "intent": "news_analysis",
            "data": results
        }

    def _generate_general_response(self, message: str, results: Dict) -> Dict:
        """Generate general response — always goes through Gemini"""

        ai_response = self._generate_ai_response(
            "You are an AI Financial Copilot — a smart, friendly financial advisor. "
            "Help users with stock analysis, investment advice, portfolio building, price predictions, and market news. "
            "Answer conversationally. If the user greets you, greet them back and briefly explain what you can do. "
            "Never say you cannot access real-time data — the system already fetches live data for you.",
            message,
            300
        )

        if ai_response:
            return {
                "response": ai_response,
                "intent": "general_query",
                "data": results
            }

        return {
            "response": "Hello! I'm your AI Financial Copilot. I can help you with:\n\n"
                       "- Stock Analysis: Ask me about any stock (e.g., 'Analyze AAPL')\n"
                       "- Price Predictions: Get 7-day forecasts (e.g., 'Predict TSLA price')\n"
                       "- News Sentiment: Latest news analysis (e.g., 'News about GOOGL')\n"
                       "- Portfolio Creation: Build optimized portfolios (e.g., 'Create portfolio with $10000')\n\n"
                       "What would you like to know?",
            "intent": "general_query",
            "data": results
        }
