
from fastapi import APIRouter
import logging

# Configure logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

# Create the router instance
router = APIRouter()

@router.get("/health")
async def metrics_health_check():
    """Health check endpoint for metrics module"""
    logger.info("=== Metrics module health check ===")
    return {"status": "ok", "module": "metrics"}

logger.info("=== METRICS MODULE: Metrics router ready ===")
