from fastapi import FastAPI
import openai
from fastapi.middleware.cors import CORSMiddleware
#from routes import tokyo_olympics, paris_olympics

import warnings
warnings.filterwarnings("ignore")

from pydantic import BaseSettings


class Settings(BaseSettings):
    OPENAI_API_KEY: str = 'OPENAI_API_KEY'

    class Config:
        env_file = '.env'

settings = Settings()
openai.api_key = settings.OPENAI_API_KEY

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

#app.include_router(tokyo_olympics.router, prefix="/2021", tags=['Tokyo Olympics'])
#app.include_router(paris_olympics.router, prefix="/2024", tags=['Paris Olympics'])

@app.get("/")
def root():
    return {"status": "ok"}