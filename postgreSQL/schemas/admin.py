from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class AdminActivity(BaseModel):
    id: str
    event_type: str
    performed_by_email: str
    details: str
    timestamp: datetime
    ip_address: str
    user_agent: Optional[str] = None
