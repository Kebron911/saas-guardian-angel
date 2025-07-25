from datetime import datetime
from postgreSQL.database import DatabaseInterface
from typing import Optional, Dict, Any
import uuid

def log_admin_activity(event_type: str, performed_by: Optional[str], details: str, ip_address: Optional[str] = None, user_agent: Optional[str] = None):
    """
    Log an admin activity to the admin_activity_log table.
    """
    try:
        log_data = {
            'id': str(uuid.uuid4()),
            'event_type': event_type,
            'performed_by': performed_by,
            'details': details,
            'created_at': datetime.utcnow(),
            'ip_address': ip_address,
            'user_agent': user_agent
        }
        DatabaseInterface.insert('admin_activity_log', log_data)
    except Exception as e:
        # Logging should not break main flow
        import logging
        logging.getLogger(__name__).error(f"Failed to log admin activity: {e}")
