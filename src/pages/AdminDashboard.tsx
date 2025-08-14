import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  MapPin,
  Calendar,
  BarChart3,
  Settings,
  FileText,
  Shield,
  AlertCircle,
} from "lucide-react";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [stats] = useState({
    totalUsers: 1247,
    activeStudents: 890,
    instructors: 42,
    parents: 315,
    locations: 28,
    upcomingEvents: 8,
  });

  const quickActions = [
    {
      title: "User Management",
      description: "Add, edit, or remove users",
      icon: Users,
      action: "manage-users",
    },
    {
      title: "Location Setup",
      description: "Configure campus locations",
      icon: MapPin,
      action: "setup-locations",
    },
    {
      title: "Event Management",
      description: "Create and manage events",
      icon: Calendar,
      action: "manage-events",
    },
    {
      title: "System Settings",
      description: "Configure app settings",
      icon: Settings,
      action: "system-settings",
    },
    {
      title: "Analytics",
      description: "View usage and reports",
      icon: BarChart3,
      action: "view-analytics",
    },
    {
      title: "Security Logs",
      description: "Monitor system security",
      icon: Shield,
      action: "security-logs",
    },
  ];

  const handleQuickAction = (action: string) => {
    switch (action) {
      case "manage-users":
        navigate("/admin/user-management");
        break;
      case "setup-locations":
        navigate("/admin/location-setup");
        break;
      case "manage-events":
        navigate("/admin/event-management");
        break;
      case "system-settings":
        navigate("/admin/system-settings");
        break;
      case "view-analytics":
        navigate("/admin/analytics");
        break;
      case "security-logs":
        navigate("/admin/security-logs");
        break;
      default:
        console.log(`Unknown action: ${action}`);
    }
  };

  const recentActivities = [
    {
      time: "2 minutes ago",
      activity: "New instructor registered",
      type: "user",
    },
    {
      time: "15 minutes ago",
      activity: "Location 'Library' updated",
      type: "location",
    },
    { time: "1 hour ago", activity: "System backup completed", type: "system" },
    {
      time: "2 hours ago",
      activity: "Event 'Science Fair' created",
      type: "event",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Admin Dashboard
          </h1>
          <p className="text-muted-foreground">
            Manage users, locations, and system settings
          </p>
        </div>
        <Badge
          variant="outline"
          className="bg-primary/10 text-primary border-primary/20"
        >
          Administrator
        </Badge>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="card-enhanced">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Users
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {stats.totalUsers}
            </div>
            <p className="text-xs text-success">+12% from last month</p>
          </CardContent>
        </Card>

        <Card className="card-enhanced">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Active Students
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {stats.activeStudents}
            </div>
            <p className="text-xs text-success">+8% from last month</p>
          </CardContent>
        </Card>

        <Card className="card-enhanced">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Locations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {stats.locations}
            </div>
            <p className="text-xs text-muted-foreground">Across campus</p>
          </CardContent>
        </Card>

        <Card className="card-enhanced">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Upcoming Events
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {stats.upcomingEvents}
            </div>
            <p className="text-xs text-warning">3 need approval</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Actions */}
        <Card className="card-enhanced">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Quick Actions
            </CardTitle>
            <CardDescription>Common administrative tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-3">
              {quickActions.map((action, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="justify-start h-auto p-4 hover:bg-primary/5"
                  onClick={() => handleQuickAction(action.action)}
                >
                  <action.icon className="h-4 w-4 mr-3" />
                  <div className="text-left">
                    <div className="font-medium">{action.title}</div>
                    <div className="text-sm text-muted-foreground">
                      {action.description}
                    </div>
                  </div>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activities */}
        <Card className="card-enhanced">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Recent Activities
            </CardTitle>
            <CardDescription>
              Latest system activities and changes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-2 rounded-lg hover:bg-muted/50"
                >
                  <AlertCircle className="h-4 w-4 mt-1 text-primary" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{activity.activity}</p>
                    <p className="text-xs text-muted-foreground">
                      {activity.time}
                    </p>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {activity.type}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
