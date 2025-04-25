from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.database.database import SessionLocal
from app.schemas.product_schema import ProductCreate, ProductOut
from app.services.product_service import (
    get_products, get_product_by_id,
    create_product, update_product, delete_product
)

router = APIRouter()

# Dependency để inject session DB
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Lấy danh sách sản phẩm
@router.get("/products", response_model=List[ProductOut])
def list_products(db: Session = Depends(get_db)):
    return get_products(db)

# Thêm sản phẩm mới
@router.post("/products", response_model=ProductOut)
def add_product(product: ProductCreate, db: Session = Depends(get_db)):
    return create_product(db, product)

# Lấy 1 sản phẩm theo ID
@router.get("/products/{product_id}", response_model=ProductOut)
def get_product(product_id: int, db: Session = Depends(get_db)):
    product = get_product_by_id(db, product_id)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product

# Cập nhật sản phẩm
@router.put("/products/{product_id}", response_model=ProductOut)
def update(product_id: int, product: ProductCreate, db: Session = Depends(get_db)):
    return update_product(db, product_id, product)

# Xoá sản phẩm
@router.delete("/products/{product_id}")
def delete(product_id: int, db: Session = Depends(get_db)):
    return delete_product(db, product_id)
