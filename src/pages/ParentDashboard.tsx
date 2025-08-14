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
  MapPin,
  MessageCircle,
  Clock,
  Calendar,
  Users,
  Bell,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { ParentQuickActionsCard } from "@/components/parent/ParentQuickActionsCard";

export default function ParentDashboard() {
  const navigate = useNavigate();

  const children = [
    { id: "1", name: "Jamie Doe", grade: "10th Grade", status: "Present" },
    { id: "2", name: "Alex Doe", grade: "8th Grade", status: "Present" },
  ];

  const recentMessages = [
    {
      id: "1",
      from: "Principal Johnson",
      subject: "Parent-Teacher Conference",
      time: "2 hours ago",
      read: false,
    },
    {
      id: "2",
      from: "Math Teacher",
      subject: "Progress Report Available",
      time: "1 day ago",
      read: true,
    },
    {
      id: "3",
      from: "School Nurse",
      subject: "Health Check Reminder",
      time: "2 days ago",
      read: true,
    },
  ];

  const upcomingEvents = [
    {
      id: "1",
      title: "Parent-Teacher Conference",
      date: "March 20, 2024",
      time: "3:00 PM",
      location: "Main Hall",
    },
    {
      id: "2",
      title: "Spring Sports Day",
      date: "March 25, 2024",
      time: "10:00 AM",
      location: "School Grounds",
    },
    {
      id: "3",
      title: "Science Fair",
      date: "April 5, 2024",
      time: "2:00 PM",
      location: "Gymnasium",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Parent Dashboard
          </h1>
          <p className="text-muted-foreground">
            Welcome back! Here's your family overview
          </p>
        </div>
        <Badge
          variant="outline"
          className="bg-purple-50 text-purple-700 border-purple-200"
        >
          <Users className="h-3 w-3 mr-1" />
          Parent
        </Badge>
      </div>

      {/* Children Overview */}
      <Card className="card-enhanced">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Your Children
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {children.map((child) => (
              <div
                key={child.id}
                className="flex items-center justify-between p-4 rounded-lg border border-border/50"
              >
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">{child.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {child.grade}
                    </p>
                  </div>
                </div>
                <Badge className="bg-green-100 text-green-800 border-green-200">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  {child.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <ParentQuickActionsCard />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Messages */}
        <Card className="card-enhanced">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5" />
              Recent Messages
            </CardTitle>
            <CardDescription>Latest communications from school</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentMessages.map((message) => (
                <div
                  key={message.id}
                  className="flex items-center justify-between p-3 rounded-lg border border-border/50"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <MessageCircle className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">{message.subject}</h4>
                      <p className="text-sm text-muted-foreground">
                        From: {message.from}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">
                      {message.time}
                    </p>
                    {!message.read && (
                      <Badge className="mt-1 bg-blue-500 text-white">New</Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <Button
              variant="outline"
              className="w-full mt-4"
              onClick={() => navigate("/parent/messages")}
            >
              View All Messages
            </Button>
          </CardContent>
        </Card>

        {/* Upcoming Events */}
        <Card className="card-enhanced">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Upcoming Events
            </CardTitle>
            <CardDescription>School events and activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingEvents.map((event) => (
                <div
                  key={event.id}
                  className="flex items-center justify-between p-3 rounded-lg border border-border/50"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <Calendar className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">{event.title}</h4>
                      <p className="text-sm text-muted-foreground">
                        {event.date} at {event.time}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">
                      {event.location}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <Button
              variant="outline"
              className="w-full mt-4"
              onClick={() => navigate("/parent/events")}
            >
              View All Events
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
