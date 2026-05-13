from pydantic import BaseModel
from typing import List, Optional

# --- User Schemas ---

class UserCreate(BaseModel):
    username: str
    password: str

class User(BaseModel):
    id: int
    username: str

    class Config:
        from_attributes = True

# --- Expense Schemas ---

class ExpenseBase(BaseModel):
    name: str
    cost: float
    value: int

class ExpenseCreate(ExpenseBase):
    pass

class Expense(ExpenseBase):
    id: int
    owner_id: int

    class Config:
        from_attributes = True

# --- Token Schemas ---

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: Optional[str] = None