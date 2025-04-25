from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.controllers import product_controller

app = FastAPI()

# Cho phép truy cập từ frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(product_controller.router)

