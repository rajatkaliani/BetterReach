# Student Life Management System

A comprehensive system for managing student life activities, roll calls, locations, and communications with role-based access control.

## 🏗️ Project Structure

```
student-life-system/
├── backend/
│   ├── main.py              # Complete FastAPI backend (single file)
│   └── requirements.txt     # Python dependencies
├── frontend/
│   ├── src/                 # React frontend source code
│   ├── package.json         # Node.js dependencies
│   └── ...                  # Other frontend files
└── README.md               # This file
```

## 🚀 Quick Start

### Backend Setup

1. **Navigate to backend directory:**

   ```bash
   cd student-life-system/backend
   ```

2. **Install Python dependencies:**

   ```bash
   pip install -r requirements.txt
   ```

3. **Run the backend server:**

   ```bash
   python main.py
   ```

   The API will be available at `http://localhost:8000`

   - **API Documentation:** http://localhost:8000/docs
   - **Health Check:** http://localhost:8000/health

### Frontend Setup

1. **Navigate to frontend directory:**

   ```bash
   cd student-life-system/frontend
   ```

2. **Install Node.js dependencies:**

   ```bash
   npm install
   ```

3. **Run the frontend development server:**

   ```bash
   npm run dev
   ```

   The frontend will be available at `http://localhost:5173`

## 🔐 Authentication & Roles

### Default Users (Auto-created)

| Role          | Username    | Password      | Email                  |
| ------------- | ----------- | ------------- | ---------------------- |
| Administrator | admin       | admin123      | admin@school.edu       |
| Instructor    | instructor1 | instructor123 | instructor1@school.edu |
| Student       | student1    | student123    | student1@school.edu    |

## 👥 User Roles & Permissions

### 👨‍💼 Administrator

- **User Management:** Create, update, delete users
- **Location Management:** Add/edit locations
- **System Statistics:** View system-wide data
- **Full Access:** All administrative functions

### 👨‍🏫 Instructor

- **Student Management:** Update student locations and roles
- **Roll Call:** Create and manage attendance
- **Group Chats:** Create and manage group communications
- **Limited Access:** Cannot access admin functions

### 👨‍🎓 Student

- **Leave Requests:** Submit and manage leave requests
- **Personal Data:** View own information only
- **Limited Roll Call:** See only own attendance records
- **Restricted Access:** Cannot see other students' data

## 📡 API Endpoints

### Authentication

- `POST /auth/login` - User login
- `POST /auth/register` - User registration
- `GET /auth/me` - Get current user info

### Administrator Endpoints

- `GET /admin/users` - Get all users
- `POST /admin/users` - Create user
- `GET /admin/locations` - Get all locations
- `POST /admin/locations` - Create location
- `GET /admin/dashboard/stats` - Get admin statistics

### Instructor Endpoints

- `GET /instructor/students` - Get students
- `PUT /instructor/students/{student_id}/location` - Update student location
- `GET /instructor/dashboard/stats` - Get instructor statistics

### Student Endpoints

- `GET /student/leave-requests` - Get leave requests
- `POST /student/leave-requests` - Create leave request
- `GET /student/dashboard/stats` - Get student statistics

### Common Endpoints

- `GET /common/locations` - Get active locations
- `GET /health` - Health check

## 🗄️ Database Schema

### Users Table

- Basic user information (name, email, username)
- Role-based fields (grade for students, department for instructors)
- Current location tracking
- Password hashing

### Locations Table

- Location details (name, description, building)
- Active/inactive status

### Leave Requests Table

- Student leave requests with approval workflow
- Date validation and overlap checking

### Roll Calls Table

- Roll call sessions with scheduling
- Individual student entries with status tracking

## 🔧 Configuration

### Environment Variables (Optional)

Create a `.env` file in the backend directory:

```env
DATABASE_URL=sqlite:///./student_life.db
SECRET_KEY=your-secret-key-change-this-in-production
ACCESS_TOKEN_EXPIRE_MINUTES=30
DEBUG=True
```

## 🛠️ Development

### Backend Development

- **Single File Architecture:** All backend code is in `main.py`
- **Auto-generated Documentation:** Available at `/docs`
- **SQLite Database:** Automatically created on first run
- **JWT Authentication:** Secure token-based auth

### Frontend Development

- **React + TypeScript:** Modern frontend framework
- **TailwindCSS:** Utility-first CSS framework
- **shadcn/ui:** Beautiful component library
- **Vite:** Fast development server

## 🚀 Deployment

### Backend Deployment

1. Set up a production database (PostgreSQL recommended)
2. Configure environment variables
3. Use a production ASGI server (Gunicorn)
4. Enable HTTPS

### Frontend Deployment

1. Build the production version: `npm run build`
2. Deploy to any static hosting service
3. Configure API endpoint URLs

## 📝 Features

### ✅ Implemented

- [x] JWT Authentication
- [x] Role-based access control
- [x] User management (CRUD)
- [x] Location management
- [x] Leave request system
- [x] Roll call system
- [x] Dashboard statistics
- [x] API documentation
- [x] Frontend UI components
- [x] Database models

### 🔄 Planned Features

- [ ] Real-time notifications
- [ ] Email notifications
- [ ] File uploads
- [ ] Advanced reporting
- [ ] Mobile app
- [ ] Integration with external systems

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:

- Check the API documentation at `/docs`
- Review the code comments
- Open an issue in the repository

## 🎯 Quick Test

1. **Start the backend:**

   ```bash
   cd backend && python main.py
   ```

2. **Test the API:**

   ```bash
   curl http://localhost:8000/health
   ```

3. **View documentation:**
   Open http://localhost:8000/docs in your browser

4. **Login as admin:**
   ```bash
   curl -X POST "http://localhost:8000/auth/login" \
        -H "Content-Type: application/x-www-form-urlencoded" \
        -d "username=admin&password=admin123"
   ```

The system is now ready to use! 🎉
