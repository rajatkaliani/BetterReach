import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import {
  LayoutDashboard,
  Calendar,
  ClipboardCheck,
  MessageCircle,
  Heart,
  Bell,
  Search,
  User,
  Menu,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

interface StudentDashboardLayoutProps {
  children: React.ReactNode;
}

const navigationItems = [
  { title: "Dashboard", url: "/student/dashboard", icon: LayoutDashboard },
  { title: "Schedule", url: "/student/schedule", icon: Calendar },
  {
    title: "Leave Requests",
    url: "/student/leave-requests",
    icon: ClipboardCheck,
  },
  { title: "Messages", url: "/student/messages", icon: MessageCircle },
  { title: "Wellness", url: "/student/wellness", icon: Heart },
];

export function StudentDashboardLayout({
  children,
}: StudentDashboardLayoutProps) {
  const location = useLocation();
  const { user } = useAuth();
  const currentPath = location.pathname;

  const isActive = (path: string) => {
    if (path === "/student/dashboard" && currentPath === "/student/dashboard")
      return true;
    if (path !== "/student/dashboard" && currentPath.startsWith(path))
      return true;
    return false;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Top Bar */}
      <div className="border-b bg-card">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-semibold">Student Portal</h1>
            <Badge
              variant="outline"
              className="bg-green-50 text-green-700 border-green-200"
            >
              Student
            </Badge>
          </div>

          <div className="flex items-center gap-4">
            {/* Search */}
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search..." className="pl-10 w-64" />
            </div>

            {/* Notifications */}
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="h-5 w-5" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs">
                2
              </Badge>
            </Button>

            {/* User Avatar */}
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 bg-primary rounded-full flex items-center justify-center">
                <User className="h-4 w-4 text-primary-foreground" />
              </div>
              <div className="hidden md:block">
                <p className="text-sm font-medium">
                  {user?.username || "Student"}
                </p>
                <p className="text-xs text-muted-foreground">Student</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar Navigation */}
        <div className="w-64 bg-card border-r min-h-screen hidden md:block">
          <div className="p-6">
            <h2 className="text-lg font-semibold mb-4">Navigation</h2>
            <nav className="space-y-2">
              {navigationItems.map((item) => (
                <NavLink
                  key={item.title}
                  to={item.url}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                    isActive(item.url)
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-muted"
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  <span className="font-medium">{item.title}</span>
                </NavLink>
              ))}
            </nav>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden fixed top-4 left-4 z-50">
          <Button variant="outline" size="sm">
            <Menu className="h-4 w-4" />
          </Button>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6 md:ml-0">{children}</div>
      </div>
    </div>
  );
}
