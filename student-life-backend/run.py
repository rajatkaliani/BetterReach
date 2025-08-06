import uvicorn
from app.main import app

if __name__ == "__main__":
    # Run the application
    print("Starting Student Life Management System API...")
    uvicorn.run(
        "app.main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        log_level="info"
    ) 