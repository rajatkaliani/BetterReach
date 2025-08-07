# Student Life Management System Backend

A comprehensive FastAPI backend for managing student life activities, roll calls, locations, and communications with role-based access control.

## Features

### 🔐 Authentication & Authorization

- JWT-based authentication
- Role-based access control (Administrator, Instructor, Student)
- Secure password hashing with bcrypt

### 👨‍💼 Administrator Features

- User management (create, update, delete users)
- Location management
- Role management
- Group chat creation and management
- System-wide statistics and monitoring

### 👨‍🏫 Instructor Features

- Student location tracking and updates
- Roll call creation and management
- Student role updates (limited fields)
- Group chat creation and student management
- Attendance tracking

### 👨‍🎓 Student Features

- Leave request submission and management
- Limited roll call access (own entries only)
- Group chat participation
- Profile management

## Technology Stack

- **Framework**: FastAPI
- **Database**: SQLAlchemy with SQLite (default) / PostgreSQL
- **Authentication**: JWT with python-jose
- **Password Hashing**: bcrypt with passlib
- **Validation**: Pydantic
- **Documentation**: Auto-generated OpenAPI/Swagger

## Quick Start

### Prerequisites

- Python 3.8+
- pip or poetry

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd student-life-backend
   ```

2. **Install dependencies**

   ```bash
   pip install -r requirements.txt
   ```

3. **Set up environment variables**

   ```bash
   cp env.example .env
   # Edit .env with your configuration
   ```

4. **Run the application**
   ```bash
   python run.py
   ```

The API will be available at `http://localhost:8000`

### API Documentation

- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

## Default Users

The system comes with pre-seeded users for testing:

### Administrator

- **Username**: admin
- **Password**: admin123
- **Email**: admin@school.edu

### Instructors

- **Username**: instructor1 / instructor2
- **Password**: instructor123
- **Email**: instructor1@school.edu / instructor2@school.edu

### Students

- **Username**: student1, student2, student3, student4, student5
- **Password**: student123
- **Email**: student1@school.edu, etc.

## API Endpoints

### Authentication

- `POST /api/v1/auth/login` - User login
- `POST /api/v1/auth/register` - User registration
- `GET /api/v1/auth/me` - Get current user info

### Administrator Endpoints

- `GET /api/v1/admin/users` - Get all users
- `POST /api/v1/admin/users` - Create user
- `PUT /api/v1/admin/users/{user_id}` - Update user
- `DELETE /api/v1/admin/users/{user_id}` - Delete user
- `GET /api/v1/admin/locations` - Get all locations
- `POST /api/v1/admin/locations` - Create location
- `GET /api/v1/admin/dashboard/stats` - Get admin statistics

### Instructor Endpoints

- `GET /api/v1/instructor/students` - Get students
- `PUT /api/v1/instructor/students/{student_id}/location` - Update student location
- `GET /api/v1/instructor/roll-calls` - Get roll calls
- `POST /api/v1/instructor/roll-calls` - Create roll call
- `POST /api/v1/instructor/roll-calls/{roll_call_id}/entries` - Create roll call entry

### Student Endpoints

- `GET /api/v1/student/leave-requests` - Get leave requests
- `POST /api/v1/student/leave-requests` - Create leave request
- `GET /api/v1/student/roll-call-status` - Get roll call status
- `GET /api/v1/student/dashboard/stats` - Get student statistics

### Common Endpoints

- `GET /api/v1/common/locations` - Get active locations
- `GET /api/v1/common/profile` - Get user profile

## Database Schema

### Users

- Basic user information (name, email, username)
- Role-based fields (grade for students, department for instructors)
- Current location tracking
- Password hashing

### Locations

- Location details (name, description, building, floor, room)
- Active/inactive status

### Roll Calls

- Roll call sessions with scheduling
- Individual student entries with status tracking

### Leave Requests

- Student leave requests with approval workflow
- Date validation and overlap checking

### Group Chats

- Chat creation and member management
- Role-based access control

## Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcrypt for secure password storage
- **Role-Based Access**: Granular permissions per user role
- **Input Validation**: Pydantic models for request/response validation
- **CORS Support**: Configurable cross-origin resource sharing

## Development

### Running in Development Mode

```bash
python run.py
```

### Database Migrations

The application uses SQLAlchemy with automatic table creation. For production, consider using Alembic for migrations.

### Environment Variables

| Variable                      | Description                | Default                                     |
| ----------------------------- | -------------------------- | ------------------------------------------- |
| `DATABASE_URL`                | Database connection string | `sqlite:///./student_life.db`               |
| `SECRET_KEY`                  | JWT secret key             | `your-secret-key-change-this-in-production` |
| `ALGORITHM`                   | JWT algorithm              | `HS256`                                     |
| `ACCESS_TOKEN_EXPIRE_MINUTES` | Token expiration time      | `30`                                        |
| `DEBUG`                       | Debug mode                 | `True`                                      |

## Production Deployment

1. **Set up a production database** (PostgreSQL recommended)
2. **Configure environment variables** for production
3. **Set up a reverse proxy** (nginx)
4. **Use a production ASGI server** (Gunicorn with Uvicorn workers)
5. **Enable HTTPS** with SSL certificates
6. **Configure proper CORS settings**

### Example Production Command

```bash
gunicorn app.main:app -w 4 -k uvicorn.workers.UvicornWorker --bind 0.0.0.0:8000
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions, please open an issue in the repository.
