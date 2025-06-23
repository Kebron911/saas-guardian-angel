
from fastapi import APIRouter
import logging

# Configure logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

# Create the router instance
router = APIRouter()

@router.get("/health")
async def blog_health_check():
    """Health check endpoint for blog module"""
    logger.info("=== Blog module health check ===")
    return {"status": "ok", "module": "blog"}

logger.info("=== BLOG MODULE: Blog router ready ===")
