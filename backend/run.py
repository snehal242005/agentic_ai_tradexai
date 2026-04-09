#!/usr/bin/env python
"""
Run script for AI Financial Copilot backend
"""
import sys
import io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding='utf-8')

import uvicorn
from config import config

if __name__ == "__main__":
    # Validate configuration
    warnings = config.validate()
    if warnings:
        print("\n[!] Configuration Warnings:")
        for warning in warnings:
            print(f"  - {warning}")
        print()

    print("Starting AI Financial Copilot Backend...")
    print(f"Server: http://{config.HOST}:{config.PORT}")
    print(f"API Docs: http://{config.HOST}:{config.PORT}/docs")
    print()
    
    uvicorn.run(
        "app:app",
        host=config.HOST,
        port=config.PORT,
        reload=True,
        log_level="info"
    )
