import openai
import uvicorn
from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse
from pydantic import BaseSettings
from fastapi.middleware.cors import CORSMiddleware

import warnings
warnings.filterwarnings("ignore")

class Settings(BaseSettings):
    OPENAI_API_KEY: str = 'OPENAI_API_KEY'

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

@app.post("/test/{prompt}", response_class=HTMLResponse)
def answer(request: Request, prompt: str):
    response = openai.Completion.create(
        model="text-davinci-002",
        prompt=prompt,
        temperature=0.6,
        max_tokens=150
    )
    result = response.choices[0].text
    return {"prompt": prompt, "answer": result}

if __name__ == "__main__":
    uvicorn.run(app, host="localhost", port=5001, reload=True)
