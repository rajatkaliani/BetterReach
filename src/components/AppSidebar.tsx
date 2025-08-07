import { useState } from "react"
import { 
  LayoutDashboard, 
  ClipboardCheck, 
  MessageCircle, 
  MapPin, 
  Calendar,
  GraduationCap
} from "lucide-react"
import { NavLink, useLocation } from "react-router-dom"

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
} from "@/components/ui/sidebar"

const navigationItems = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Roll Call", url: "/roll-call", icon: ClipboardCheck },
  { title: "Messages", url: "/messages", icon: MessageCircle },
  { title: "Locations", url: "/locations", icon: MapPin },
  { title: "Events", url: "/events", icon: Calendar },
]

export function AppSidebar() {
  const { state } = useSidebar()
  const location = useLocation()
  const currentPath = location.pathname

  const isActive = (path: string) => {
    if (path === "/" && currentPath === "/") return true
    if (path !== "/" && currentPath.startsWith(path)) return true
    return false
  }

  const getNavClassName = (path: string) => {
    const baseClasses = "w-full justify-start transition-all duration-200"
    return isActive(path) 
      ? `${baseClasses} bg-sidebar-accent text-sidebar-accent-foreground font-medium` 
      : `${baseClasses} hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground`
  }

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
                <h2 className="text-lg font-bold text-sidebar-foreground">Student Life</h2>
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
  )
}