import os
import psycopg2
from psycopg2 import pool
from typing import Any, List, Dict, Optional

class DatabaseInterface:
    _connection_pool = None

    @classmethod
    def initialize_pool(cls):
        if cls._connection_pool is None:
            cls._connection_pool = pool.SimpleConnectionPool(
                minconn=1,
                maxconn=10,
                host=os.getenv('DB_HOST'),
                port=int(os.getenv('DB_PORT', '5432')),
                user=os.getenv('DB_USER'),
                password=os.getenv('DB_PASSWORD'),
                database=os.getenv('DB_NAME')
            )
    
    @classmethod
    def get_connection(cls):
        if cls._connection_pool is None:
            cls.initialize_pool()
        return cls._connection_pool.getconn()

    @classmethod
    def return_connection(cls, conn):
        cls._connection_pool.putconn(conn)

    @classmethod
    def execute_query(cls, query: str, params: tuple = None) -> List[Dict[str, Any]]:
        conn = cls.get_connection()
        try:
            with conn.cursor() as cursor:
                cursor.execute(query, params)
                if cursor.description:
                    columns = [desc[0] for desc in cursor.description]
                    results = cursor.fetchall()
                    return [dict(zip(columns, row)) for row in results]
                return []
        finally:
            conn.commit()
            cls.return_connection(conn)

    @classmethod
    def insert(cls, table: str, data: Dict[str, Any]) -> int:
        columns = ', '.join(data.keys())
        values = ', '.join(['%s'] * len(data))
        query = f"INSERT INTO {table} ({columns}) VALUES ({values}) RETURNING id"
        result = cls.execute_query(query, tuple(data.values()))
        return result[0]['id'] if result else None

    @classmethod
    def select(cls, table: str, conditions: Dict[str, Any] = None) -> List[Dict[str, Any]]:
        query = f"SELECT * FROM {table}"
        if conditions:
            where_clause = ' AND '.join([f"{k} = %s" for k in conditions.keys()])
            query += f" WHERE {where_clause}"
            return cls.execute_query(query, tuple(conditions.values()))
        return cls.execute_query(query)

    @classmethod
    def update(cls, table: str, data: Dict[str, Any], conditions: Dict[str, Any]) -> bool:
        set_clause = ', '.join([f"{k} = %s" for k in data.keys()])
        where_clause = ' AND '.join([f"{k} = %s" for k in conditions.keys()])
        query = f"UPDATE {table} SET {set_clause} WHERE {where_clause}"
        params = tuple(list(data.values()) + list(conditions.values()))
        cls.execute_query(query, params)
        return True

    @classmethod
    def delete(cls, table: str, conditions: Dict[str, Any]) -> bool:
        where_clause = ' AND '.join([f"{k} = %s" for k in conditions.keys()])
        query = f"DELETE FROM {table} WHERE {where_clause}"
        cls.execute_query(query, tuple(conditions.values()))
        return True
