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

const queryClient = new QueryClient();

function AppRoutes() {
  const { isAuthenticated, user } = useAuth();

  const getDashboardComponent = () => {
    switch (user?.role) {
      case 'admin':
        return <AdminDashboard />;
      case 'instructor':
        return <InstructorDashboard />;
      case 'student':
        return <StudentDashboard />;
      case 'parent':
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
        element={
          !isAuthenticated ? <Login /> : <Navigate to="/" replace />
        } 
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
          <RoleRoute allowedRoles={['admin', 'instructor']}>
            <Layout><RollCall /></Layout>
          </RoleRoute>
        } 
      />
      
      <Route 
        path="/messages" 
        element={
          <RoleRoute allowedRoles={['admin', 'instructor', 'student', 'parent']}>
            <Layout><Messages /></Layout>
          </RoleRoute>
        } 
      />
      
      <Route 
        path="/locations" 
        element={
          <RoleRoute allowedRoles={['admin', 'instructor', 'student']}>
            <Layout><Locations /></Layout>
          </RoleRoute>
        } 
      />
      
      <Route 
        path="/events" 
        element={
          <RoleRoute allowedRoles={['admin', 'instructor', 'student', 'parent']}>
            <Layout><Events /></Layout>
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
