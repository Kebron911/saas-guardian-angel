import os
from dotenv import load_dotenv

load_dotenv(dotenv_path=".env")

host = os.getenv("POSTGRES_HOST")
user = os.getenv("POSTGRES_USER")
password = os.getenv("POSTGRES_PASSWORD")
dbname = os.getenv("POSTGRES_DB")
port = os.getenv("POSTGRES_PORT")


print("DB connection details:", host, user, password, dbname, port)

DB_CONFIG = {
    "host": host or "postgres-db",
    "port": int(port or 5432),
    "user": user,
    "password": password,
    "dbname": dbname,
}