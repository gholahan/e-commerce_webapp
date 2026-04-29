from fastapi import FastAPI
from checkout.routes.billing import router as billing_router
from checkout.routes.webhook import router as webhook_router


app = FastAPI()
app.include_router(billing_router)
app.include_router(webhook_router)


@app.get("/")
async def health_check():
    return{
        "status":"ok"
    }