from pydantic import BaseModel, EmailStr
from typing import List


class CustomerSchema(BaseModel):
    fullName: str
    email: EmailStr
    phone: str


class AddressSchema(BaseModel):
    street: str
    town: str


class CheckoutItemSchema(BaseModel):
    product_id: int
    quantity: int


class CheckoutRequestModel(BaseModel):
    customer: CustomerSchema
    address: AddressSchema
    items: List[CheckoutItemSchema]
    paymentMethod: str
