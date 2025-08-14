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
import { LeaveRequestCard } from "@/components/instructor/LeaveRequestCard";
import {
  UserCheck,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Filter,
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

const mockLeaveRequests: LeaveRequest[] = [
  {
    id: "1",
    studentName: "Alice Johnson",
    type: "weekend",
    submittedBy: "student",
    date: "2024-03-16",
    time: "14:00",
    reason: "Family event - my sister's graduation ceremony",
    status: "pending",
    hasSelfCheckout: true,
  },
  {
    id: "2",
    studentName: "Bob Smith",
    type: "medical",
    submittedBy: "parent",
    date: "2024-03-15",
    time: "10:00",
    reason: "Doctor appointment for annual checkup",
    status: "pending",
  },
  {
    id: "3",
    studentName: "Carol Davis",
    type: "personal",
    submittedBy: "student",
    date: "2024-03-17",
    time: "16:00",
    reason: "Need to attend a family emergency",
    status: "approved",
  },
  {
    id: "4",
    studentName: "David Wilson",
    type: "emergency",
    submittedBy: "parent",
    date: "2024-03-14",
    time: "08:00",
    reason: "Family emergency - grandmother in hospital",
    status: "approved",
  },
  {
    id: "5",
    studentName: "Emma Brown",
    type: "weekend",
    submittedBy: "student",
    date: "2024-03-18",
    time: "12:00",
    reason: "Shopping trip with family",
    status: "denied",
  },
  {
    id: "6",
    studentName: "Frank Miller",
    type: "medical",
    submittedBy: "student",
    date: "2024-03-19",
    time: "15:30",
    reason: "Dental appointment",
    status: "pending",
    hasSelfCheckout: true,
  },
  {
    id: "7",
    studentName: "Grace Lee",
    type: "personal",
    submittedBy: "parent",
    date: "2024-03-20",
    time: "11:00",
    reason: "Family vacation",
    status: "pending",
  },
  {
    id: "8",
    studentName: "Henry Taylor",
    type: "emergency",
    submittedBy: "student",
    date: "2024-03-21",
    time: "09:00",
    reason: "Car broke down, need to get it fixed",
    status: "approved",
  },
];

export default function LeaveRequests() {
  const [requests, setRequests] = useState<LeaveRequest[]>(mockLeaveRequests);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");

  const handleApprove = (id: string) => {
    setRequests((prev) =>
      prev.map((request) =>
        request.id === id ? { ...request, status: "approved" } : request
      )
    );
  };

  const handleDeny = (id: string) => {
    setRequests((prev) =>
      prev.map((request) =>
        request.id === id ? { ...request, status: "denied" } : request
      )
    );
  };

  const filteredRequests = requests.filter((request) => {
    const statusMatch =
      statusFilter === "all" || request.status === statusFilter;
    const typeMatch = typeFilter === "all" || request.type === typeFilter;
    return statusMatch && typeMatch;
  });

  const getStats = () => {
    const pending = requests.filter((r) => r.status === "pending").length;
    const approved = requests.filter((r) => r.status === "approved").length;
    const denied = requests.filter((r) => r.status === "denied").length;
    const total = requests.length;

    return { pending, approved, denied, total };
  };

  const stats = getStats();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Leave Requests</h1>
        <p className="text-muted-foreground">
          Approve or deny student leave requests
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="card-enhanced">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                <UserCheck className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.total}</p>
                <p className="text-sm text-muted-foreground">Total Requests</p>
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
                  {stats.pending}
                </p>
                <p className="text-sm text-muted-foreground">Pending</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-enhanced">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-green-600">
                  {stats.approved}
                </p>
                <p className="text-sm text-muted-foreground">Approved</p>
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
                  {stats.denied}
                </p>
                <p className="text-sm text-muted-foreground">Denied</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="card-enhanced">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Status</label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="denied">Denied</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Type</label>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="weekend">Weekend</SelectItem>
                  <SelectItem value="medical">Medical</SelectItem>
                  <SelectItem value="personal">Personal</SelectItem>
                  <SelectItem value="emergency">Emergency</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Leave Requests List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Leave Requests</h2>
          <Badge variant="outline">{filteredRequests.length} requests</Badge>
        </div>

        {filteredRequests.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {filteredRequests.map((request) => (
              <LeaveRequestCard
                key={request.id}
                request={request}
                onApprove={handleApprove}
                onDeny={handleDeny}
              />
            ))}
          </div>
        ) : (
          <Card className="card-enhanced">
            <CardContent className="p-8">
              <div className="text-center text-muted-foreground">
                <AlertCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No leave requests match your current filters</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
