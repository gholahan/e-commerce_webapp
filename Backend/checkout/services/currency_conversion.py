import httpx
from core.config import EXCHANGE_API_KEY



async def convert_currency(total: int) :

    async with httpx.AsyncClient() as client:
       exchange_url = f"https://v6.exchangerate-api.com/v6/{EXCHANGE_API_KEY}/pair/USD/NGN/{total}"

       response = await client.get(exchange_url)

       if response.status_code != 200:
            raise Exception("Failed to fetch exchange rates")

       data = response.json()
       return data["conversion_result"]
  
       
       