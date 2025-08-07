#!/usr/bin/env python3
"""
Simple test script to verify the Student Life Management System API
"""

import requests
import json
from typing import Dict, Any

BASE_URL = "http://localhost:8000/api/v1"

def test_health_check():
    """Test the health check endpoint."""
    print("Testing health check...")
    response = requests.get("http://localhost:8000/health")
    print(f"Status: {response.status_code}")
    print(f"Response: {response.json()}")
    print()

def test_login(username: str, password: str) -> Dict[str, Any]:
    """Test login and return token."""
    print(f"Testing login for {username}...")
    data = {
        "username": username,
        "password": password
    }
    response = requests.post(f"{BASE_URL}/auth/login", data=data)
    print(f"Status: {response.status_code}")
    if response.status_code == 200:
        token_data = response.json()
        print(f"Login successful! Token: {token_data['access_token'][:20]}...")
        return token_data
    else:
        print(f"Login failed: {response.text}")
        return {}

def test_admin_endpoints(token: str):
    """Test administrator endpoints."""
    headers = {"Authorization": f"Bearer {token}"}
    
    print("Testing admin endpoints...")
    
    # Get all users
    response = requests.get(f"{BASE_URL}/admin/users", headers=headers)
    print(f"Get users - Status: {response.status_code}")
    if response.status_code == 200:
        users = response.json()
        print(f"Found {len(users)} users")
    
    # Get dashboard stats
    response = requests.get(f"{BASE_URL}/admin/dashboard/stats", headers=headers)
    print(f"Dashboard stats - Status: {response.status_code}")
    if response.status_code == 200:
        stats = response.json()
        print(f"Stats: {stats}")
    
    print()

def test_instructor_endpoints(token: str):
    """Test instructor endpoints."""
    headers = {"Authorization": f"Bearer {token}"}
    
    print("Testing instructor endpoints...")
    
    # Get students
    response = requests.get(f"{BASE_URL}/instructor/students", headers=headers)
    print(f"Get students - Status: {response.status_code}")
    if response.status_code == 200:
        students = response.json()
        print(f"Found {len(students)} students")
    
    # Get dashboard stats
    response = requests.get(f"{BASE_URL}/instructor/dashboard/stats", headers=headers)
    print(f"Dashboard stats - Status: {response.status_code}")
    if response.status_code == 200:
        stats = response.json()
        print(f"Stats: {stats}")
    
    print()

def test_student_endpoints(token: str):
    """Test student endpoints."""
    headers = {"Authorization": f"Bearer {token}"}
    
    print("Testing student endpoints...")
    
    # Get leave requests
    response = requests.get(f"{BASE_URL}/student/leave-requests", headers=headers)
    print(f"Get leave requests - Status: {response.status_code}")
    if response.status_code == 200:
        requests_data = response.json()
        print(f"Found {len(requests_data)} leave requests")
    
    # Get dashboard stats
    response = requests.get(f"{BASE_URL}/student/dashboard/stats", headers=headers)
    print(f"Dashboard stats - Status: {response.status_code}")
    if response.status_code == 200:
        stats = response.json()
        print(f"Stats: {stats}")
    
    print()

def test_common_endpoints(token: str):
    """Test common endpoints."""
    headers = {"Authorization": f"Bearer {token}"}
    
    print("Testing common endpoints...")
    
    # Get locations
    response = requests.get(f"{BASE_URL}/common/locations", headers=headers)
    print(f"Get locations - Status: {response.status_code}")
    if response.status_code == 200:
        locations = response.json()
        print(f"Found {len(locations)} locations")
    
    # Get profile
    response = requests.get(f"{BASE_URL}/common/profile", headers=headers)
    print(f"Get profile - Status: {response.status_code}")
    if response.status_code == 200:
        profile = response.json()
        print(f"Profile: {profile['full_name']} ({profile['role']})")
    
    print()

def main():
    """Run all tests."""
    print("=" * 50)
    print("Student Life Management System API Test")
    print("=" * 50)
    
    # Test health check
    test_health_check()
    
    # Test admin login and endpoints
    admin_token_data = test_login("admin", "admin123")
    if admin_token_data:
        test_admin_endpoints(admin_token_data["access_token"])
    
    # Test instructor login and endpoints
    instructor_token_data = test_login("instructor1", "instructor123")
    if instructor_token_data:
        test_instructor_endpoints(instructor_token_data["access_token"])
    
    # Test student login and endpoints
    student_token_data = test_login("student1", "student123")
    if student_token_data:
        test_student_endpoints(student_token_data["access_token"])
        test_common_endpoints(student_token_data["access_token"])
    
    print("=" * 50)
    print("Test completed!")
    print("=" * 50)

if __name__ == "__main__":
    main() 