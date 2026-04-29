from fastapi import APIRouter
from checkout.models.checkout import CheckoutRequestModel
from checkout.services.checkout_service import process_checkout

router = APIRouter()


@router.post("/initialize-payment")
async def initialize_payment_route(data: CheckoutRequestModel):
    return await process_checkout(data)
