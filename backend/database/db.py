from typing import Dict, List, Optional
import json
import os
from datetime import datetime

class Database:
    """Simple file-based database for demo purposes"""
    
    def __init__(self):
        self.data_dir = "data"
        os.makedirs(self.data_dir, exist_ok=True)
        self.portfolios_file = os.path.join(self.data_dir, "portfolios.json")
        self.alerts_file = os.path.join(self.data_dir, "alerts.json")
        self.preferences_file = os.path.join(self.data_dir, "preferences.json")
        
        # Initialize files if they don't exist
        for file in [self.portfolios_file, self.alerts_file, self.preferences_file]:
            if not os.path.exists(file):
                with open(file, 'w') as f:
                    json.dump({}, f)
    
    def save_portfolio(self, user_id: str, portfolio: Dict):
        """Save user portfolio"""
        portfolios = self._load_json(self.portfolios_file)
        portfolios[user_id] = portfolio
        self._save_json(self.portfolios_file, portfolios)
    
    def get_portfolio(self, user_id: str) -> Optional[Dict]:
        """Get user portfolio"""
        portfolios = self._load_json(self.portfolios_file)
        return portfolios.get(user_id)
    
    def save_alert(self, user_id: str, alert: Dict):
        """Save alert for user"""
        alerts = self._load_json(self.alerts_file)
        if user_id not in alerts:
            alerts[user_id] = []
        alerts[user_id].append(alert)
        self._save_json(self.alerts_file, alerts)
    
    def get_alerts(self, user_id: str) -> List[Dict]:
        """Get user alerts"""
        alerts = self._load_json(self.alerts_file)
        user_alerts = alerts.get(user_id, [])
        
        # Add demo alerts if none exist
        if not user_alerts:
            user_alerts = [
                {
                    "id": "1",
                    "type": "price_alert",
                    "symbol": "AAPL",
                    "message": "AAPL reached your target price of $175",
                    "severity": "info",
                    "timestamp": "2026-04-09T09:30:00Z",
                    "read": False
                },
                {
                    "id": "2",
                    "type": "opportunity",
                    "symbol": "TSLA",
                    "message": "Buy opportunity detected for TSLA - Strong upward trend",
                    "severity": "success",
                    "timestamp": "2026-04-09T08:15:00Z",
                    "read": False
                },
                {
                    "id": "3",
                    "type": "warning",
                    "symbol": "GOOGL",
                    "message": "GOOGL dropped 3% - Consider reviewing position",
                    "severity": "warning",
                    "timestamp": "2026-04-09T07:45:00Z",
                    "read": True
                }
            ]
        
        return user_alerts
    
    def save_preferences(self, user_id: str, preferences: Dict):
        """Save user preferences"""
        prefs = self._load_json(self.preferences_file)
        prefs[user_id] = preferences
        self._save_json(self.preferences_file, prefs)
    
    def get_preferences(self, user_id: str) -> Dict:
        """Get user preferences"""
        prefs = self._load_json(self.preferences_file)
        return prefs.get(user_id, {
            "risk_level": "medium",
            "budget": 100000,
            "favorite_stocks": [],
            "alert_preferences": {
                "price_changes": True,
                "news_alerts": True,
                "opportunities": True
            }
        })
    
    def _load_json(self, filepath: str) -> Dict:
        """Load JSON file"""
        try:
            with open(filepath, 'r') as f:
                return json.load(f)
        except:
            return {}
    
    def _save_json(self, filepath: str, data: Dict):
        """Save JSON file"""
        with open(filepath, 'w') as f:
            json.dump(data, f, indent=2)
