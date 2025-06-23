from typing import List, Dict, Any
from database import DatabaseInterface
from fastapi import APIRouter

router = APIRouter()

def get_categories_with_post_counts() -> List[Dict[str, Any]]:
    query = """
        SELECT 
            c.id, c.name, c.slug, COUNT(pc.post_id) AS posts
        FROM blog_categories c
        LEFT JOIN blog_post_categories pc ON c.id = pc.category_id
        GROUP BY c.id, c.name, c.slug
        ORDER BY c.name;
    """
    return DatabaseInterface.execute_query(query)

@router.get("/blog/categories")
def api_get_categories_with_post_counts():
    return get_categories_with_post_counts()
