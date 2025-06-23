
from typing import List, Dict, Any, Optional, Tuple
import psycopg2
from psycopg2.extras import RealDictCursor
from psycopg2 import pool
import logging
from .config import DB_CONFIG

logger = logging.getLogger(__name__)

class DatabaseInterface:
    _pool = None

    @classmethod
    def get_pool(cls):
        if cls._pool is None:
            try:
                cls._pool = pool.SimpleConnectionPool(
                    minconn=1,
                    maxconn=10,
                    **DB_CONFIG
                )
                logger.info("Database connection pool created successfully")
            except Exception as e:
                logger.error(f"Failed to create database pool: {e}")
                raise
        return cls._pool

    @staticmethod
    def execute_query(query: str, params: Optional[Tuple] = None) -> List[Dict[str, Any]]:
        pool_instance = DatabaseInterface.get_pool()
        conn = None
        try:
            conn = pool_instance.getconn()
            with conn.cursor(cursor_factory=RealDictCursor) as cur:
                logger.debug(f"Executing query: {query[:100]}...")
                cur.execute(query, params)
                
                # Check if query returns data
                if cur.description:
                    result = cur.fetchall()
                    result_list = [dict(row) for row in result]
                else:
                    result_list = []
                
                conn.commit()
                logger.debug(f"Query executed successfully, returned {len(result_list)} rows")
                return result_list

        except Exception as e:
            logger.error(f"Database error: {str(e)}")
            if conn:
                conn.rollback()
            raise
            
        finally:
            if conn:
                pool_instance.putconn(conn)

    @classmethod
    def insert(cls, table: str, data: Dict[str, Any]) -> Optional[str]:
        try:
            keys = data.keys()
            values = tuple(data.values())
            placeholders = ', '.join(['%s'] * len(keys))
            columns = ', '.join(keys)
            query = f"INSERT INTO {table} ({columns}) VALUES ({placeholders}) RETURNING id"
            result = cls.execute_query(query, values)
            if result:
                return str(result[0].get('id'))
            return None
        except Exception as e:
            logger.error(f"Insert error: {e}")
            raise

    @classmethod
    def update(cls, table: str, data: Dict[str, Any], conditions: Dict[str, Any]) -> bool:
        try:
            set_clause = ', '.join([f"{k} = %s" for k in data.keys()])
            where_clause = ' AND '.join([f"{k} = %s" for k in conditions.keys()])
            params = tuple(data.values()) + tuple(conditions.values())
            query = f"UPDATE {table} SET {set_clause} WHERE {where_clause}"
            cls.execute_query(query, params)
            return True
        except Exception as e:
            logger.error(f"Update error: {e}")
            raise

    @classmethod
    def delete(cls, table: str, conditions: Dict[str, Any]) -> None:
        try:
            where_clause = ' AND '.join([f"{k} = %s" for k in conditions.keys()])
            params = tuple(conditions.values())
            query = f"DELETE FROM {table} WHERE {where_clause}"
            cls.execute_query(query, params)
        except Exception as e:
            logger.error(f"Delete error: {e}")
            raise
