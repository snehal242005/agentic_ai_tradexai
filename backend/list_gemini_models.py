#!/usr/bin/env python3
"""List available Gemini models"""

from config import config
import google.generativeai as genai

genai.configure(api_key=config.GOOGLE_API_KEY)

print("Available Gemini models:")
for model in genai.list_models():
    if 'generateContent' in model.supported_generation_methods:
        print(f"  - {model.name}")
