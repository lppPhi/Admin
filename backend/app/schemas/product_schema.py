from pydantic import BaseModel
from typing import Optional

class ProductCreate(BaseModel):
    ProductName: str
    Description: Optional[str]
    Price: float
    Stock: int
    Category: Optional[str]

class ProductOut(ProductCreate):
    ProductID: int
    class Config:
        orm_mode = True
