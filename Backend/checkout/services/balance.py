from fastapi import  HTTPException
from checkout.models.checkout import CheckoutRequestModel
import httpx
from typing import Dict, Any


def calculate_discounted_price(price: float, discount: float):
    return price - (price * discount / 100)


async def initialize_payment(data: CheckoutRequestModel) -> Dict[str, Any]:
    subtotal = 0
       
    async with httpx.AsyncClient() as client:
        for item in data.items:
            product_url = f"https://dummyjson.com/products/{item.product_id}"

            response = await client.get(product_url)

            if response.status_code != 200:
                raise HTTPException(
                    status_code=404,
                    detail=f"Product {item.product_id} not found"
                )

            product = response.json()

            price = product["price"]
            discount = product.get("discountPercentage", 0)
            stock = product.get("stock", 0)

            if stock < item.quantity:
                raise HTTPException(
                    status_code=400,
                    detail=f"Insufficient stock for product {item.product_id}"
                )

            discounted_price = calculate_discounted_price(
                price,
                discount
            )

            item_total = discounted_price * item.quantity
            subtotal += item_total

    shipping = 0
    total = subtotal + shipping

    return {
        "subtotal" : round(subtotal, 2),
        "shipping": shipping,
        "total": round(total, 2),
        "status": "pending"
        }
