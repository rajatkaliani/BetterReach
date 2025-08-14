import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DataTable } from "@/components/ui/DataTable";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Shield,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Download,
  Search,
  Filter,
  Eye,
  Clock,
  MapPin,
  Monitor,
} from "lucide-react";

interface SecurityLog {
  id: string;
  username: string;
  role: string;
  ipAddress: string;
  location: string;
  loginTime: string;
  logoutTime?: string;
  device: string;
  browser: string;
  status: "success" | "failed" | "suspicious";
  userAgent: string;
}

const mockSecurityLogs: SecurityLog[] = [
  {
    id: "1",
    username: "admin",
    role: "Administrator",
    ipAddress: "192.168.1.100",
    location: "New York, NY",
    loginTime: "2024-03-15 09:30:00",
    logoutTime: "2024-03-15 17:45:00",
    device: "Desktop",
    browser: "Chrome 120.0",
    status: "success",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
  },
  {
    id: "2",
    username: "instructor1",
    role: "Instructor",
    ipAddress: "192.168.1.101",
    location: "Boston, MA",
    loginTime: "2024-03-15 08:15:00",
    logoutTime: "2024-03-15 16:30:00",
    device: "Laptop",
    browser: "Firefox 119.0",
    status: "success",
    userAgent:
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
  },
  {
    id: "3",
    username: "student1",
    role: "Student",
    ipAddress: "192.168.1.102",
    location: "Chicago, IL",
    loginTime: "2024-03-15 10:00:00",
    device: "Mobile",
    browser: "Safari Mobile",
    status: "success",
    userAgent:
      "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15",
  },
  {
    id: "4",
    username: "unknown_user",
    role: "Unknown",
    ipAddress: "203.0.113.45",
    location: "Unknown",
    loginTime: "2024-03-15 11:30:00",
    device: "Unknown",
    browser: "Unknown",
    status: "failed",
    userAgent: "Mozilla/5.0 (compatible; Bot/1.0)",
  },
  {
    id: "5",
    username: "admin",
    role: "Administrator",
    ipAddress: "192.168.1.100",
    location: "New York, NY",
    loginTime: "2024-03-15 14:20:00",
    logoutTime: "2024-03-15 14:25:00",
    device: "Desktop",
    browser: "Chrome 120.0",
    status: "suspicious",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
  },
  {
    id: "6",
    username: "parent1",
    role: "Parent",
    ipAddress: "192.168.1.103",
    location: "Los Angeles, CA",
    loginTime: "2024-03-15 12:00:00",
    logoutTime: "2024-03-15 13:15:00",
    device: "Tablet",
    browser: "Chrome Mobile",
    status: "success",
    userAgent: "Mozilla/5.0 (Linux; Android 13; SM-G991B) AppleWebKit/537.36",
  },
  {
    id: "7",
    username: "instructor2",
    role: "Instructor",
    ipAddress: "192.168.1.104",
    location: "Miami, FL",
    loginTime: "2024-03-15 07:45:00",
    logoutTime: "2024-03-15 15:20:00",
    device: "Desktop",
    browser: "Edge 120.0",
    status: "success",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
  },
  {
    id: "8",
    username: "student2",
    role: "Student",
    ipAddress: "192.168.1.105",
    location: "Seattle, WA",
    loginTime: "2024-03-15 09:00:00",
    device: "Laptop",
    browser: "Safari 17.0",
    status: "success",
    userAgent:
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15",
  },
];

export default function SecurityLogs() {
  const [logs, setLogs] = useState<SecurityLog[]>(mockSecurityLogs);
  const [filteredLogs, setFilteredLogs] =
    useState<SecurityLog[]>(mockSecurityLogs);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    filterLogs(query, statusFilter, roleFilter);
  };

  const handleStatusFilter = (status: string) => {
    setStatusFilter(status);
    filterLogs(searchQuery, status, roleFilter);
  };

  const handleRoleFilter = (role: string) => {
    setRoleFilter(role);
    filterLogs(searchQuery, statusFilter, role);
  };

  const filterLogs = (query: string, status: string, role: string) => {
    let filtered = logs;

    if (query) {
      filtered = filtered.filter(
        (log) =>
          log.username.toLowerCase().includes(query.toLowerCase()) ||
          log.ipAddress.includes(query) ||
          log.location.toLowerCase().includes(query.toLowerCase())
      );
    }

    if (status !== "all") {
      filtered = filtered.filter((log) => log.status === status);
    }

    if (role !== "all") {
      filtered = filtered.filter((log) => log.role.toLowerCase() === role);
    }

    setFilteredLogs(filtered);
  };

  const handleExport = () => {
    const csvContent = [
      [
        "Username",
        "Role",
        "IP Address",
        "Location",
        "Login Time",
        "Logout Time",
        "Device",
        "Browser",
        "Status",
      ],
      ...filteredLogs.map((log) => [
        log.username,
        log.role,
        log.ipAddress,
        log.location,
        log.loginTime,
        log.logoutTime || "",
        log.device,
        log.browser,
        log.status,
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `security-logs-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "success":
        return (
          <Badge className="bg-green-100 text-green-800">
            <CheckCircle className="h-3 w-3 mr-1" />
            Success
          </Badge>
        );
      case "failed":
        return (
          <Badge className="bg-red-100 text-red-800">
            <XCircle className="h-3 w-3 mr-1" />
            Failed
          </Badge>
        );
      case "suspicious":
        return (
          <Badge className="bg-yellow-100 text-yellow-800">
            <AlertTriangle className="h-3 w-3 mr-1" />
            Suspicious
          </Badge>
        );
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const columns = [
    { key: "username", label: "Username" },
    { key: "role", label: "Role" },
    { key: "ipAddress", label: "IP Address" },
    { key: "location", label: "Location" },
    { key: "loginTime", label: "Login Time" },
    { key: "logoutTime", label: "Logout Time" },
    { key: "device", label: "Device" },
    { key: "browser", label: "Browser" },
    {
      key: "status",
      label: "Status",
      render: (value: string) => getStatusBadge(value),
    },
  ];

  const getStats = () => {
    const total = logs.length;
    const successful = logs.filter((log) => log.status === "success").length;
    const failed = logs.filter((log) => log.status === "failed").length;
    const suspicious = logs.filter((log) => log.status === "suspicious").length;

    return { total, successful, failed, suspicious };
  };

  const stats = getStats();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Security Logs</h1>
          <p className="text-muted-foreground">
            Monitor login activity for all users
          </p>
        </div>
        <Button onClick={handleExport}>
          <Download className="h-4 w-4 mr-2" />
          Export to CSV
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="card-enhanced">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Logins
            </CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground">Today</p>
          </CardContent>
        </Card>

        <Card className="card-enhanced">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Successful
            </CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {stats.successful}
            </div>
            <p className="text-xs text-success">
              {((stats.successful / stats.total) * 100).toFixed(1)}% success
              rate
            </p>
          </CardContent>
        </Card>

        <Card className="card-enhanced">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Failed
            </CardTitle>
            <XCircle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {stats.failed}
            </div>
            <p className="text-xs text-destructive">
              {((stats.failed / stats.total) * 100).toFixed(1)}% failure rate
            </p>
          </CardContent>
        </Card>

        <Card className="card-enhanced">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Suspicious
            </CardTitle>
            <AlertTriangle className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {stats.suspicious}
            </div>
            <p className="text-xs text-warning">Require attention</p>
          </CardContent>
        </Card>
      </div>

      {/* Security Logs Table */}
      <DataTable
        title="Login Activity"
        columns={columns}
        data={filteredLogs}
        searchPlaceholder="Search by username, IP, or location..."
        onSearch={handleSearch}
        onExport={handleExport}
        filters={
          <div className="flex gap-2">
            <Select value={statusFilter} onValueChange={handleStatusFilter}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="success">Success</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
                <SelectItem value="suspicious">Suspicious</SelectItem>
              </SelectContent>
            </Select>

            <Select value={roleFilter} onValueChange={handleRoleFilter}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="administrator">Administrator</SelectItem>
                <SelectItem value="instructor">Instructor</SelectItem>
                <SelectItem value="student">Student</SelectItem>
                <SelectItem value="parent">Parent</SelectItem>
              </SelectContent>
            </Select>
          </div>
        }
      />

      {/* Security Alerts */}
      <Card className="card-enhanced">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-warning" />
            Security Alerts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {logs
              .filter(
                (log) => log.status === "suspicious" || log.status === "failed"
              )
              .map((log) => (
                <div
                  key={log.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-3 h-3 rounded-full ${
                        log.status === "suspicious"
                          ? "bg-yellow-500"
                          : "bg-red-500"
                      }`}
                    />
                    <div>
                      <p className="font-medium">
                        {log.username} ({log.role})
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {log.ipAddress} • {log.location} • {log.loginTime}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusBadge(log.status)}
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}

            {logs.filter(
              (log) => log.status === "suspicious" || log.status === "failed"
            ).length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <Shield className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No security alerts at this time</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
