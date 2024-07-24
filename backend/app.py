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

@app.post("/test/{prompt}")
async def answer(request: Request, prompt: str):
    response = openai.ChatCompletion.create(
        model="gpt-4",
        messages=[
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": prompt}
        ],
        temperature=0.6,
        max_tokens=150
    )
    result = response.choices[0].message['content'].strip()
    return JSONResponse(content={"prompt": prompt, "answer": result})

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=5001, reload=True)
