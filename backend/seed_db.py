#!/usr/bin/env python3
"""
Database seeder script for Student Life Management System
Creates default users and locations for testing
"""

import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from main import SessionLocal, User, Location, get_password_hash

def seed_database():
    """Seed the database with initial data"""
    db = SessionLocal()
    
    try:
        # Check if admin user already exists
        admin = db.query(User).filter(User.username == "admin").first()
        if not admin:
            # Create admin user
            admin_user = User(
                email="admin@school.edu",
                username="admin",
                full_name="System Administrator",
                hashed_password=get_password_hash("admin123"),
                role="administrator",
                is_active=True
            )
            db.add(admin_user)
            print("✅ Created admin user")
        
        # Check if instructor user already exists
        instructor = db.query(User).filter(User.username == "instructor1").first()
        if not instructor:
            # Create instructor user
            instructor_user = User(
                email="instructor1@school.edu",
                username="instructor1",
                full_name="John Instructor",
                hashed_password=get_password_hash("instructor123"),
                role="instructor",
                department="Computer Science",
                is_active=True
            )
            db.add(instructor_user)
            print("✅ Created instructor user")
        
        # Check if student user already exists
        student = db.query(User).filter(User.username == "student1").first()
        if not student:
            # Create student user
            student_user = User(
                email="student1@school.edu",
                username="student1",
                full_name="Alice Student",
                hashed_password=get_password_hash("student123"),
                role="student",
                grade="12th Grade",
                student_id="STU001",
                is_active=True
            )
            db.add(student_user)
            print("✅ Created student user")
        
        # Create default locations
        locations_data = [
            {"name": "Main Building", "description": "Primary school building", "building": "A"},
            {"name": "Science Lab", "description": "Laboratory for science classes", "building": "B"},
            {"name": "Library", "description": "School library and study area", "building": "A"},
            {"name": "Gymnasium", "description": "Sports and physical education", "building": "C"},
            {"name": "Cafeteria", "description": "Dining hall and social area", "building": "A"}
        ]
        
        for loc_data in locations_data:
            existing_location = db.query(Location).filter(Location.name == loc_data["name"]).first()
            if not existing_location:
                location = Location(**loc_data)
                db.add(location)
                print(f"✅ Created location: {loc_data['name']}")
        
        db.commit()
        print("\n🎉 Database seeded successfully!")
        print("\nDefault users created:")
        print("👨‍💼 Admin: admin / admin123")
        print("👨‍🏫 Instructor: instructor1 / instructor123")
        print("👨‍🎓 Student: student1 / student123")
        
    except Exception as e:
        print(f"❌ Error seeding database: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    seed_database() 