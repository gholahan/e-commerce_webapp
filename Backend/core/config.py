from dotenv import load_dotenv
import os


load_dotenv()

PAYSTACK_SECRET = os.getenv("PAYSTACK_SECRET_KEY")
RESEND_API_KEY = os.getenv("RESEND_API_KEY")
EXCHANGE_API_KEY = os.getenv("EXCHANGE_API_KEY")
ORIGINS = os.getenv("CORS_ORIGINS", "").split(",")
