#!/usr/bin/env python3
"""
Startup script for Student Life Management System
Seeds the database and starts the FastAPI server
"""

import os
import sys
import subprocess
import time

def main():
    print("🚀 Starting Student Life Management System...")
    
    # Change to backend directory
    backend_dir = os.path.join(os.path.dirname(__file__), "backend")
    os.chdir(backend_dir)
    
    # Install dependencies if needed
    print("📦 Checking dependencies...")
    try:
        import fastapi
        print("✅ Dependencies already installed")
    except ImportError:
        print("📥 Installing dependencies...")
        subprocess.run([sys.executable, "-m", "pip", "install", "-r", "requirements.txt"], check=True)
        print("✅ Dependencies installed")
    
    # Seed the database
    print("🌱 Seeding database...")
    try:
        from seed_db import seed_database
        seed_database()
    except Exception as e:
        print(f"⚠️  Warning: Could not seed database: {e}")
    
    # Start the server
    print("🌐 Starting FastAPI server...")
    print("📖 API Documentation will be available at: http://localhost:8000/docs")
    print("🔍 Health check: http://localhost:8000/health")
    print("⏹️  Press Ctrl+C to stop the server")
    print("-" * 50)
    
    try:
        subprocess.run([sys.executable, "main.py"])
    except KeyboardInterrupt:
        print("\n👋 Server stopped by user")
    except Exception as e:
        print(f"❌ Error starting server: {e}")

if __name__ == "__main__":
    main() 