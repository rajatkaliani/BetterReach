import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  Clock,
  MapPin,
  BookOpen,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface ScheduleEvent {
  id: string;
  title: string;
  time: string;
  startTime: string;
  endTime: string;
  description: string;
  type: "class" | "break" | "study" | "lunch";
}

export default function Schedule() {
  const [currentDay, setCurrentDay] = useState("Today");

  // Simulate current time (9:30 AM)
  const currentTime = "09:30";

  const todaySchedule: ScheduleEvent[] = [
    {
      id: "1",
      title: "Math",
      time: "8:00–9:00",
      startTime: "08:00",
      endTime: "09:00",
      description: "Algebra I in Room 203",
      type: "class",
    },
    {
      id: "2",
      title: "Break",
      time: "9:00–9:15",
      startTime: "09:00",
      endTime: "09:15",
      description: "Short break",
      type: "break",
    },
    {
      id: "3",
      title: "English",
      time: "9:15–10:15",
      startTime: "09:15",
      endTime: "10:15",
      description: "Essay Workshop",
      type: "class",
    },
    {
      id: "4",
      title: "Lunch",
      time: "10:15–11:00",
      startTime: "10:15",
      endTime: "11:00",
      description: "Lunch break",
      type: "lunch",
    },
    {
      id: "5",
      title: "Science",
      time: "11:00–12:00",
      startTime: "11:00",
      endTime: "12:00",
      description: "Biology Lab in Room 105",
      type: "class",
    },
    {
      id: "6",
      title: "Study Hall",
      time: "12:00–1:00",
      startTime: "12:00",
      endTime: "13:00",
      description: "Independent study time",
      type: "study",
    },
    {
      id: "7",
      title: "History",
      time: "1:00–2:00",
      startTime: "13:00",
      endTime: "14:00",
      description: "World History in Room 301",
      type: "class",
    },
  ];

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case "class":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "break":
        return "bg-gray-100 text-gray-800 border-gray-200";
      case "lunch":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "study":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const isCurrentEvent = (event: ScheduleEvent) => {
    return currentTime >= event.startTime && currentTime < event.endTime;
  };

  const isPastEvent = (event: ScheduleEvent) => {
    return currentTime >= event.endTime;
  };

  const isFutureEvent = (event: ScheduleEvent) => {
    return currentTime < event.startTime;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">My Schedule</h1>
          <p className="text-muted-foreground">
            View your class schedule and upcoming activities
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Badge variant="outline">{currentDay}</Badge>
          <Button variant="outline" size="sm">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Timeline View */}
      <Card className="card-enhanced">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Today's Schedule
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            {/* Current Time Indicator */}
            <div
              className="absolute left-0 right-0 h-0.5 bg-red-500 z-10"
              style={{ top: "50%", transform: "translateY(-50%)" }}
            >
              <div className="absolute -top-1 -left-1 w-3 h-3 bg-red-500 rounded-full"></div>
            </div>

            <div className="space-y-4">
              {todaySchedule.map((event, index) => (
                <div
                  key={event.id}
                  className={`relative flex items-center gap-4 p-4 rounded-lg border transition-all ${
                    isCurrentEvent(event)
                      ? "border-red-500 bg-red-50 shadow-md"
                      : isPastEvent(event)
                      ? "border-gray-200 bg-gray-50 opacity-75"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  {/* Time Column */}
                  <div className="w-20 text-sm font-medium text-muted-foreground">
                    {event.time}
                  </div>

                  {/* Event Content */}
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium">{event.title}</h3>
                      <Badge className={getEventTypeColor(event.type)}>
                        {event.type.charAt(0).toUpperCase() +
                          event.type.slice(1)}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {event.description}
                    </p>
                  </div>

                  {/* Status Indicator */}
                  <div className="flex items-center gap-2">
                    {isCurrentEvent(event) && (
                      <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                    )}
                    {isPastEvent(event) && (
                      <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                    )}
                    {isFutureEvent(event) && (
                      <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Current Time Display */}
      <Card className="card-enhanced">
        <CardContent className="p-4">
          <div className="flex items-center justify-center gap-2">
            <Clock className="h-5 w-5 text-primary" />
            <span className="text-lg font-medium">
              Current Time: {currentTime}
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
