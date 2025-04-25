from sqlalchemy import Column, Integer, String, Numeric, DateTime
from datetime import datetime
from app.database.database import Base

class Product(Base):
    __tablename__ = "Product"
    ProductID = Column(Integer, primary_key=True, index=True)
    ProductName = Column(String, nullable=False)
    Description = Column(String)
    Price = Column(Numeric(18, 2), nullable=False)
    Stock = Column(Integer, nullable=False)
    Category = Column(String)
    CreatedAt = Column(DateTime, default=datetime.now)
    UpdatedAt = Column(DateTime, default=datetime.now)
