import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  User,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Shield,
} from "lucide-react";

interface LeaveRequest {
  id: string;
  studentName: string;
  type: "weekend" | "medical" | "personal" | "emergency";
  submittedBy: "student" | "parent";
  date: string;
  time: string;
  reason: string;
  status: "pending" | "approved" | "denied";
  hasSelfCheckout?: boolean;
}

interface LeaveRequestCardProps {
  request: LeaveRequest;
  onApprove?: (id: string) => void;
  onDeny?: (id: string) => void;
}

export function LeaveRequestCard({
  request,
  onApprove,
  onDeny,
}: LeaveRequestCardProps) {
  const getTypeColor = (type: string) => {
    switch (type) {
      case "weekend":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "medical":
        return "bg-red-100 text-red-800 border-red-200";
      case "personal":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "emergency":
        return "bg-orange-100 text-orange-800 border-orange-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800 border-green-200";
      case "denied":
        return "bg-red-100 text-red-800 border-red-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "weekend":
        return "🏠";
      case "medical":
        return "🏥";
      case "personal":
        return "👤";
      case "emergency":
        return "🚨";
      default:
        return "📝";
    }
  };

  return (
    <Card className="card-enhanced">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <User className="h-5 w-5" />
            {request.studentName}
          </CardTitle>
          <div className="flex items-center gap-2">
            <Badge className={getTypeColor(request.type)}>
              <span className="mr-1">{getTypeIcon(request.type)}</span>
              {request.type.charAt(0).toUpperCase() + request.type.slice(1)}
            </Badge>
            <Badge className={getStatusColor(request.status)}>
              {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
            </Badge>
            {request.hasSelfCheckout && (
              <Badge className="bg-purple-100 text-purple-800 border-purple-200">
                <Shield className="h-3 w-3 mr-1" />
                Self-Checkout
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{request.date}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{request.time}</span>
          </div>
        </div>

        <div>
          <p className="text-sm font-medium mb-1">Reason:</p>
          <p className="text-sm text-muted-foreground">{request.reason}</p>
        </div>

        <div className="flex items-center gap-2">
          <AlertCircle className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">
            Submitted by:{" "}
            {request.submittedBy.charAt(0).toUpperCase() +
              request.submittedBy.slice(1)}
          </span>
        </div>

        {request.status === "pending" && (
          <div className="flex gap-2 pt-2">
            <Button
              size="sm"
              onClick={() => onApprove?.(request.id)}
              className="flex-1"
            >
              <CheckCircle className="h-4 w-4 mr-2" />
              Approve
            </Button>
            <Button
              size="sm"
              variant="destructive"
              onClick={() => onDeny?.(request.id)}
              className="flex-1"
            >
              <XCircle className="h-4 w-4 mr-2" />
              Deny
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
