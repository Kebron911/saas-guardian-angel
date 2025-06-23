from datetime import datetime, timedelta
from typing import Tuple

def get_month_range(offset: int = 0) -> Tuple[datetime, datetime]:
    today = datetime.today().replace(day=1)
    # Calculate start of the month offset by `offset` months
    # Using month arithmetic rather than days for accuracy
    year = today.year
    month = today.month - offset
    while month <= 0:
        month += 12
        year -= 1
    start = datetime(year, month, 1)

    # Calculate the start of next month
    if month == 12:
        end = datetime(year + 1, 1, 1)
    else:
        end = datetime(year, month + 1, 1)

    return start, end
