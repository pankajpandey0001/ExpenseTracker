from pydantic import BaseModel, ConfigDict
from typing import List, Optional

# --- User Schemas ---

class UserCreate(BaseModel):
    username: str
    password: str

class User(BaseModel):
    id: int
    username: str

    model_config = ConfigDict(from_attributes=True)

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

    model_config = ConfigDict(from_attributes=True)

# --- Token Schemas ---

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: Optional[str] = None