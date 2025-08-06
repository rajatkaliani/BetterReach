from fastapi import APIRouter
from .auth.auth import router as auth_router
from .admin.admin import router as admin_router
from .instructor.instructor import router as instructor_router
from .student.student import router as student_router
from .common.common import router as common_router

api_router = APIRouter()

# Include all routers
api_router.include_router(auth_router)
api_router.include_router(admin_router)
api_router.include_router(instructor_router)
api_router.include_router(student_router)
api_router.include_router(common_router) 