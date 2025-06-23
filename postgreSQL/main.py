from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import logging

# Import routers
from postgreSQL.admin.finance import router as admin_finance_router
from postgreSQL.admin.finance_dashboard import router as admin_finance_dashboard_router
from postgreSQL.blog import router as blog_router
from postgreSQL.metrics import router as metrics_router

# Configure logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

app = FastAPI(title="PostgreSQL API", version="1.0.0")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(admin_finance_router, prefix="/admin", tags=["admin-finance"])
app.include_router(admin_finance_dashboard_router, prefix="/admin/finance", tags=["admin-finance-dashboard"])
app.include_router(blog_router, prefix="/blog", tags=["blog"])
app.include_router(metrics_router, prefix="/analytics", tags=["analytics"])

@app.get("/")
async def read_root():
    logger.info("=== API: GET / called ===")
    return {"message": "Hello World"}

if __name__ == "__main__":
    # This block is for running the app using Uvicorn directly
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

logger.info("=== MAIN MODULE: All routers registered successfully ===")
