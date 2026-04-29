from typing import Any
import httpx
from core.config import PAYSTACK_SECRET

BASE_URL = "https://api.paystack.co"


async def initialize_transaction(email: str, amount_kobo: int, customer_name: str, internal_order_id: Any):
    headers = {
        "Authorization": f"Bearer {PAYSTACK_SECRET}",
        "Content-Type": "application/json"
    }

    payload:Any = {
    "email": email,
    "amount": amount_kobo,
    "metadata": {
        "customer_name": customer_name,
        "source": "intern-ecommerce",
        "order_id": internal_order_id
    }
}


    async with httpx.AsyncClient() as client:
        res = await client.post(
            f"{BASE_URL}/transaction/initialize",
            json=payload,
            headers=headers
        )

        if res.status_code != 200:
            raise Exception(
                f"Paystack Error: {res.text}"
            )

    return res.json()
