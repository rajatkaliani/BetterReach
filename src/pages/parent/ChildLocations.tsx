import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  MapPin,
  Clock,
  Users,
  CheckCircle,
  AlertCircle,
  Building2,
  Home,
  BookOpen,
  Utensils,
} from "lucide-react";

interface LocationEntry {
  id: string;
  time: string;
  location: string;
  type: "class" | "break" | "lunch" | "dorm" | "other";
  notes?: string;
}

interface ChildData {
  id: string;
  name: string;
  grade: string;
  currentLocation: string;
  attendanceStatus: string;
  history: LocationEntry[];
}

export default function ChildLocations() {
  const [selectedChild, setSelectedChild] = useState<string>("1");

  const children: ChildData[] = [
    {
      id: "1",
      name: "Jamie Doe",
      grade: "10th Grade",
      currentLocation: "Dorm A",
      attendanceStatus: "Present All Day",
      history: [
        {
          id: "1",
          time: "8:00 AM",
          location: "Math - Room 101",
          type: "class",
          notes: "Algebra I with Mr. Smith",
        },
        {
          id: "2",
          time: "9:15 AM",
          location: "Cafeteria",
          type: "break",
          notes: "Morning break",
        },
        {
          id: "3",
          time: "9:30 AM",
          location: "English - Room 203",
          type: "class",
          notes: "Literature with Ms. Johnson",
        },
        {
          id: "4",
          time: "11:00 AM",
          location: "Cafeteria",
          type: "lunch",
          notes: "Lunch period",
        },
        {
          id: "5",
          time: "12:00 PM",
          location: "Science Lab - Room 105",
          type: "class",
          notes: "Biology lab experiment",
        },
        {
          id: "6",
          time: "2:00 PM",
          location: "Library",
          type: "other",
          notes: "Study period",
        },
        {
          id: "7",
          time: "3:30 PM",
          location: "Dorm A",
          type: "dorm",
          notes: "Returned to dorm",
        },
      ],
    },
    {
      id: "2",
      name: "Alex Doe",
      grade: "8th Grade",
      currentLocation: "Classroom 205",
      attendanceStatus: "Present All Day",
      history: [
        {
          id: "1",
          time: "8:00 AM",
          location: "Math - Room 102",
          type: "class",
          notes: "Pre-Algebra with Mrs. Davis",
        },
        {
          id: "2",
          time: "9:15 AM",
          location: "Playground",
          type: "break",
          notes: "Recess",
        },
        {
          id: "3",
          time: "9:45 AM",
          location: "Science - Room 104",
          type: "class",
          notes: "General Science",
        },
        {
          id: "4",
          time: "11:00 AM",
          location: "Cafeteria",
          type: "lunch",
          notes: "Lunch period",
        },
        {
          id: "5",
          time: "12:00 PM",
          location: "Classroom 205",
          type: "class",
          notes: "History with Mr. Wilson",
        },
      ],
    },
  ];

  const selectedChildData = children.find(
    (child) => child.id === selectedChild
  );

  const getLocationTypeIcon = (type: string) => {
    switch (type) {
      case "class":
        return <BookOpen className="h-4 w-4" />;
      case "break":
        return <Clock className="h-4 w-4" />;
      case "lunch":
        return <Utensils className="h-4 w-4" />;
      case "dorm":
        return <Home className="h-4 w-4" />;
      default:
        return <Building2 className="h-4 w-4" />;
    }
  };

  const getLocationTypeColor = (type: string) => {
    switch (type) {
      case "class":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "break":
        return "bg-gray-100 text-gray-800 border-gray-200";
      case "lunch":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "dorm":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-purple-100 text-purple-800 border-purple-200";
    }
  };

  const getAttendanceStatusColor = (status: string) => {
    if (status.includes("Present All Day")) {
      return "bg-green-100 text-green-800 border-green-200";
    } else if (status.includes("Missed")) {
      return "bg-red-100 text-red-800 border-red-200";
    } else {
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Child Location Overview
          </h1>
          <p className="text-muted-foreground">
            Track your child's real-time and historical location
          </p>
        </div>
        <Badge className="bg-green-100 text-green-800 border-green-200">
          <CheckCircle className="h-3 w-3 mr-1" />
          Live Tracking
        </Badge>
      </div>

      {/* Child Selection */}
      <Card className="card-enhanced">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Select Child
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Select value={selectedChild} onValueChange={setSelectedChild}>
            <SelectTrigger className="w-full max-w-md">
              <SelectValue placeholder="Choose a child..." />
            </SelectTrigger>
            <SelectContent>
              {children.map((child) => (
                <SelectItem key={child.id} value={child.id}>
                  {child.name} - {child.grade}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {selectedChildData && (
        <>
          {/* Current Location */}
          <Card className="card-enhanced border-green-200 bg-green-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-green-600" />
                Current Location
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
                    <MapPin className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">
                      {selectedChildData.currentLocation}
                    </h3>
                    <p className="text-muted-foreground">
                      {selectedChildData.name} - {selectedChildData.grade}
                    </p>
                  </div>
                </div>
                <Badge
                  className={getAttendanceStatusColor(
                    selectedChildData.attendanceStatus
                  )}
                >
                  {selectedChildData.attendanceStatus}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Location History */}
          <Card className="card-enhanced">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Today's Location History
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {selectedChildData.history.map((entry) => (
                  <div
                    key={entry.id}
                    className="flex items-center justify-between p-4 rounded-lg border border-border/50"
                  >
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center">
                        {getLocationTypeIcon(entry.type)}
                      </div>
                      <div>
                        <h3 className="font-medium">{entry.location}</h3>
                        <p className="text-sm text-muted-foreground">
                          {entry.notes}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{entry.time}</p>
                      <Badge className={getLocationTypeColor(entry.type)}>
                        {entry.type.charAt(0).toUpperCase() +
                          entry.type.slice(1)}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Attendance Summary */}
          <Card className="card-enhanced">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5" />
                Attendance Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 rounded-lg border border-border/50">
                  <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                  <p className="font-medium">Present</p>
                  <p className="text-2xl font-bold text-green-600">100%</p>
                </div>
                <div className="text-center p-4 rounded-lg border border-border/50">
                  <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Clock className="h-6 w-6 text-blue-600" />
                  </div>
                  <p className="font-medium">Classes Attended</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {
                      selectedChildData.history.filter(
                        (h) => h.type === "class"
                      ).length
                    }
                  </p>
                </div>
                <div className="text-center p-4 rounded-lg border border-border/50">
                  <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <MapPin className="h-6 w-6 text-purple-600" />
                  </div>
                  <p className="font-medium">Locations Today</p>
                  <p className="text-2xl font-bold text-purple-600">
                    {selectedChildData.history.length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
