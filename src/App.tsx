import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Context
import { AuthProvider, useAuth } from "./context/AuthContext";

// Components
import { RoleRoute } from "./components/RoleRoute";
import { Layout } from "./components/Layout";

// Pages
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import InstructorDashboard from "./pages/InstructorDashboard";
import StudentDashboard from "./pages/StudentDashboard";
import ParentDashboard from "./pages/ParentDashboard";
import RollCall from "./pages/RollCall";
import Messages from "./pages/Messages";
import Locations from "./pages/Locations";
import Events from "./pages/Events";
import NotFound from "./pages/NotFound";
import Unauthorized from "./pages/Unauthorized";

// Admin Pages
import UserManagement from "./pages/admin/UserManagement";
import LocationSetup from "./pages/admin/LocationSetup";
import EventManagement from "./pages/admin/EventManagement";
import SystemSettings from "./pages/admin/SystemSettings";
import Analytics from "./pages/admin/Analytics";
import SecurityLogs from "./pages/admin/SecurityLogs";

// Instructor Pages
import InstructorRollCall from "./pages/instructor/RollCall";
import StudentLocations from "./pages/instructor/StudentLocations";
import InstructorMessages from "./pages/instructor/Messages";
import LeaveRequests from "./pages/instructor/LeaveRequests";

// Student Pages
import StudentSchedule from "./pages/student/Schedule";
import StudentLeaveRequests from "./pages/student/LeaveRequests";
import StudentMessages from "./pages/student/Messages";
import StudentWellness from "./pages/student/Wellness";

// Parent Pages
import ChildLocations from "./pages/parent/ChildLocations";
import ParentRequestLeave from "./pages/parent/RequestLeave";
import ParentMessages from "./pages/parent/Messages";
import ParentEvents from "./pages/parent/Events";

const queryClient = new QueryClient();

function AppRoutes() {
  const { isAuthenticated, user } = useAuth();

  const getDashboardComponent = () => {
    switch (user?.role) {
      case "admin":
        return <AdminDashboard />;
      case "instructor":
        return <InstructorDashboard />;
      case "student":
        return <StudentDashboard />;
      case "parent":
        return <ParentDashboard />;
      default:
        return <StudentDashboard />;
    }
  };

  return (
    <Routes>
      {/* Login Route */}
      <Route
        path="/login"
        element={!isAuthenticated ? <Login /> : <Navigate to="/" replace />}
      />

      {/* Dashboard Route - Role-aware */}
      <Route
        path="/"
        element={
          isAuthenticated ? (
            <Layout>{getDashboardComponent()}</Layout>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />

      {/* Role-based Protected Routes */}
      <Route
        path="/roll-call"
        element={
          <RoleRoute allowedRoles={["admin", "instructor"]}>
            <Layout>
              <RollCall />
            </Layout>
          </RoleRoute>
        }
      />

      <Route
        path="/messages"
        element={
          <RoleRoute
            allowedRoles={["admin", "instructor", "student", "parent"]}
          >
            <Layout>
              <Messages />
            </Layout>
          </RoleRoute>
        }
      />

      <Route
        path="/locations"
        element={
          <RoleRoute allowedRoles={["admin", "instructor", "student"]}>
            <Layout>
              <Locations />
            </Layout>
          </RoleRoute>
        }
      />

      <Route
        path="/events"
        element={
          <RoleRoute
            allowedRoles={["admin", "instructor", "student", "parent"]}
          >
            <Layout>
              <Events />
            </Layout>
          </RoleRoute>
        }
      />

      {/* Admin Management Routes */}
      <Route
        path="/admin/user-management"
        element={
          <RoleRoute allowedRoles={["admin"]}>
            <Layout>
              <UserManagement />
            </Layout>
          </RoleRoute>
        }
      />

      <Route
        path="/admin/location-setup"
        element={
          <RoleRoute allowedRoles={["admin"]}>
            <Layout>
              <LocationSetup />
            </Layout>
          </RoleRoute>
        }
      />

      <Route
        path="/admin/event-management"
        element={
          <RoleRoute allowedRoles={["admin"]}>
            <Layout>
              <EventManagement />
            </Layout>
          </RoleRoute>
        }
      />

      <Route
        path="/admin/system-settings"
        element={
          <RoleRoute allowedRoles={["admin"]}>
            <Layout>
              <SystemSettings />
            </Layout>
          </RoleRoute>
        }
      />

      <Route
        path="/admin/analytics"
        element={
          <RoleRoute allowedRoles={["admin"]}>
            <Layout>
              <Analytics />
            </Layout>
          </RoleRoute>
        }
      />

      <Route
        path="/admin/security-logs"
        element={
          <RoleRoute allowedRoles={["admin"]}>
            <Layout>
              <SecurityLogs />
            </Layout>
          </RoleRoute>
        }
      />

      {/* Instructor Routes */}
      <Route
        path="/instructor/roll-call"
        element={
          <RoleRoute allowedRoles={["instructor"]}>
            <Layout>
              <InstructorRollCall />
            </Layout>
          </RoleRoute>
        }
      />

      <Route
        path="/instructor/student-locations"
        element={
          <RoleRoute allowedRoles={["instructor"]}>
            <Layout>
              <StudentLocations />
            </Layout>
          </RoleRoute>
        }
      />

      <Route
        path="/instructor/messages"
        element={
          <RoleRoute allowedRoles={["instructor"]}>
            <Layout>
              <InstructorMessages />
            </Layout>
          </RoleRoute>
        }
      />

      <Route
        path="/instructor/leave-requests"
        element={
          <RoleRoute allowedRoles={["instructor"]}>
            <Layout>
              <LeaveRequests />
            </Layout>
          </RoleRoute>
        }
      />

      {/* Student Routes */}
      <Route
        path="/student/dashboard"
        element={
          <RoleRoute allowedRoles={["student"]}>
            <Layout>
              <StudentDashboard />
            </Layout>
          </RoleRoute>
        }
      />

      <Route
        path="/student/schedule"
        element={
          <RoleRoute allowedRoles={["student"]}>
            <Layout>
              <StudentSchedule />
            </Layout>
          </RoleRoute>
        }
      />

      <Route
        path="/student/leave-requests"
        element={
          <RoleRoute allowedRoles={["student"]}>
            <Layout>
              <StudentLeaveRequests />
            </Layout>
          </RoleRoute>
        }
      />

      <Route
        path="/student/messages"
        element={
          <RoleRoute allowedRoles={["student"]}>
            <Layout>
              <StudentMessages />
            </Layout>
          </RoleRoute>
        }
      />

      <Route
        path="/student/wellness"
        element={
          <RoleRoute allowedRoles={["student"]}>
            <Layout>
              <StudentWellness />
            </Layout>
          </RoleRoute>
        }
      />

      {/* Parent Routes */}
      <Route
        path="/parent/dashboard"
        element={
          <RoleRoute allowedRoles={["parent"]}>
            <Layout>
              <ParentDashboard />
            </Layout>
          </RoleRoute>
        }
      />

      <Route
        path="/parent/child-locations"
        element={
          <RoleRoute allowedRoles={["parent"]}>
            <Layout>
              <ChildLocations />
            </Layout>
          </RoleRoute>
        }
      />

      <Route
        path="/parent/request-leave"
        element={
          <RoleRoute allowedRoles={["parent"]}>
            <Layout>
              <ParentRequestLeave />
            </Layout>
          </RoleRoute>
        }
      />

      <Route
        path="/parent/messages"
        element={
          <RoleRoute allowedRoles={["parent"]}>
            <Layout>
              <ParentMessages />
            </Layout>
          </RoleRoute>
        }
      />

      <Route
        path="/parent/events"
        element={
          <RoleRoute allowedRoles={["parent"]}>
            <Layout>
              <ParentEvents />
            </Layout>
          </RoleRoute>
        }
      />

      {/* Unauthorized Route */}
      <Route path="/unauthorized" element={<Unauthorized />} />

      {/* 404 Route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <AuthProvider>
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
