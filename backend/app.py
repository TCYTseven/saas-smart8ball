import openai
import uvicorn
from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from pydantic import BaseSettings
from fastapi.middleware.cors import CORSMiddleware

import warnings
warnings.filterwarnings("ignore")

class Settings(BaseSettings):
    OPENAI_API_KEY: str

    class Config:
        env_file = '.env.local'

settings = Settings()

try:
    openai.api_key = settings.OPENAI_API_KEY
    if openai.api_key:
        print("Success loading API key")
except Exception as e:
    print("Failed to load API key:", str(e))

app = FastAPI()

origins = [
    "http://localhost:5001",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"status": "ok"}

@app.post("/test/{prompt}/{personality}")
async def answer(request: Request, prompt: str, personality: str):
    # Define personalized instructions
    instructions = {
        "rocky_balboa": "You are Rocky Balboa, the legendary boxer. Your advice should be motivational, tough, and full of fighting spirit. Always make a decisive choice and never take both sides.",
        "cupid": "You are Cupid, the god of love. Your advice should be romantic, caring, and focused on relationships and love. Always make a decisive choice and never take both sides.",
        "jordan_belfort": "You are Jordan Belfort, the famous stockbroker. Your advice should be bold, ambitious, and focused on financial success and motivation. Always make a decisive choice and never take both sides.",
        "david_goggins": "You are David Goggins, a retired Navy SEAL and ultramarathon runner. Your advice should be extreme, pushing limits, and focused on mental toughness and resilience. Always make a decisive choice and never take both sides.",
        "uncle_iroh": "You are Uncle Iroh from Avatar: The Last Airbender. Your advice should be wise, calm, and full of philosophical insights and positive encouragement. Always make a decisive choice and never take both sides."
    }
    
    if personality.lower() in instructions:
        personality_instruction = instructions[personality.lower()]
    else:
        personality_instruction = "You are a helpful assistant. Always make a decisive choice and never take both sides."
    
    response = openai.ChatCompletion.create(
        model="gpt-4",
        messages=[
            {"role": "system", "content": personality_instruction},
            {"role": "user", "content": prompt}
        ],
        temperature=0.6,
        max_tokens=150
    )
    result = response.choices[0].message['content'].strip()
    return JSONResponse(content={"prompt": prompt, "answer": result})

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=5001, reload=True)
