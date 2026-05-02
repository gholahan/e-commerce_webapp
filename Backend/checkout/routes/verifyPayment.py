from fastapi import APIRouter, HTTPException
import httpx
import os

router = APIRouter()

PAYSTACK_SECRET = os.getenv("PAYSTACK_SECRET_KEY")

@router.get("/verify-payment")
async def verify_payment(reference: str):
    url = f"https://api.paystack.co/transaction/verify/{reference}"

    headers = {
        "Authorization": f"Bearer {PAYSTACK_SECRET}"
    }

    async with httpx.AsyncClient() as client:
        response = await client.get(url, headers=headers)

    if response.status_code != 200:
        raise HTTPException(status_code=400, detail="Verification failed")

    data = response.json()

    status = data["data"]["status"]

    return {
    "status": status,
    "amount": data["data"]["amount"],
    "email": data["data"]["customer"]["email"]
    }
