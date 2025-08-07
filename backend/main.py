from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBearer, OAuth2PasswordRequestForm
from sqlalchemy import create_engine, Column, Integer, String, DateTime, Boolean, ForeignKey, Text
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session, relationship
from sqlalchemy.sql import func
from pydantic import BaseModel, EmailStr
from typing import Optional, List
from datetime import datetime, timedelta
from jose import JWTError, jwt
from passlib.context import CryptContext
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Database setup
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./student_life.db")
engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False} if "sqlite" in DATABASE_URL else {})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# Security setup
SECRET_KEY = os.getenv("SECRET_KEY", "your-secret-key-change-this-in-production")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
security = HTTPBearer()

# FastAPI app
app = FastAPI(
    title="Student Life Management System",
    description="A comprehensive system for managing student life activities",
    version="1.0.0"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Database Models
class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    username = Column(String, unique=True, index=True, nullable=False)
    full_name = Column(String, nullable=False)
    hashed_password = Column(String, nullable=False)
    role = Column(String, nullable=False, default="student")  # admin, instructor, student
    is_active = Column(Boolean, default=True)
    grade = Column(String, nullable=True)  # For students
    student_id = Column(String, unique=True, nullable=True)  # For students
    department = Column(String, nullable=True)  # For instructors
    current_location_id = Column(Integer, ForeignKey("locations.id"), nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class Location(Base):
    __tablename__ = "locations"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False, unique=True)
    description = Column(Text, nullable=True)
    building = Column(String, nullable=True)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class LeaveRequest(Base):
    __tablename__ = "leave_requests"
    
    id = Column(Integer, primary_key=True, index=True)
    student_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    reason = Column(Text, nullable=False)
    start_date = Column(DateTime, nullable=False)
    end_date = Column(DateTime, nullable=False)
    status = Column(String, default="pending")  # pending, approved, rejected
    approved_by = Column(Integer, ForeignKey("users.id"), nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class RollCall(Base):
    __tablename__ = "roll_calls"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    location_id = Column(Integer, ForeignKey("locations.id"), nullable=True)
    conducted_by = Column(Integer, ForeignKey("users.id"), nullable=False)
    scheduled_time = Column(DateTime, nullable=False)
    conducted_at = Column(DateTime(timezone=True), nullable=True)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class RollCallEntry(Base):
    __tablename__ = "roll_call_entries"
    
    id = Column(Integer, primary_key=True, index=True)
    roll_call_id = Column(Integer, ForeignKey("roll_calls.id"), nullable=False)
    student_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    status = Column(String, default="absent")  # present, absent, late, excused
    notes = Column(Text, nullable=True)
    marked_by = Column(Integer, ForeignKey("users.id"), nullable=True)
    marked_at = Column(DateTime(timezone=True), server_default=func.now())

# Create tables
Base.metadata.create_all(bind=engine)

# Pydantic Models
class UserBase(BaseModel):
    email: EmailStr
    username: str
    full_name: str
    role: str = "student"

class UserCreate(UserBase):
    password: str
    grade: Optional[str] = None
    student_id: Optional[str] = None
    department: Optional[str] = None

class UserResponse(UserBase):
    id: int
    is_active: bool
    grade: Optional[str] = None
    student_id: Optional[str] = None
    department: Optional[str] = None
    current_location_id: Optional[int] = None
    created_at: datetime

    class Config:
        from_attributes = True

class UserLogin(BaseModel):
    username: str
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str
    user: UserResponse

class LocationBase(BaseModel):
    name: str
    description: Optional[str] = None
    building: Optional[str] = None

class LocationResponse(LocationBase):
    id: int
    is_active: bool
    created_at: datetime

    class Config:
        from_attributes = True

class LeaveRequestBase(BaseModel):
    reason: str
    start_date: datetime
    end_date: datetime

class LeaveRequestResponse(LeaveRequestBase):
    id: int
    student_id: int
    status: str
    approved_by: Optional[int] = None
    created_at: datetime

    class Config:
        from_attributes = True

# Database dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Security functions
def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None) -> str:
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def verify_token(token: str) -> Optional[dict]:
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except JWTError:
        return None

def get_current_user(
    credentials: HTTPBearer = Depends(security),
    db: Session = Depends(get_db)
) -> User:
    token = credentials.credentials
    payload = verify_token(token)
    
    if payload is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials"
        )
    
    user_id: int = payload.get("sub")
    if user_id is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials"
        )
    
    user = db.query(User).filter(User.id == user_id).first()
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User not found"
        )
    
    if not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Inactive user"
        )
    
    return user

def require_admin(current_user: User = Depends(get_current_user)) -> User:
    if current_user.role != "administrator":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Administrator access required"
        )
    return current_user

def require_instructor(current_user: User = Depends(get_current_user)) -> User:
    if current_user.role not in ["instructor", "administrator"]:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Instructor or administrator access required"
        )
    return current_user

def require_student(current_user: User = Depends(get_current_user)) -> User:
    if current_user.role != "student":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Student access required"
        )
    return current_user

# API Routes

@app.get("/")
def read_root():
    return {
        "message": "Student Life Management System API",
        "version": "1.0.0",
        "docs": "/docs"
    }

@app.get("/health")
def health_check():
    return {"status": "healthy"}

# Authentication routes
@app.post("/auth/login", response_model=Token)
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = db.query(User).filter(User.username == form_data.username).first()
    
    if not user or not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password"
        )
    
    if not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Inactive user"
        )
    
    access_token = create_access_token(data={"sub": str(user.id)})
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": user
    }

@app.post("/auth/register", response_model=UserResponse)
def register(user_data: UserCreate, db: Session = Depends(get_db)):
    existing_user = db.query(User).filter(User.username == user_data.username).first()
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Username already registered"
        )
    
    existing_email = db.query(User).filter(User.email == user_data.email).first()
    if existing_email:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
    
    hashed_password = get_password_hash(user_data.password)
    db_user = User(
        email=user_data.email,
        username=user_data.username,
        full_name=user_data.full_name,
        hashed_password=hashed_password,
        role=user_data.role,
        grade=user_data.grade,
        student_id=user_data.student_id,
        department=user_data.department
    )
    
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

@app.get("/auth/me", response_model=UserResponse)
def get_current_user_info(current_user: User = Depends(get_current_user)):
    return current_user

# Admin routes
@app.get("/admin/users", response_model=List[UserResponse])
def get_all_users(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_admin)
):
    users = db.query(User).offset(skip).limit(limit).all()
    return users

@app.post("/admin/users", response_model=UserResponse)
def create_user(
    user_data: UserCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_admin)
):
    existing_user = db.query(User).filter(User.username == user_data.username).first()
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Username already registered"
        )
    
    hashed_password = get_password_hash(user_data.password)
    db_user = User(
        email=user_data.email,
        username=user_data.username,
        full_name=user_data.full_name,
        hashed_password=hashed_password,
        role=user_data.role,
        grade=user_data.grade,
        student_id=user_data.student_id,
        department=user_data.department
    )
    
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

@app.get("/admin/locations", response_model=List[LocationResponse])
def get_all_locations(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_admin)
):
    locations = db.query(Location).offset(skip).limit(limit).all()
    return locations

@app.post("/admin/locations", response_model=LocationResponse)
def create_location(
    location_data: LocationBase,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_admin)
):
    db_location = Location(**location_data.dict())
    db.add(db_location)
    db.commit()
    db.refresh(db_location)
    return db_location

@app.get("/admin/dashboard/stats")
def get_admin_stats(
    db: Session = Depends(get_db),
    current_user: User = Depends(require_admin)
):
    total_students = db.query(User).filter(User.role == "student").count()
    total_instructors = db.query(User).filter(User.role == "instructor").count()
    total_locations = db.query(Location).filter(Location.is_active == True).count()
    
    return {
        "total_students": total_students,
        "total_instructors": total_instructors,
        "total_locations": total_locations
    }

# Instructor routes
@app.get("/instructor/students", response_model=List[UserResponse])
def get_students(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_instructor)
):
    students = db.query(User).filter(User.role == "student").offset(skip).limit(limit).all()
    return students

@app.put("/instructor/students/{student_id}/location", response_model=UserResponse)
def update_student_location(
    student_id: int,
    location_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_instructor)
):
    student = db.query(User).filter(User.id == student_id, User.role == "student").first()
    if not student:
        raise HTTPException(status_code=404, detail="Student not found")
    
    location = db.query(Location).filter(Location.id == location_id).first()
    if not location:
        raise HTTPException(status_code=404, detail="Location not found")
    
    student.current_location_id = location_id
    db.commit()
    db.refresh(student)
    return student

@app.get("/instructor/dashboard/stats")
def get_instructor_stats(
    db: Session = Depends(get_db),
    current_user: User = Depends(require_instructor)
):
    total_students = db.query(User).filter(User.role == "student").count()
    total_roll_calls = db.query(RollCall).filter(RollCall.conducted_by == current_user.id).count()
    
    return {
        "total_students": total_students,
        "total_roll_calls": total_roll_calls
    }

# Student routes
@app.get("/student/leave-requests", response_model=List[LeaveRequestResponse])
def get_my_leave_requests(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_student)
):
    leave_requests = db.query(LeaveRequest).filter(
        LeaveRequest.student_id == current_user.id
    ).offset(skip).limit(limit).all()
    return leave_requests

@app.post("/student/leave-requests", response_model=LeaveRequestResponse)
def create_leave_request(
    leave_request_data: LeaveRequestBase,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_student)
):
    if leave_request_data.start_date >= leave_request_data.end_date:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Start date must be before end date"
        )
    
    if leave_request_data.start_date < datetime.utcnow():
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Start date cannot be in the past"
        )
    
    db_leave_request = LeaveRequest(
        **leave_request_data.dict(),
        student_id=current_user.id
    )
    db.add(db_leave_request)
    db.commit()
    db.refresh(db_leave_request)
    return db_leave_request

@app.get("/student/dashboard/stats")
def get_student_stats(
    db: Session = Depends(get_db),
    current_user: User = Depends(require_student)
):
    total_leave_requests = db.query(LeaveRequest).filter(
        LeaveRequest.student_id == current_user.id
    ).count()
    
    pending_leave_requests = db.query(LeaveRequest).filter(
        LeaveRequest.student_id == current_user.id,
        LeaveRequest.status == "pending"
    ).count()
    
    return {
        "total_leave_requests": total_leave_requests,
        "pending_leave_requests": pending_leave_requests,
        "current_location": current_user.current_location_id
    }

# Common routes
@app.get("/common/locations", response_model=List[LocationResponse])
def get_active_locations(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    locations = db.query(Location).filter(Location.is_active == True).offset(skip).limit(limit).all()
    return locations

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000) 