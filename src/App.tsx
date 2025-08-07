import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";

// Pages
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import RollCall from "./pages/RollCall";
import Messages from "./pages/Messages";
import Locations from "./pages/Locations";
import Events from "./pages/Events";
import NotFound from "./pages/NotFound";

// Layout
import { Layout } from "./components/Layout";

const queryClient = new QueryClient();

const App = () => {
  // Simple authentication state for demo purposes
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Login Route */}
            <Route 
              path="/login" 
              element={
                !isAuthenticated ? <Login /> : <Navigate to="/" replace />
              } 
            />
            
            {/* Protected Routes with Layout */}
            {isAuthenticated ? (
              <Route path="/" element={<Layout><Dashboard /></Layout>} />
            ) : (
              <Route path="/" element={<Navigate to="/login" replace />} />
            )}
            
            {isAuthenticated && (
              <>
                <Route path="/roll-call" element={<Layout><RollCall /></Layout>} />
                <Route path="/messages" element={<Layout><Messages /></Layout>} />
                <Route path="/locations" element={<Layout><Locations /></Layout>} />
                <Route path="/events" element={<Layout><Events /></Layout>} />
              </>
            )}
            
            {/* 404 Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
