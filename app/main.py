from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware
from jose import JWTError, jwt

# Correct folder-based imports
from app import models, schemas, auth
from app.database import SessionLocal, engine

# Automatically create database tables
models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Intelligent Expense & Budget API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():
    db = SessionLocal()
    try: 
        yield db
    finally: 
        db.close()

def get_current_user(token: str = Depends(auth.oauth2_scheme), db: Session = Depends(get_db)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, auth.SECRET_KEY, algorithms=[auth.ALGORITHM])
        username: str = payload.get("sub")
        if username is None: 
            raise credentials_exception
    except JWTError:
        raise credentials_exception
        
    user = db.query(models.User).filter(models.User.username == username).first()
    if user is None: 
        raise credentials_exception
    return user

# --- ROUTES ---

@app.get("/")
def read_root():
    return {"message": "API is running! Open frontend/index.html to use the app."}

@app.post("/register/")
def register_user(user_data: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(models.User.username == user_data.username).first()
    if db_user: 
        raise HTTPException(status_code=400, detail="Username already registered")
    
    hashed_pwd = auth.get_password_hash(user_data.password) 
    
    user = models.User(username=user_data.username, hashed_password=hashed_pwd)
    db.add(user)
    db.commit()
    return {"message": "User created successfully"}

@app.post("/token", response_model=schemas.Token)
def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.username == form_data.username).first()
    if not user:
        raise HTTPException(status_code=401, detail="Incorrect username or password")
        
    try:
        # We wrap this in a try/except to catch the 72-byte error from OLD database accounts
        is_password_valid = auth.verify_password(form_data.password, user.hashed_password)
    except ValueError:
        raise HTTPException(status_code=401, detail="Database reset required. Please register a brand new user.")

    if not is_password_valid:
        raise HTTPException(status_code=401, detail="Incorrect username or password")
        
    access_token = auth.create_access_token(data={"sub": user.username})
    return {"access_token": access_token, "token_type": "bearer"}

@app.post("/expenses/", response_model=schemas.Expense)
def create_expense(expense: schemas.ExpenseCreate, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    db_expense = models.Expense(**expense.model_dump(), owner_id=current_user.id)
    db.add(db_expense)
    db.commit()
    db.refresh(db_expense)
    return db_expense

@app.get("/expenses/", response_model=list[schemas.Expense])
def read_expenses(db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    return db.query(models.Expense).filter(models.Expense.owner_id == current_user.id).all()

@app.delete("/expenses/{expense_id}")
def delete_expense(expense_id: int, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    expense = db.query(models.Expense).filter(models.Expense.id == expense_id, models.Expense.owner_id == current_user.id).first()
    if not expense: 
        raise HTTPException(status_code=404, detail="Expense not found")
    db.delete(expense)
    db.commit()
    return {"message": "Expense deleted"}

@app.get("/optimize-budget/")
def optimize_budget(budget: float, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    expenses = db.query(models.Expense).filter(models.Expense.owner_id == current_user.id).all()
    if not expenses: 
        return {"message": "No expenses to optimize"}

    max_weight = int(budget * 100)
    n = len(expenses)
    weights = [int(item.cost * 100) for item in expenses]
    values = [item.value for item in expenses]
    
    dp = [[0 for _ in range(max_weight + 1)] for _ in range(n + 1)]
    for i in range(1, n + 1):
        for w in range(1, max_weight + 1):
            if weights[i-1] <= w:
                dp[i][w] = max(values[i-1] + dp[i-1][w-weights[i-1]], dp[i-1][w])
            else:
                dp[i][w] = dp[i-1][w]
                
    res = dp[n][max_weight]
    w = max_weight
    selected_items = []
    
    for i in range(n, 0, -1):
        if res <= 0: break
        if res != dp[i-1][w]:
            selected_items.append({
                "id": expenses[i-1].id, "name": expenses[i-1].name,
                "cost": expenses[i-1].cost, "value": expenses[i-1].value
            })
            res -= values[i-1]
            w -= weights[i-1]
            
    return {
        "budget_limit": budget,
        "optimized_total_cost": sum(item["cost"] for item in selected_items),
        "selected_expenses": selected_items
    }