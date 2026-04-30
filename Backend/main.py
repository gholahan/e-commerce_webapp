from fastapi import FastAPI
from checkout.routes.billing import router as billing_router
from checkout.routes.webhook import router as webhook_router
from fastapi.middleware.cors import CORSMiddleware
from core.config import ORIGINS


app = FastAPI()
app.include_router(billing_router)
app.include_router(webhook_router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def health_check():
    return {
        "status": "ok"
    }