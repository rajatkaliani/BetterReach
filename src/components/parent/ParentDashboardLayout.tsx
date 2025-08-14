import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import {
  LayoutDashboard,
  MapPin,
  ClipboardCheck,
  MessageCircle,
  Calendar,
  Bell,
  Search,
  User,
  Menu,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

interface ParentDashboardLayoutProps {
  children: React.ReactNode;
}

const navigationItems = [
  { title: "Dashboard", url: "/parent/dashboard", icon: LayoutDashboard },
  { title: "Child Locations", url: "/parent/child-locations", icon: MapPin },
  {
    title: "Request Leave",
    url: "/parent/request-leave",
    icon: ClipboardCheck,
  },
  { title: "Messages", url: "/parent/messages", icon: MessageCircle },
  { title: "Events", url: "/parent/events", icon: Calendar },
];

export function ParentDashboardLayout({
  children,
}: ParentDashboardLayoutProps) {
  const location = useLocation();
  const { user } = useAuth();
  const currentPath = location.pathname;

  const isActive = (path: string) => {
    if (path === "/parent/dashboard" && currentPath === "/parent/dashboard")
      return true;
    if (path !== "/parent/dashboard" && currentPath.startsWith(path))
      return true;
    return false;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Top Bar */}
      <div className="border-b bg-card">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-semibold">Parent Portal</h1>
            <Badge
              variant="outline"
              className="bg-purple-50 text-purple-700 border-purple-200"
            >
              <Users className="h-3 w-3 mr-1" />
              Parent
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
                3
              </Badge>
            </Button>

            {/* User Avatar */}
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 bg-primary rounded-full flex items-center justify-center">
                <User className="h-4 w-4 text-primary-foreground" />
              </div>
              <div className="hidden md:block">
                <p className="text-sm font-medium">
                  {user?.username || "Parent"}
                </p>
                <p className="text-xs text-muted-foreground">Parent</p>
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
