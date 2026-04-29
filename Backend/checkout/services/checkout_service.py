from typing import Any, Dict
from checkout.services.currency_conversion import convert_currency
from checkout.models.checkout import CheckoutRequestModel
from checkout.services.balance import initialize_payment
from checkout.services.paystack_service import initialize_transaction
from checkout.services.resend_service import send_order_received_email
from fastapi import HTTPException
import uuid

async def process_checkout(data: CheckoutRequestModel) -> Dict[str, Any]:

    internal_order_id = f"ORD-{uuid.uuid4().hex[:8].upper()}"

    # 1. Calculate totals
    payment_data = await initialize_payment(data)
    total = payment_data["total"]

    # 2. Convert currency
    total_in_naira = await convert_currency(total)

    # 3. Kobo conversion
    amount_kobo = int(total_in_naira * 100)

    # 4. Paystack
    paystack_response = await initialize_transaction(
        email=data.customer.email,
        amount_kobo=amount_kobo,
        customer_name=data.customer.fullName,
        internal_order_id=internal_order_id
    )

    if not paystack_response.get("status"):
        raise HTTPException(
            status_code=400,
            detail="Failed to initialize payment"
        )

    # 5. Email
    send_order_received_email(
        customer_email="abdulazeezibraheem68@gmail.com",
        customer_name=data.customer.fullName
    )

    return {
        "checkout_url": paystack_response["data"]["authorization_url"],
        "reference": paystack_response["data"]["reference"],
        "order_id": internal_order_id,
        "subtotal": payment_data["subtotal"],
        "total": payment_data["total"],
        "payment_status": "pending",
        "amount_paid_ngn": total_in_naira
    }
