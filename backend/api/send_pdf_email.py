from fastapi import APIRouter, UploadFile, Form, File, HTTPException
from fastapi.responses import JSONResponse
from fastapi_mail import FastMail, MessageSchema, ConnectionConfig
from starlette.background import BackgroundTasks
import os

router = APIRouter()

# Configure your email settings
conf = ConnectionConfig(
    MAIL_USERNAME = os.getenv("MAIL_USERNAME"),
    MAIL_PASSWORD = os.getenv("MAIL_PASSWORD"),
    MAIL_FROM = os.getenv("MAIL_FROM"),
    MAIL_PORT = 587,
    MAIL_SERVER = "smtp.gmail.com",  # Change to your SMTP server
    MAIL_TLS = True,
    MAIL_SSL = False,
    USE_CREDENTIALS = True
)

@router.post("/api/send-pdf-email")
async def send_pdf_email(
    background_tasks: BackgroundTasks,
    email: str = Form(...),
    pdf: UploadFile = File(...)
):
    try:
        pdf_bytes = await pdf.read()
        message = MessageSchema(
            subject="Your Calculator Results",
            recipients=[email],
            body="Attached is your calculator results PDF.",
            attachments=[{
                "file": pdf_bytes,
                "filename": pdf.filename,
                "mime_type": "application/pdf"
            }],
            subtype="plain"
        )
        fm = FastMail(conf)
        background_tasks.add_task(fm.send_message, message)
        return JSONResponse({"message": "Email sent successfully"})
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))