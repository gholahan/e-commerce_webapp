from fastapi import APIRouter, Request, HTTPException
import hmac
import hashlib
from core.config import PAYSTACK_SECRET

router = APIRouter()


@router.post("/paystack/webhook")
async def paystack_webhook(request: Request):
    body = await request.body()

    paystack_signature = request.headers.get("x-paystack-signature")
    if not paystack_signature:
        raise HTTPException(
            status_code=400,
            detail="Missing Paystack signature"
        )


    secret = PAYSTACK_SECRET
    if not secret:
        raise HTTPException(
            status_code=500,
            detail="Server configuration error"
        )

    computed_hash = hmac.new(
        secret.encode(),
        body,
        hashlib.sha512
    ).hexdigest()

    if computed_hash != paystack_signature:
        raise HTTPException(
            status_code=403,
            detail="Invalid webhook signature"
        )

    event = await request.json()

    if event.get("event") == "charge.success":
        reference = event["data"]["reference"]

        metadata = event["data"].get("metadata", {})
        order_id = metadata.get("order_id")

        print("PAYMENT SUCCESS")
        print("Reference:", reference)
        print("Order ID:", order_id)
        print("metdata:", metadata)

        # Later:
        # update order in PostgreSQL
        # send payment success email

    return {"status": "success"}
