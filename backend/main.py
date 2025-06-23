from fastapi import FastAPI
from backend.api.send_pdf_email import router as send_pdf_email_router

app = FastAPI()

# Register the /api/send-pdf-email endpoint
app.include_router(send_pdf_email_router)