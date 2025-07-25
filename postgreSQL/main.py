import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from postgreSQL.metrics import analytics  # Updated import path
from postgreSQL.blog import posts  # Import blog posts router
from postgreSQL.blog import categories  # Import blog categories router
from postgreSQL.admin import users  # Import admin users router
from postgreSQL.login_user import login
from postgreSQL.affiliate import userslayout # Import users layout router
from postgreSQL.admin import referral_settings
from postgreSQL.admin import finance_settings
from postgreSQL.admin import global_settings, invoice_settings, system_settings, email_settings



# Import referrals router with explicit error handling
try:
    from postgreSQL.admin import referrals  # Import admin referrals router
    referrals_router_available = True
    print("Successfully imported referrals router")
except ImportError as e:
    print(f"Failed to import referrals router: {e}")
    referrals_router_available = False

# Import finance router with explicit error handling
try:
    from postgreSQL.admin import finance  # Import admin finance router
    finance_router_available = True
    print("Successfully imported finance router")
except ImportError as e:
    print(f"Failed to import finance router: {e}")
    finance_router_available = False

# Import dashboard router with explicit error handling
try:
    from postgreSQL.admin import dashboard  # Import admin dashboard router
    dashboard_router_available = True
    print("Successfully imported dashboard router")
except ImportError as e:
    print(f"Failed to import dashboard router: {e}")
    dashboard_router_available = False

import logging

logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

app = FastAPI(title="PostgreSQL API", description="API for PostgreSQL operations")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins in development
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "PostgreSQL API is running"}

@app.get("/health")
def health_check():
    return {"status": "healthy"}

# Include the routers with prefix
app.include_router(analytics.router, prefix="/analytics", tags=["analytics"])
app.include_router(analytics.router, prefix="/admin", tags=["admin-support"])
app.include_router(posts.router, prefix="/blog", tags=["blog"])
app.include_router(categories.router, prefix="/blog", tags=["blog-categories"])
logger.info("Blog categories router included successfully")
app.include_router(users.router, prefix="/admin", tags=["admin"])
app.include_router(login.router)  # No prefix, so /api/login is available
app.include_router(userslayout.router)
app.include_router(referral_settings.router, prefix="/admin", tags=["admin-referral-settings"])
app.include_router(finance_settings.router, prefix="/admin", tags=["admin-finance-settings"])
app.include_router(global_settings.router, prefix="/admin", tags=["admin-global-settings"])
app.include_router(invoice_settings.router, prefix="/admin", tags=["admin-invoice-settings"])
app.include_router(system_settings.router, prefix="/admin", tags=["admin-system-settings"])
app.include_router(email_settings.router, prefix="/admin", tags=["admin-email-settings"])


# Include referrals router only if it was imported successfully
if referrals_router_available:
    app.include_router(referrals.router, prefix="/admin", tags=["admin-referrals"])
    logger.info("Referrals router included successfully")
else:
    logger.error("Referrals router not available - skipping inclusion")

# Include finance router only if it was imported successfully
if finance_router_available:
    app.include_router(finance.router, prefix="/admin", tags=["admin-finance"])
    logger.info("Finance router included successfully")
else:
    logger.error("Finance router not available - skipping inclusion")

# Include dashboard router only if it was imported successfully
if dashboard_router_available:
    app.include_router(dashboard.router, prefix="/admin", tags=["admin-dashboard"])
    logger.info("Dashboard router included successfully")
else:
    logger.error("Dashboard router not available - skipping inclusion")

@app.get("/debug/routes")
def debug_routes():
    """Debug endpoint to see all available routes"""
    routes = []
    for route in app.routes:
        if hasattr(route, 'methods') and hasattr(route, 'path'):
            routes.append({
                "path": route.path,
                "methods": list(route.methods),
                "name": getattr(route, 'name', 'unknown')
            })
    return {"routes": routes}

# Test endpoint to verify referrals router is working
@app.get("/admin/test-referrals")
def test_referrals():
    return {"message": "Referrals router is working"}




if __name__ == "__main__":
    try:
        logger.info("Starting PostgreSQL API server...")
        logger.info("Available routes will be:")
        logger.info("- GET /")
        logger.info("- GET /health") 
        logger.info("- GET /debug/routes")
        logger.info("- GET /admin/users")
        logger.info("- GET /admin/user-stats")
        logger.info("- POST /admin/users")
        if referrals_router_available:
            logger.info("- GET /admin/affiliates")
            logger.info("- GET /admin/referral-payouts")
            logger.info("- GET /admin/referral-stats")
            logger.info("- PUT /admin/referral-payouts/{payout_id}")
            logger.info("- GET /admin/test")
        if finance_router_available:
            logger.info("- GET /admin/transactions")
            logger.info("- GET /admin/plans")
            logger.info("- GET /admin/subscriptions")
            logger.info("- GET /admin/promo-codes")
            logger.info("- POST /admin/promo-codes")
        if dashboard_router_available:
            logger.info("- GET /admin/dashboard-stats")
            logger.info("- GET /admin/revenue-chart")
            logger.info("- GET /admin/subscription-chart")
            logger.info("- GET /admin/admin-activity")
        logger.info("- GET /admin/test-referrals")
        uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)
    except Exception as e:
        logger.error(f"Server error: {str(e)}")
        raise
