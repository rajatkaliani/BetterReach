import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, Clock, MapPin, User } from "lucide-react";

interface Student {
  id: string;
  name: string;
  currentLocation?: string;
  status?: "present" | "absent" | "late" | "unknown";
  comment?: string;
}

interface StudentListItemProps {
  student: Student;
  onAttendanceChange?: (
    studentId: string,
    status: "present" | "absent" | "late"
  ) => void;
  showAttendanceActions?: boolean;
  showLocation?: boolean;
}

export function StudentListItem({
  student,
  onAttendanceChange,
  showAttendanceActions = false,
  showLocation = false,
}: StudentListItemProps) {
  const getStatusColor = (status?: string) => {
    switch (status) {
      case "present":
        return "bg-green-100 text-green-800 border-green-200";
      case "absent":
        return "bg-red-100 text-red-800 border-red-200";
      case "late":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusIcon = (status?: string) => {
    switch (status) {
      case "present":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "absent":
        return <XCircle className="h-4 w-4 text-red-600" />;
      case "late":
        return <Clock className="h-4 w-4 text-yellow-600" />;
      default:
        return <User className="h-4 w-4 text-gray-600" />;
    }
  };

  return (
    <Card className="card-enhanced">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center">
              <User className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-medium">{student.name}</h3>
              {showLocation && student.currentLocation && (
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <MapPin className="h-3 w-3" />
                  {student.currentLocation}
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            {showAttendanceActions ? (
              <>
                <Button
                  size="sm"
                  variant={student.status === "present" ? "default" : "outline"}
                  className="h-8 w-8 p-0"
                  onClick={() => onAttendanceChange?.(student.id, "present")}
                >
                  <CheckCircle className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant={student.status === "late" ? "default" : "outline"}
                  className="h-8 w-8 p-0 bg-yellow-500 hover:bg-yellow-600"
                  onClick={() => onAttendanceChange?.(student.id, "late")}
                >
                  <Clock className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant={student.status === "absent" ? "default" : "outline"}
                  className="h-8 w-8 p-0 bg-red-500 hover:bg-red-600"
                  onClick={() => onAttendanceChange?.(student.id, "absent")}
                >
                  <XCircle className="h-4 w-4" />
                </Button>
              </>
            ) : (
              <Badge className={getStatusColor(student.status)}>
                <div className="flex items-center gap-1">
                  {getStatusIcon(student.status)}
                  <span className="capitalize">
                    {student.status || "Unknown"}
                  </span>
                </div>
              </Badge>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
