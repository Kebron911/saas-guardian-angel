from typing import List, Dict, Any, Optional, Union
from datetime import datetime
from postgreSQL.database import DatabaseInterface
from postgreSQL.admin.activity_log import log_admin_activity
from fastapi import APIRouter, HTTPException, Body, Depends, Request
from pydantic import BaseModel
import logging

logger = logging.getLogger(__name__)
router = APIRouter()

def create_blog_post(title: str, slug: str, content: str, excerpt: str, featured_image: str,
                     author_id: Optional[str], published: bool, category_id: Optional[str]) -> Optional[str]:
    try:
        post_data = {
            "title": title,
            "slug": slug,
            "content": content,
            "excerpt": excerpt,
            "featured_image": featured_image,
            "author_id": author_id,  # This can now be None/null
            "published": published,
            "published_at": datetime.now() if published else None
        }
        post_id = DatabaseInterface.insert("blog_posts", post_data)
        if post_id and category_id:
            DatabaseInterface.insert("blog_post_categories", {
                "post_id": post_id,
                "category_id": category_id
            })
        return post_id
    except Exception as e:
        logger.error(f"Error creating blog post: {e}")
        return None

def get_published_posts() -> List[Dict[str, Any]]:
    try:
        logger.debug("Fetching published posts from PostgreSQL")
        query = """
            SELECT 
                p.id, 
                p.title, 
                p.slug,
                p.content,
                p.excerpt,
                p.featured_image,
                ARRAY_AGG(DISTINCT c.id) FILTER (WHERE c.id IS NOT NULL) AS category_ids,
                ARRAY_AGG(DISTINCT c.name) FILTER (WHERE c.id IS NOT NULL) AS category_names,
                p.published_at,
                p.created_at,
                p.updated_at,
                COALESCE(v.view_count, 0) AS views,
                COALESCE(cm.comment_count, 0) AS comments
            FROM blog_posts p
            LEFT JOIN blog_post_categories pc ON p.id = pc.post_id
            LEFT JOIN blog_categories c ON pc.category_id = c.id
            LEFT JOIN (
                SELECT post_id, COUNT(*) as view_count 
                FROM blog_views 
                GROUP BY post_id
            ) v ON p.id = v.post_id
            LEFT JOIN (
                SELECT post_id, COUNT(*) as comment_count 
                FROM blog_comments 
                GROUP BY post_id
            ) cm ON p.id = cm.post_id
            WHERE p.published = TRUE
            GROUP BY p.id, p.title, p.slug, p.content, p.excerpt, p.featured_image, p.published_at, p.created_at, p.updated_at, v.view_count, cm.comment_count
            ORDER BY p.published_at DESC NULLS LAST, p.created_at DESC;
        """
        result = DatabaseInterface.execute_query(query)
        logger.debug(f"Published posts result: {len(result)} posts found")
        return result
    except Exception as e:
        logger.error(f"Error fetching published posts: {e}")
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")

def get_draft_posts() -> List[Dict[str, Any]]:
    try:
        logger.debug("Fetching draft posts from PostgreSQL")
        query = """
            SELECT 
                p.id, 
                p.title, 
                p.slug,
                ARRAY_AGG(DISTINCT c.id) FILTER (WHERE c.id IS NOT NULL) AS category_ids,
                ARRAY_AGG(DISTINCT c.name) FILTER (WHERE c.id IS NOT NULL) AS category_names,
                p.created_at AS date,
                COALESCE(v.view_count, 0) AS views,
                COALESCE(cm.comment_count, 0) AS comments
            FROM blog_posts p
            LEFT JOIN blog_post_categories pc ON p.id = pc.post_id
            LEFT JOIN blog_categories c ON pc.category_id = c.id
            LEFT JOIN (
                SELECT post_id, COUNT(*) as view_count 
                FROM blog_views 
                GROUP BY post_id
            ) v ON p.id = v.post_id
            LEFT JOIN (
                SELECT post_id, COUNT(*) as comment_count 
                FROM blog_comments 
                GROUP BY post_id
            ) cm ON p.id = cm.post_id
            WHERE p.published = FALSE
            GROUP BY p.id, p.title, p.slug, p.created_at, v.view_count, cm.comment_count
            ORDER BY p.created_at DESC;
        """
        result = DatabaseInterface.execute_query(query)
        logger.debug(f"Draft posts result: {len(result)} posts found")
        return result
    except Exception as e:
        logger.error(f"Error fetching draft posts: {e}")
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")

def get_post_details(post_id: str) -> Optional[Dict[str, Any]]:
    try:
        # Fetch all post fields and aggregate categories
        query = """
            SELECT 
                p.id,
                p.title,
                p.slug,
                p.content,
                p.excerpt,
                p.featured_image,
                p.author_id,
                p.published,
                p.created_at,
                p.updated_at,
                p.published_at,
                ARRAY_AGG(c.id) FILTER (WHERE c.id IS NOT NULL) AS category_ids,
                ARRAY_AGG(c.name) FILTER (WHERE c.id IS NOT NULL) AS category_names,
                COALESCE(v.view_count, 0) AS views,
                COALESCE(cm.comment_count, 0) AS comments
            FROM blog_posts p
            LEFT JOIN blog_post_categories pc ON p.id = pc.post_id
            LEFT JOIN blog_categories c ON pc.category_id = c.id
            LEFT JOIN (
                SELECT post_id, COUNT(*) as view_count 
                FROM blog_views 
                GROUP BY post_id
            ) v ON p.id = v.post_id
            LEFT JOIN (
                SELECT post_id, COUNT(*) as comment_count 
                FROM blog_comments 
                GROUP BY post_id
            ) cm ON p.id = cm.post_id
            WHERE p.id = %s
            GROUP BY p.id, p.title, p.slug, p.content, p.excerpt, p.featured_image, p.author_id, p.published, p.created_at, p.updated_at, p.published_at, v.view_count, cm.comment_count
        """
        results = DatabaseInterface.execute_query(query, (post_id,))
        return results[0] if results else None
    except Exception as e:
        logger.error(f"Error fetching post details: {e}")
        return None

def delete_blog_post(post_id: str) -> bool:
    try:
        # First delete relationships
        DatabaseInterface.execute_query("DELETE FROM blog_post_categories WHERE post_id = %s", (post_id,))
        DatabaseInterface.execute_query("DELETE FROM blog_views WHERE post_id = %s", (post_id,))
        DatabaseInterface.execute_query("DELETE FROM blog_comments WHERE post_id = %s", (post_id,))
        # Then delete the post
        DatabaseInterface.execute_query("DELETE FROM blog_posts WHERE id = %s", (post_id,))
        return True
    except Exception as e:
        logger.error(f"Error deleting post: {e}")
        return False

class BlogPostCreate(BaseModel):
    title: str
    slug: str
    content: str
    excerpt: str
    featured_image: str
    author_id: Union[str, None] = None
    published: bool
    category_ids: Optional[List[str]] = None  # Accept multiple categories

class BlogPostUpdateInput(BaseModel):
    title: Optional[str]
    slug: Optional[str]
    content: Optional[str]
    excerpt: Optional[str]
    featured_image: Optional[str]
    published: Optional[bool]
    published_at: Optional[datetime]
    category_ids: Optional[List[str]]

def update_blog_post(post_id: str, post_data: Dict[str, Any], category_ids: List[str]) -> bool:
    try:
        # Update the post
        update_fields = post_data.copy()
        if not update_fields:
            raise ValueError("No fields to update")
        DatabaseInterface.update("blog_posts", update_fields, {"id": post_id})

        # Remove existing category relationships
        DatabaseInterface.delete("blog_post_categories", {"post_id": post_id})

        # Add new category relationships (no RETURNING id)
        for category_id in category_ids:
            query = "INSERT INTO blog_post_categories (post_id, category_id) VALUES (%s, %s)"
            DatabaseInterface.execute_query(query, (post_id, category_id))
        return True
    except Exception as e:
        logger.error(f"Error updating blog post: {e}")
        return False

@router.post("/posts")
def api_create_blog_post(post: BlogPostCreate, request: Request):
    try:
        post_id = create_blog_post(
            post.title, post.slug, post.content, post.excerpt, post.featured_image,
            post.author_id, post.published, None  # Don't use single category_id
        )
        if not post_id:
            raise HTTPException(status_code=400, detail="Failed to create post")
        # Save all category relationships if provided
        if post.category_ids:
            for category_id in post.category_ids:
                query = "INSERT INTO blog_post_categories (post_id, category_id) VALUES (%s, %s)"
                DatabaseInterface.execute_query(query, (post_id, category_id))
        # Log admin activity
        admin_id = getattr(getattr(request.state, "user", None), "id", None)
        ip_address = request.client.host if request.client else None
        user_agent = request.headers.get("user-agent")
        log_admin_activity(
            event_type='create_blog_post',
            performed_by=admin_id,
            details=f"Created blog post: {post.title}",
            ip_address=ip_address,
            user_agent=user_agent
        )
        return {"post_id": post_id}
    except Exception as e:
        logger.error(f"API error creating post: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/posts/published")
def api_get_published_posts():
    logger.info("API endpoint /posts/published called")
    return get_published_posts()

@router.get("/posts/drafts")
def api_get_draft_posts():
    logger.info("API endpoint /posts/drafts called")
    return get_draft_posts()

@router.get("/posts/{post_id}")
def api_get_post_details(post_id: str):
    try:
        post = get_post_details(post_id)
        if not post:
            raise HTTPException(status_code=404, detail="Post not found")
        return post
    except Exception as e:
        logger.error(f"API error fetching post: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@router.delete("/posts/{post_id}")
def api_delete_blog_post(post_id: str, request: Request):
    try:
        success = delete_blog_post(post_id)
        if not success:
            raise HTTPException(status_code=400, detail="Failed to delete post")
        # Log admin activity
        admin_id = getattr(getattr(request.state, "user", None), "id", None)
        ip_address = request.client.host if request.client else None
        user_agent = request.headers.get("user-agent")
        log_admin_activity(
            event_type='delete_blog_post',
            performed_by=admin_id,
            details=f"Deleted blog post: {post_id}",
            ip_address=ip_address,
            user_agent=user_agent
        )
        return {"message": "Post deleted successfully"}
    except Exception as e:
        logger.error(f"API error deleting post: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@router.put("/posts/{post_id}")
def api_update_blog_post(post_id: str, request: Request, data: BlogPostUpdateInput = Body(...)):
    try:
        post_data = data.dict(exclude_unset=True)
        category_ids = post_data.pop("category_ids", [])
        success = update_blog_post(post_id, post_data, category_ids)
        if not success:
            raise HTTPException(status_code=400, detail="Failed to update post")
        # Extract admin user ID, IP, and user agent
        admin_id = getattr(getattr(request.state, "user", None), "id", None)
        ip_address = request.client.host if request.client else None
        user_agent = request.headers.get("user-agent")
        log_admin_activity(
            event_type='update_blog_post',
            performed_by=admin_id,
            details=f"Updated blog post: {post_id}",
            ip_address=ip_address,
            user_agent=user_agent
        )
        return {"message": "Post updated successfully"}
    except Exception as e:
        logger.error(f"API error updating post: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/posts/slug/{slug}")
def api_get_post_by_slug(slug: str):
    try:
        query = """
            SELECT 
                p.id,
                p.title,
                p.slug,
                p.content,
                p.excerpt,
                p.featured_image,
                p.author_id,
                p.published,
                p.created_at,
                p.updated_at,
                p.published_at,
                ARRAY_AGG(c.id) FILTER (WHERE c.id IS NOT NULL) AS category_ids,
                ARRAY_AGG(c.name) FILTER (WHERE c.id IS NOT NULL) AS category_names,
                COALESCE(v.view_count, 0) AS views,
                COALESCE(cm.comment_count, 0) AS comments
            FROM blog_posts p
            LEFT JOIN blog_post_categories pc ON p.id = pc.post_id
            LEFT JOIN blog_categories c ON pc.category_id = c.id
            LEFT JOIN (
                SELECT post_id, COUNT(*) as view_count 
                FROM blog_views 
                GROUP BY post_id
            ) v ON p.id = v.post_id
            LEFT JOIN (
                SELECT post_id, COUNT(*) as comment_count 
                FROM blog_comments 
                GROUP BY post_id
            ) cm ON p.id = cm.post_id
            WHERE p.slug = %s AND p.published = TRUE
            GROUP BY p.id, p.title, p.slug, p.content, p.excerpt, p.featured_image, p.author_id, p.published, p.created_at, p.updated_at, p.published_at, v.view_count, cm.comment_count
        """
        results = DatabaseInterface.execute_query(query, (slug,))
        if not results:
            raise HTTPException(status_code=404, detail="Post not found")
        return results[0]
    except Exception as e:
        logger.error(f"API error fetching post by slug: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/posts/{post_id}/increment-views")
def api_increment_post_views(post_id: str):
    try:
        query = """
            INSERT INTO blog_views (post_id, viewed_at)
            VALUES (%s, NOW())
        """
        DatabaseInterface.execute_query(query, (post_id,))
        return {"success": True}
    except Exception as e:
        logger.error(f"API error incrementing post views: {e}")
        raise HTTPException(status_code=500, detail=str(e))

class BlogCommentCreate(BaseModel):
    content: str
    user_id: Optional[str] = None

@router.post("/posts/{post_id}/comments")
def api_create_comment(post_id: str, comment: BlogCommentCreate):
    try:
        query = """
            INSERT INTO blog_comments (post_id, user_id, content)
            VALUES (%s, %s, %s)
            RETURNING id, post_id, user_id, content, created_at
        """
        result = DatabaseInterface.execute_query(query, (post_id, comment.user_id, comment.content))
        if not result:
            raise HTTPException(status_code=400, detail="Failed to add comment")
        # Log admin activity
        log_admin_activity(
            event_type='create_blog_comment',
            performed_by=comment.user_id,
            details=f"Added comment to post: {post_id}",
        )
        return result[0]
    except Exception as e:
        logger.error(f"API error creating comment: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/posts/{post_id}/comments")
def api_get_comments(post_id: str):
    try:
        query = """
            SELECT id, post_id, user_id, content, created_at
            FROM blog_comments
            WHERE post_id = %s
            ORDER BY created_at ASC
        """
        result = DatabaseInterface.execute_query(query, (post_id,))
        return result
    except Exception as e:
        logger.error(f"API error fetching comments: {e}")
        raise HTTPException(status_code=500, detail=str(e))
