
from typing import List, Dict, Any, Optional, Union
from datetime import datetime
from postgreSQL.database import DatabaseInterface
from fastapi import APIRouter, HTTPException, Body
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
                COALESCE(c.name, 'Uncategorized') AS category, 
                p.published_at AS date,
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
            ORDER BY p.published_at DESC;
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
                COALESCE(c.name, 'Uncategorized') AS category, 
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
        query = """
            SELECT p.*, COALESCE(c.name, 'Uncategorized') AS category
            FROM blog_posts p
            LEFT JOIN blog_post_categories pc ON p.id = pc.post_id
            LEFT JOIN blog_categories c ON pc.category_id = c.id
            WHERE p.id = %s;
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
    author_id: Union[str, None] = None  # Use Union to explicitly allow None
    published: bool
    category_id: Union[str, None] = None  # Use Union to explicitly allow None

@router.post("/posts")
def api_create_blog_post(post: BlogPostCreate):
    try:
        post_id = create_blog_post(
            post.title, post.slug, post.content, post.excerpt, post.featured_image,
            post.author_id, post.published, post.category_id
        )
        if not post_id:
            raise HTTPException(status_code=400, detail="Failed to create post")
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
def api_delete_blog_post(post_id: str):
    try:
        success = delete_blog_post(post_id)
        if not success:
            raise HTTPException(status_code=400, detail="Failed to delete post")
        return {"message": "Post deleted successfully"}
    except Exception as e:
        logger.error(f"API error deleting post: {e}")
        raise HTTPException(status_code=500, detail=str(e))
