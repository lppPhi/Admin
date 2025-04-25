from sqlalchemy.orm import Session
from app.models.product_model import Product
from app.schemas.product_schema import ProductCreate

def get_products(db: Session):
    return db.query(Product).all()

def create_product(db: Session, data: ProductCreate):
    new_product = Product(**data.dict())
    db.add(new_product)
    db.commit()
    db.refresh(new_product)
    return new_product
def get_product_by_id(db: Session, product_id: int):
    return db.query(Product).filter(Product.ProductID == product_id).first()

def update_product(db: Session, product_id: int, data: ProductCreate):
    product = db.query(Product).filter(Product.ProductID == product_id).first()
    if product:
        for key, value in data.dict().items():
            setattr(product, key, value)
        db.commit()
        db.refresh(product)
    return product

def delete_product(db: Session, product_id: int):
    product = db.query(Product).filter(Product.ProductID == product_id).first()
    if product:
        db.delete(product)
        db.commit()
    return {"deleted": True}
