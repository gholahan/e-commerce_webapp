from sqlmodel import SQLModel, Field
from datetime import datetime


class Order(SQLModel, table=True):
    __tablename__ = "orders"  #type: ignore

    id: str = Field(primary_key=True, index=True)
    customer_name: str = Field()
    customer_email: str = Field()
    customer_phone: str = Field()

    subtotal: float = Field()
    shipping: float = Field()
    total: float = Field()

    payment_status: str = Field(default="pending")
    payment_reference: str | None = Field(default=None, nullable=True)

    created_at: datetime = Field(default_factory= lambda: datetime.now())
