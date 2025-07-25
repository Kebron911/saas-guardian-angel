from typing import List, Dict, Any
from postgreSQL.database import DatabaseInterface
from fastapi import APIRouter, HTTPException, Body, Request
from postgreSQL.admin.activity_log import log_admin_activity

router = APIRouter()

def get_categories_with_post_counts() -> List[Dict[str, Any]]:
    query = """
        SELECT 
            c.id, c.name, c.slug, COUNT(p.id) AS posts
        FROM blog_categories c
        LEFT JOIN blog_post_categories pc ON c.id = pc.category_id
        LEFT JOIN blog_posts p ON pc.post_id = p.id AND p.published = TRUE
        GROUP BY c.id, c.name, c.slug
        ORDER BY c.name;
    """
    return DatabaseInterface.execute_query(query)

def update_category(category_id: str, name: str, slug: str) -> bool:
    query = """
        UPDATE blog_categories
        SET name = %s, slug = %s
        WHERE id = %s
    """
    try:
        DatabaseInterface.execute_query(query, (name, slug, category_id))
        return True
    except Exception as e:
        print(f"Error updating category: {e}")
        return False

def delete_category(category_id: str) -> bool:
    query = "DELETE FROM blog_categories WHERE id = %s"
    try:
        DatabaseInterface.execute_query(query, (category_id,))
        return True
    except Exception as e:
        print(f"Error deleting category: {e}")
        return False

def create_category(name: str, slug: str) -> Dict[str, Any]:
    query = """
        INSERT INTO blog_categories (name, slug)
        VALUES (%s, %s)
        RETURNING id, name, slug, created_at
    """
    try:
        result = DatabaseInterface.execute_query(query, (name, slug))
        return result[0] if result else None
    except Exception as e:
        print(f"Error creating category: {e}")
        return None

@router.get("/categories")
def api_get_categories_with_post_counts():
    return get_categories_with_post_counts()

@router.put("/categories/{category_id}")
def api_update_category(category_id: str, request: Request, data: dict = Body(...)):
    try:
        name = data.get("name")
        slug = data.get("slug")
        success = update_category(category_id, name, slug)
        if not success:
            raise HTTPException(status_code=400, detail="Failed to update category")
        # Log admin activity
        admin_id = getattr(getattr(request.state, "user", None), "id", None)
        ip_address = request.client.host if request.client else None
        user_agent = request.headers.get("user-agent")
        log_admin_activity(
            event_type='update_blog_category',
            performed_by=admin_id,
            details=f"Updated blog category: {category_id}",
            ip_address=ip_address,
            user_agent=user_agent
        )
        return {"message": "Category updated successfully"}
    except Exception as e:
        print(f"API error updating category: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@router.delete("/categories/{category_id}")
def api_delete_category(category_id: str, request: Request):
    try:
        success = delete_category(category_id)
        if not success:
            raise HTTPException(status_code=400, detail="Failed to delete category")
        # Log admin activity
        admin_id = getattr(getattr(request.state, "user", None), "id", None)
        ip_address = request.client.host if request.client else None
        user_agent = request.headers.get("user-agent")
        log_admin_activity(
            event_type='delete_blog_category',
            performed_by=admin_id,
            details=f"Deleted blog category: {category_id}",
            ip_address=ip_address,
            user_agent=user_agent
        )
        return {"message": "Category deleted successfully"}
    except Exception as e:
        print(f"API error deleting category: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/categories")
def api_create_category(request: Request, data: dict = Body(...)):
    try:
        name = data.get("name")
        slug = data.get("slug")
        result = create_category(name, slug)
        # Log admin activity
        admin_id = getattr(getattr(request.state, "user", None), "id", None)
        ip_address = request.client.host if request.client else None
        user_agent = request.headers.get("user-agent")
        log_admin_activity(
            event_type='create_blog_category',
            performed_by=admin_id,
            details=f"Created blog category: {name}",
            ip_address=ip_address,
            user_agent=user_agent
        )
        return result
    except Exception as e:
        print(f"API error creating category: {e}")
        raise HTTPException(status_code=500, detail=str(e))
