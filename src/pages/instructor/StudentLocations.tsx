import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { StudentListItem } from "@/components/instructor/StudentListItem";
import {
  MapPin,
  Users,
  Search,
  Building2,
  Home,
  BookOpen,
  Utensils,
  Dumbbell,
} from "lucide-react";

interface Student {
  id: string;
  name: string;
  currentLocation: string;
  status: "present" | "absent" | "late" | "unknown";
}

const mockStudents: Student[] = [
  {
    id: "1",
    name: "Alice Johnson",
    currentLocation: "Dorm A",
    status: "present",
  },
  {
    id: "2",
    name: "Bob Smith",
    currentLocation: "Classroom 101",
    status: "present",
  },
  {
    id: "3",
    name: "Carol Davis",
    currentLocation: "Dining Hall",
    status: "present",
  },
  {
    id: "4",
    name: "David Wilson",
    currentLocation: "Gymnasium",
    status: "late",
  },
  {
    id: "5",
    name: "Emma Brown",
    currentLocation: "Library",
    status: "present",
  },
  {
    id: "6",
    name: "Frank Miller",
    currentLocation: "Science Lab",
    status: "present",
  },
  { id: "7", name: "Grace Lee", currentLocation: "Dorm A", status: "absent" },
  {
    id: "8",
    name: "Henry Taylor",
    currentLocation: "Classroom 101",
    status: "present",
  },
  {
    id: "9",
    name: "Ivy Chen",
    currentLocation: "Dining Hall",
    status: "present",
  },
  {
    id: "10",
    name: "Jack Anderson",
    currentLocation: "Gymnasium",
    status: "present",
  },
  {
    id: "11",
    name: "Kate Wilson",
    currentLocation: "Library",
    status: "present",
  },
  {
    id: "12",
    name: "Liam O'Connor",
    currentLocation: "Science Lab",
    status: "late",
  },
  {
    id: "13",
    name: "Mia Rodriguez",
    currentLocation: "Dorm A",
    status: "present",
  },
  {
    id: "14",
    name: "Noah Thompson",
    currentLocation: "Classroom 101",
    status: "present",
  },
  {
    id: "15",
    name: "Olivia Garcia",
    currentLocation: "Dining Hall",
    status: "present",
  },
  {
    id: "16",
    name: "Paul Martinez",
    currentLocation: "Gymnasium",
    status: "absent",
  },
  {
    id: "17",
    name: "Quinn Johnson",
    currentLocation: "Library",
    status: "present",
  },
  {
    id: "18",
    name: "Rachel Davis",
    currentLocation: "Science Lab",
    status: "present",
  },
  {
    id: "19",
    name: "Sam Wilson",
    currentLocation: "Dorm A",
    status: "present",
  },
  {
    id: "20",
    name: "Tina Brown",
    currentLocation: "Classroom 101",
    status: "late",
  },
];

const locations = [
  { name: "Dorm A", icon: Home, color: "bg-blue-500", count: 0 },
  { name: "Classroom 101", icon: Building2, color: "bg-green-500", count: 0 },
  { name: "Dining Hall", icon: Utensils, color: "bg-orange-500", count: 0 },
  { name: "Gymnasium", icon: Dumbbell, color: "bg-red-500", count: 0 },
  { name: "Library", icon: BookOpen, color: "bg-purple-500", count: 0 },
  { name: "Science Lab", icon: Building2, color: "bg-yellow-500", count: 0 },
];

export default function StudentLocations() {
  const [searchQuery, setSearchQuery] = useState("");
  const [students] = useState<Student[]>(mockStudents);

  // Calculate location counts
  const locationStats = locations.map((location) => ({
    ...location,
    count: students.filter(
      (student) => student.currentLocation === location.name
    ).length,
  }));

  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.currentLocation.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalStudents = students.length;
  const presentStudents = students.filter((s) => s.status === "present").length;
  const absentStudents = students.filter((s) => s.status === "absent").length;
  const lateStudents = students.filter((s) => s.status === "late").length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">
          Student Location Overview
        </h1>
        <p className="text-muted-foreground">
          View where students currently are across campus
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="card-enhanced">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                <Users className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{totalStudents}</p>
                <p className="text-sm text-muted-foreground">Total Students</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-enhanced">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center">
                <MapPin className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-green-600">
                  {presentStudents}
                </p>
                <p className="text-sm text-muted-foreground">Present</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-enhanced">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-yellow-100 rounded-full flex items-center justify-center">
                <MapPin className="h-5 w-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-yellow-600">
                  {lateStudents}
                </p>
                <p className="text-sm text-muted-foreground">Late</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-enhanced">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-red-100 rounded-full flex items-center justify-center">
                <MapPin className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-red-600">
                  {absentStudents}
                </p>
                <p className="text-sm text-muted-foreground">Absent</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Heatmap */}
        <Card className="card-enhanced">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Location Heatmap
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              {locationStats.map((location) => (
                <div key={location.name} className="text-center">
                  <div
                    className={`h-16 w-16 mx-auto rounded-lg flex items-center justify-center mb-2 ${
                      location.count > 0 ? location.color : "bg-gray-200"
                    }`}
                  >
                    <location.icon className="h-6 w-6 text-white" />
                  </div>
                  <p className="text-sm font-medium">{location.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {location.count} students
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Pie Chart */}
        <Card className="card-enhanced">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Students per Location
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {locationStats.map((location) => {
                const percentage =
                  totalStudents > 0
                    ? (location.count / totalStudents) * 100
                    : 0;
                return (
                  <div
                    key={location.name}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-3 h-3 rounded-full ${location.color}`}
                      />
                      <span className="text-sm font-medium">
                        {location.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${location.color}`}
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <span className="text-sm text-muted-foreground w-8 text-right">
                        {location.count}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Student List */}
      <Card className="card-enhanced">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Student Locations
            <Badge variant="outline" className="ml-2">
              {filteredStudents.length} Students
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search students or locations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="space-y-3">
            {filteredStudents.map((student) => (
              <StudentListItem
                key={student.id}
                student={student}
                showLocation={true}
              />
            ))}
          </div>

          {filteredStudents.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No students found matching your search</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
