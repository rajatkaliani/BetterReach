import { useState } from "react";
import {
  LayoutDashboard,
  ClipboardCheck,
  MessageCircle,
  MapPin,
  Calendar,
  GraduationCap,
  Users,
  Settings,
  BarChart3,
  UserCheck,
  Heart,
  Shield,
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { useAuth, Role } from "@/context/AuthContext";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const getRoleNavigation = (role: Role) => {
  switch (role) {
    case "admin":
      return [
        { title: "Dashboard", url: "/", icon: LayoutDashboard },
        { title: "Messages", url: "/messages", icon: MessageCircle },
        {
          title: "User Management",
          url: "/admin/user-management",
          icon: Users,
        },
        { title: "Locations", url: "/admin/location-setup", icon: MapPin },
        { title: "Events", url: "/admin/event-management", icon: Calendar },
        { title: "Analytics", url: "/admin/analytics", icon: BarChart3 },
        { title: "Security Logs", url: "/admin/security-logs", icon: Shield },
        { title: "Settings", url: "/admin/system-settings", icon: Settings },
      ];
    case "instructor":
      return [
        { title: "Dashboard", url: "/", icon: LayoutDashboard },
        { title: "Messages", url: "/instructor/messages", icon: MessageCircle },
        {
          title: "Start Roll Call",
          url: "/instructor/roll-call",
          icon: ClipboardCheck,
        },
        {
          title: "Student Locations",
          url: "/instructor/student-locations",
          icon: MapPin,
        },

        {
          title: "Leave Requests",
          url: "/instructor/leave-requests",
          icon: UserCheck,
        },
      ];
    case "student":
      return [
        {
          title: "Dashboard",
          url: "/student/dashboard",
          icon: LayoutDashboard,
        },
        { title: "Messages", url: "/student/messages", icon: MessageCircle },
        { title: "Schedule", url: "/student/schedule", icon: Calendar },
        {
          title: "Leave Requests",
          url: "/student/leave-requests",
          icon: ClipboardCheck,
        },

        { title: "Wellness", url: "/student/wellness", icon: Heart },
      ];
    case "parent":
      return [
        { title: "Dashboard", url: "/parent/dashboard", icon: LayoutDashboard },
        { title: "Messages", url: "/parent/messages", icon: MessageCircle },
        {
          title: "Child Locations",
          url: "/parent/child-locations",
          icon: MapPin,
        },
        {
          title: "Request Leave",
          url: "/parent/request-leave",
          icon: ClipboardCheck,
        },
        { title: "Events", url: "/parent/events", icon: Calendar },
      ];
    default:
      return [
        { title: "Dashboard", url: "/", icon: LayoutDashboard },
        { title: "Messages", url: "/messages", icon: MessageCircle },
      ];
  }
};

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  const { user } = useAuth();

  const navigationItems = getRoleNavigation(user?.role || "student");

  const isActive = (path: string) => {
    if (path === "/" && currentPath === "/") return true;
    if (path !== "/" && currentPath.startsWith(path)) return true;
    return false;
  };

  const getNavClassName = (path: string) => {
    const baseClasses = "w-full justify-start transition-all duration-200";
    return isActive(path)
      ? `${baseClasses} bg-sidebar-accent text-sidebar-accent-foreground font-medium`
      : `${baseClasses} hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground`;
  };

  return (
    <Sidebar className="border-r border-sidebar-border">
      <SidebarContent>
        {/* Logo Section */}
        <div className="p-6 border-b border-sidebar-border">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 bg-sidebar-primary rounded-lg flex items-center justify-center">
              <GraduationCap className="h-5 w-5 text-sidebar-primary-foreground" />
            </div>
            {state !== "collapsed" && (
              <div>
                <h2 className="text-lg font-bold text-sidebar-foreground">
                  Student Life
                </h2>
                <p className="text-xs text-sidebar-foreground/60">Manager</p>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      className={getNavClassName(item.url)}
                    >
                      <item.icon className="h-5 w-5" />
                      {state !== "collapsed" && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
