#!/usr/bin/env python3
"""
API Test Script for Student Life Management System
Tests basic functionality of the API
"""

import requests
import json
import time

BASE_URL = "http://localhost:8000"

def test_health():
    """Test health endpoint"""
    print("🔍 Testing health endpoint...")
    try:
        response = requests.get(f"{BASE_URL}/health")
        if response.status_code == 200:
            print("✅ Health check passed")
            return True
        else:
            print(f"❌ Health check failed: {response.status_code}")
            return False
    except requests.exceptions.ConnectionError:
        print("❌ Could not connect to server. Make sure the server is running.")
        return False

def test_login(username, password):
    """Test login endpoint"""
    print(f"🔐 Testing login for {username}...")
    try:
        data = {
            "username": username,
            "password": password
        }
        response = requests.post(f"{BASE_URL}/auth/login", data=data)
        if response.status_code == 200:
            token_data = response.json()
            print(f"✅ Login successful for {username}")
            return token_data["access_token"]
        else:
            print(f"❌ Login failed for {username}: {response.status_code}")
            return None
    except Exception as e:
        print(f"❌ Login error for {username}: {e}")
        return None

def test_protected_endpoint(token, endpoint, description):
    """Test a protected endpoint"""
    print(f"🔒 Testing {description}...")
    try:
        headers = {"Authorization": f"Bearer {token}"}
        response = requests.get(f"{BASE_URL}{endpoint}", headers=headers)
        if response.status_code == 200:
            print(f"✅ {description} successful")
            return True
        else:
            print(f"❌ {description} failed: {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ {description} error: {e}")
        return False

def main():
    print("🧪 Starting API Tests...")
    print("=" * 50)
    
    # Test health endpoint
    if not test_health():
        print("\n❌ Server is not running. Please start the server first.")
        return
    
    print("\n" + "=" * 50)
    
    # Test admin login
    admin_token = test_login("admin", "admin123")
    if admin_token:
        test_protected_endpoint(admin_token, "/admin/users", "Admin users endpoint")
        test_protected_endpoint(admin_token, "/admin/locations", "Admin locations endpoint")
        test_protected_endpoint(admin_token, "/admin/dashboard/stats", "Admin dashboard stats")
    
    print("\n" + "=" * 50)
    
    # Test instructor login
    instructor_token = test_login("instructor1", "instructor123")
    if instructor_token:
        test_protected_endpoint(instructor_token, "/instructor/students", "Instructor students endpoint")
        test_protected_endpoint(instructor_token, "/instructor/dashboard/stats", "Instructor dashboard stats")
    
    print("\n" + "=" * 50)
    
    # Test student login
    student_token = test_login("student1", "student123")
    if student_token:
        test_protected_endpoint(student_token, "/student/leave-requests", "Student leave requests endpoint")
        test_protected_endpoint(student_token, "/student/dashboard/stats", "Student dashboard stats")
    
    print("\n" + "=" * 50)
    print("🎉 API tests completed!")
    print("\n📖 View full API documentation at: http://localhost:8000/docs")

if __name__ == "__main__":
    main() 