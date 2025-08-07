from sqlalchemy import Column, Integer, String, DateTime, Boolean, ForeignKey, Text
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.core.database import Base
from enum import Enum

class UserRole(str, Enum):
    ADMINISTRATOR = "administrator"
    INSTRUCTOR = "instructor"
    STUDENT = "student"

class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    username = Column(String, unique=True, index=True, nullable=False)
    full_name = Column(String, nullable=False)
    hashed_password = Column(String, nullable=False)
    role = Column(String, nullable=False, default=UserRole.STUDENT)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Student-specific fields
    grade = Column(String, nullable=True)  # For students only
    student_id = Column(String, unique=True, nullable=True)  # Student ID number
    
    # Instructor-specific fields
    department = Column(String, nullable=True)  # For instructors only
    subject_taught = Column(String, nullable=True)  # For instructors only
    
    # Relationships
    current_location_id = Column(Integer, ForeignKey("locations.id"), nullable=True)
    current_location = relationship("Location", foreign_keys=[current_location_id])
    
    # Roll call entries
    roll_call_entries = relationship("RollCallEntry", back_populates="student")
    
    # Leave requests (for students)
    leave_requests = relationship("LeaveRequest", back_populates="student")
    
    # Group chat memberships
    group_chat_memberships = relationship("GroupChatMember", back_populates="user")
    
    def __repr__(self):
        return f"<User(id={self.id}, username='{self.username}', role='{self.role}')>" 