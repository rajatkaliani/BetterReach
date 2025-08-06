from sqlalchemy import Column, Integer, String, DateTime, Text, Boolean, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.core.database import Base

class GroupChat(Base):
    __tablename__ = "group_chats"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    description = Column(Text, nullable=True)
    created_by = Column(Integer, ForeignKey("users.id"), nullable=False)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Relationships
    creator = relationship("User")
    members = relationship("GroupChatMember", back_populates="group_chat")
    
    def __repr__(self):
        return f"<GroupChat(id={self.id}, name='{self.name}')>"

class GroupChatMember(Base):
    __tablename__ = "group_chat_members"
    
    id = Column(Integer, primary_key=True, index=True)
    group_chat_id = Column(Integer, ForeignKey("group_chats.id"), nullable=False)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    role = Column(String, default="member")  # admin, member
    joined_at = Column(DateTime(timezone=True), server_default=func.now())
    
    # Relationships
    group_chat = relationship("GroupChat", back_populates="members")
    user = relationship("User", back_populates="group_chat_memberships")
    
    def __repr__(self):
        return f"<GroupChatMember(group_chat_id={self.group_chat_id}, user_id={self.user_id})>" 