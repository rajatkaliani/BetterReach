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
  Calendar,
  MessageCircle,
  Clock,
  Heart,
  BookOpen,
  CheckCircle,
  AlertCircle,
  Users,
  Bell,
} from "lucide-react";
import { QuickActionsCard } from "@/components/student/QuickActionsCard";

export default function StudentDashboard() {
  const navigate = useNavigate();

  const todaySchedule = [
    {
      time: "9:00 AM",
      class: "Biology 101",
      room: "Science Building 204",
      status: "completed",
    },
    {
      time: "11:00 AM",
      class: "Chemistry Lab",
      room: "Lab Building 102",
      status: "current",
    },
    {
      time: "2:00 PM",
      class: "Physics 201",
      room: "Science Building 301",
      status: "upcoming",
    },
    {
      time: "4:00 PM",
      class: "Study Hall",
      room: "Library",
      status: "upcoming",
    },
  ];

  const recentMessages = [
    {
      from: "Prof. Johnson",
      subject: "Lab Assignment Due",
      time: "2 hours ago",
      read: false,
    },
    {
      from: "Admin Office",
      subject: "Event Registration",
      time: "1 day ago",
      read: true,
    },
    {
      from: "Prof. Smith",
      subject: "Class Cancelled",
      time: "2 days ago",
      read: true,
    },
  ];

  const upcomingEvents = [
    {
      name: "Science Fair",
      date: "Tomorrow",
      time: "10:00 AM",
      location: "Main Hall",
    },
    {
      name: "Career Workshop",
      date: "Friday",
      time: "2:00 PM",
      location: "Conference Room",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Student Dashboard
          </h1>
          <p className="text-muted-foreground">
            Welcome back! Here's your daily overview
          </p>
        </div>
        <Badge
          variant="outline"
          className="bg-success/10 text-success border-success/20"
        >
          Student
        </Badge>
      </div>

      {/* Quick Actions */}
      <QuickActionsCard />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today's Schedule */}
        <Card className="card-enhanced">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Today's Schedule
            </CardTitle>
            <CardDescription>Your classes and activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {todaySchedule.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 rounded-lg border border-border/50"
                >
                  <div className="flex-shrink-0">
                    {item.status === "completed" && (
                      <CheckCircle className="h-4 w-4 text-success" />
                    )}
                    {item.status === "current" && (
                      <Clock className="h-4 w-4 text-warning" />
                    )}
                    {item.status === "upcoming" && (
                      <AlertCircle className="h-4 w-4 text-muted-foreground" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="font-medium">{item.class}</p>
                      <Badge
                        variant={
                          item.status === "current" ? "default" : "outline"
                        }
                        className="text-xs"
                      >
                        {item.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {item.time} • {item.room}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Messages & Events */}
        <div className="space-y-6">
          {/* Recent Messages */}
          <Card className="card-enhanced">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5" />
                Recent Messages
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentMessages.map((message, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50"
                  >
                    <div
                      className={`h-2 w-2 rounded-full ${
                        message.read ? "bg-muted-foreground" : "bg-primary"
                      }`}
                    ></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{message.subject}</p>
                      <p className="text-xs text-muted-foreground">
                        {message.from} • {message.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Events */}
          <Card className="card-enhanced">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Upcoming Events
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {upcomingEvents.map((event, index) => (
                  <div
                    key={index}
                    className="p-3 rounded-lg border border-border/50"
                  >
                    <p className="font-medium">{event.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {event.date} at {event.time}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {event.location}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
