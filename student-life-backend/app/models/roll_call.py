from sqlalchemy import Column, Integer, String, DateTime, Text, Boolean, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.core.database import Base
from enum import Enum

class RollCallStatus(str, Enum):
    PRESENT = "present"
    ABSENT = "absent"
    LATE = "late"
    EXCUSED = "excused"

class RollCall(Base):
    __tablename__ = "roll_calls"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    description = Column(Text, nullable=True)
    location_id = Column(Integer, ForeignKey("locations.id"), nullable=True)
    conducted_by = Column(Integer, ForeignKey("users.id"), nullable=False)
    scheduled_time = Column(DateTime, nullable=False)
    conducted_at = Column(DateTime(timezone=True), nullable=True)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Relationships
    location = relationship("Location")
    conductor = relationship("User")
    entries = relationship("RollCallEntry", back_populates="roll_call")
    
    def __repr__(self):
        return f"<RollCall(id={self.id}, name='{self.name}')>"

class RollCallEntry(Base):
    __tablename__ = "roll_call_entries"
    
    id = Column(Integer, primary_key=True, index=True)
    roll_call_id = Column(Integer, ForeignKey("roll_calls.id"), nullable=False)
    student_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    status = Column(String, default=RollCallStatus.ABSENT)
    notes = Column(Text, nullable=True)
    marked_by = Column(Integer, ForeignKey("users.id"), nullable=True)
    marked_at = Column(DateTime(timezone=True), server_default=func.now())
    
    # Relationships
    roll_call = relationship("RollCall", back_populates="entries")
    student = relationship("User", foreign_keys=[student_id], back_populates="roll_call_entries")
    marker = relationship("User", foreign_keys=[marked_by])
    
    def __repr__(self):
        return f"<RollCallEntry(roll_call_id={self.roll_call_id}, student_id={self.student_id}, status='{self.status}')>" 