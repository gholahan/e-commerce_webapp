import resend
from core.config import RESEND_API_KEY 

resend.api_key = RESEND_API_KEY


def send_order_received_email(customer_email : str, customer_name : str):
    resend.Emails.send({
        "from": "Store <onboarding@resend.dev>",
        "to": customer_email,
        "subject": "Order Received",
        "html": f"""
            <h2>Hello {customer_name}</h2>
            <p>We received your order successfully.</p>
            <p>We are preparing your payment checkout.</p>
        """
    })
