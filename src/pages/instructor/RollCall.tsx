import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { StudentListItem } from "@/components/instructor/StudentListItem";
import {
  ClipboardCheck,
  Save,
  Users,
  CheckCircle,
  XCircle,
  Clock,
  MapPin,
} from "lucide-react";

interface Student {
  id: string;
  name: string;
  currentLocation?: string;
  status?: "present" | "absent" | "late" | "unknown";
  comment?: string;
}

const mockLocations = [
  { id: "1", name: "Dorm A - Floor 1" },
  { id: "2", name: "Classroom 101" },
  { id: "3", name: "Dining Hall" },
  { id: "4", name: "Gymnasium" },
  { id: "5", name: "Library" },
  { id: "6", name: "Science Lab 201" },
];

const mockStudents: Student[] = [
  { id: "1", name: "Alice Johnson", currentLocation: "Dorm A - Floor 1" },
  { id: "2", name: "Bob Smith", currentLocation: "Classroom 101" },
  { id: "3", name: "Carol Davis", currentLocation: "Dining Hall" },
  { id: "4", name: "David Wilson", currentLocation: "Gymnasium" },
  { id: "5", name: "Emma Brown", currentLocation: "Library" },
  { id: "6", name: "Frank Miller", currentLocation: "Science Lab 201" },
  { id: "7", name: "Grace Lee", currentLocation: "Dorm A - Floor 1" },
  { id: "8", name: "Henry Taylor", currentLocation: "Classroom 101" },
  { id: "9", name: "Ivy Chen", currentLocation: "Dining Hall" },
  { id: "10", name: "Jack Anderson", currentLocation: "Gymnasium" },
];

export default function RollCall() {
  const [selectedLocation, setSelectedLocation] = useState<string>("");
  const [students, setStudents] = useState<Student[]>(mockStudents);
  const [isSaving, setIsSaving] = useState(false);

  const handleAttendanceChange = (
    studentId: string,
    status: "present" | "absent" | "late"
  ) => {
    setStudents((prev) =>
      prev.map((student) =>
        student.id === studentId
          ? { ...student, status, currentLocation: selectedLocation }
          : student
      )
    );
  };

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSaving(false);
    alert("Roll call saved successfully!");
  };

  const getAttendanceStats = () => {
    const present = students.filter((s) => s.status === "present").length;
    const absent = students.filter((s) => s.status === "absent").length;
    const late = students.filter((s) => s.status === "late").length;
    const unmarked = students.filter((s) => !s.status).length;

    return { present, absent, late, unmarked };
  };

  const stats = getAttendanceStats();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Start Roll Call
          </h1>
          <p className="text-muted-foreground">
            Mark student attendance for a given location or event
          </p>
        </div>
        <Button onClick={handleSave} disabled={isSaving}>
          <Save className="h-4 w-4 mr-2" />
          {isSaving ? "Saving..." : "Save Roll Call"}
        </Button>
      </div>

      {/* Location Selection */}
      <Card className="card-enhanced">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Select Location
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Select value={selectedLocation} onValueChange={setSelectedLocation}>
            <SelectTrigger className="w-full max-w-md">
              <SelectValue placeholder="Choose a location or event..." />
            </SelectTrigger>
            <SelectContent>
              {mockLocations.map((location) => (
                <SelectItem key={location.id} value={location.id}>
                  {location.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Attendance Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="card-enhanced">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-green-600">
                  {stats.present}
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
                <Clock className="h-5 w-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-yellow-600">
                  {stats.late}
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
                <XCircle className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-red-600">
                  {stats.absent}
                </p>
                <p className="text-sm text-muted-foreground">Absent</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-enhanced">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-gray-100 rounded-full flex items-center justify-center">
                <Users className="h-5 w-5 text-gray-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-600">
                  {stats.unmarked}
                </p>
                <p className="text-sm text-muted-foreground">Unmarked</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Student List */}
      <Card className="card-enhanced">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ClipboardCheck className="h-5 w-5" />
            Student Attendance
            <Badge variant="outline" className="ml-2">
              {students.length} Students
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {selectedLocation ? (
            <div className="space-y-3">
              {students.map((student) => (
                <StudentListItem
                  key={student.id}
                  student={student}
                  onAttendanceChange={handleAttendanceChange}
                  showAttendanceActions={true}
                  showLocation={true}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <MapPin className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Please select a location to start roll call</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
