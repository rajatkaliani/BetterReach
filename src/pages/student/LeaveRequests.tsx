import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Clock,
  Calendar,
  AlertCircle,
  CheckCircle,
  XCircle,
  Shield,
} from "lucide-react";

interface LeaveRequest {
  id: string;
  type: string;
  date: string;
  time: string;
  reason: string;
  status: "pending" | "approved" | "denied";
  submittedAt: string;
}

export default function LeaveRequests() {
  // Simulate self-checkout role
  const hasSelfCheckoutRole = true;

  const [requests, setRequests] = useState<LeaveRequest[]>([
    {
      id: "1",
      type: "Weekend Leave",
      date: "2024-03-16",
      time: "14:00",
      reason: "Family event - sister's graduation",
      status: "pending",
      submittedAt: "2024-03-14",
    },
    {
      id: "2",
      type: "Medical Leave",
      date: "2024-03-15",
      time: "10:00",
      reason: "Doctor appointment",
      status: "approved",
      submittedAt: "2024-03-13",
    },
    {
      id: "3",
      type: "Personal Leave",
      date: "2024-03-20",
      time: "16:00",
      reason: "Family emergency",
      status: "denied",
      submittedAt: "2024-03-12",
    },
  ]);

  const [newRequest, setNewRequest] = useState({
    date: "",
    time: "",
    reason: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const newLeaveRequest: LeaveRequest = {
      id: Date.now().toString(),
      type: "Personal Leave",
      date: newRequest.date,
      time: newRequest.time,
      reason: newRequest.reason,
      status: "pending",
      submittedAt: new Date().toISOString().split("T")[0],
    };

    setRequests((prev) => [newLeaveRequest, ...prev]);
    setNewRequest({ date: "", time: "", reason: "" });
    setIsSubmitting(false);
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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "denied":
        return <XCircle className="h-4 w-4 text-red-600" />;
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-600" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Leave Request</h1>
          <p className="text-muted-foreground">
            Submit and track your leave requests
          </p>
        </div>
        {hasSelfCheckoutRole && (
          <Badge className="bg-purple-100 text-purple-800 border-purple-200">
            <Shield className="h-3 w-3 mr-1" />
            Self-Checkout
          </Badge>
        )}
      </div>

      {/* Role Check */}
      {!hasSelfCheckoutRole && (
        <Card className="card-enhanced">
          <CardContent className="p-6">
            <div className="text-center text-muted-foreground">
              <AlertCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>You need Self-Checkout role to submit leave requests</p>
              <p className="text-sm">Please contact your administrator</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Leave Request Form */}
      {hasSelfCheckoutRole && (
        <Card className="card-enhanced">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              New Leave Request
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={newRequest.date}
                    onChange={(e) =>
                      setNewRequest((prev) => ({
                        ...prev,
                        date: e.target.value,
                      }))
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time">Time</Label>
                  <Input
                    id="time"
                    type="time"
                    value={newRequest.time}
                    onChange={(e) =>
                      setNewRequest((prev) => ({
                        ...prev,
                        time: e.target.value,
                      }))
                    }
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="reason">Reason for Leave</Label>
                <Textarea
                  id="reason"
                  placeholder="Please provide a detailed reason for your leave request..."
                  value={newRequest.reason}
                  onChange={(e) =>
                    setNewRequest((prev) => ({
                      ...prev,
                      reason: e.target.value,
                    }))
                  }
                  required
                  rows={3}
                />
              </div>
              <Button type="submit" disabled={isSubmitting} className="w-full">
                {isSubmitting ? "Submitting..." : "Submit Request"}
              </Button>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Leave Request History */}
      <Card className="card-enhanced">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            My Leave Requests
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {requests.map((request) => (
              <div
                key={request.id}
                className="flex items-center justify-between p-4 rounded-lg border border-border/50"
              >
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <Calendar className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">{request.type}</h3>
                    <p className="text-sm text-muted-foreground">
                      {request.reason}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Date: {request.date} at {request.time} • Submitted:{" "}
                      {request.submittedAt}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={getStatusColor(request.status)}>
                    <div className="flex items-center gap-1">
                      {getStatusIcon(request.status)}
                      <span className="capitalize">{request.status}</span>
                    </div>
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
