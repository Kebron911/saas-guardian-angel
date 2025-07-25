from fastapi import APIRouter, HTTPException, Body
from postgreSQL.database import DatabaseInterface
from typing import Dict, Any

router = APIRouter()

@router.get("/admin/finance-settings")
def get_finance_settings():
    query = "SELECT * FROM finance_settings LIMIT 1"
    result = DatabaseInterface.execute_query(query)
    if result:
        return result[0]
    # Defaults
    return {
        "default_currency": "usd",
        "currency_format": "before",
        "stripe_api_key": "",
        "stripe_secret_key": "",
        "paypal_client_id": "",
        "paypal_secret": "",
        "min_payout": 50,
        "auto_payouts": True
    }

@router.post("/admin/finance-settings")
def save_finance_settings(data: Dict[str, Any] = Body(...)):
    query = """
        INSERT INTO finance_settings (
            default_currency, currency_format, stripe_api_key, stripe_secret_key, paypal_client_id, paypal_secret, min_payout, auto_payouts, updated_at
        ) VALUES (
            %(default_currency)s, %(currency_format)s, %(stripe_api_key)s, %(stripe_secret_key)s, %(paypal_client_id)s, %(paypal_secret)s, %(min_payout)s, %(auto_payouts)s, NOW()
        )
        ON CONFLICT (id) DO UPDATE SET
            default_currency = EXCLUDED.default_currency,
            currency_format = EXCLUDED.currency_format,
            stripe_api_key = EXCLUDED.stripe_api_key,
            stripe_secret_key = EXCLUDED.stripe_secret_key,
            paypal_client_id = EXCLUDED.paypal_client_id,
            paypal_secret = EXCLUDED.paypal_secret,
            min_payout = EXCLUDED.min_payout,
            auto_payouts = EXCLUDED.auto_payouts,
            updated_at = NOW();
    """
    DatabaseInterface.execute_query(query, data)
    return {"success": True}
