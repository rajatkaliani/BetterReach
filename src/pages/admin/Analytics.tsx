import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BarChart3,
  TrendingUp,
  Users,
  MapPin,
  Calendar,
  Activity,
  AlertTriangle,
  Download,
  Filter,
} from "lucide-react";

// Simple chart components (in a real app, you'd use Chart.js or similar)
const LineChart = ({ data, title }: { data: number[]; title: string }) => (
  <div className="space-y-2">
    <h3 className="text-sm font-medium">{title}</h3>
    <div className="h-32 flex items-end justify-between gap-1">
      {data.map((value, index) => (
        <div
          key={index}
          className="bg-primary rounded-t"
          style={{
            height: `${(value / Math.max(...data)) * 100}%`,
            width: `${100 / data.length}%`,
          }}
        />
      ))}
    </div>
    <div className="flex justify-between text-xs text-muted-foreground">
      <span>Mon</span>
      <span>Tue</span>
      <span>Wed</span>
      <span>Thu</span>
      <span>Fri</span>
      <span>Sat</span>
      <span>Sun</span>
    </div>
  </div>
);

const BarChart = ({
  data,
  title,
}: {
  data: { label: string; value: number }[];
  title: string;
}) => (
  <div className="space-y-2">
    <h3 className="text-sm font-medium">{title}</h3>
    <div className="space-y-2">
      {data.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          <span className="text-xs w-16 truncate">{item.label}</span>
          <div className="flex-1 bg-muted rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full"
              style={{
                width: `${
                  (item.value / Math.max(...data.map((d) => d.value))) * 100
                }%`,
              }}
            />
          </div>
          <span className="text-xs w-8 text-right">{item.value}</span>
        </div>
      ))}
    </div>
  </div>
);

const PieChart = ({
  data,
  title,
}: {
  data: { label: string; value: number; color: string }[];
  title: string;
}) => (
  <div className="space-y-2">
    <h3 className="text-sm font-medium">{title}</h3>
    <div className="flex items-center gap-4">
      <div className="w-20 h-20 rounded-full border-4 border-muted relative">
        {data.map((item, index) => {
          const total = data.reduce((sum, d) => sum + d.value, 0);
          const percentage = (item.value / total) * 100;
          const rotation = data
            .slice(0, index)
            .reduce((sum, d) => sum + (d.value / total) * 360, 0);

          return (
            <div
              key={index}
              className="absolute inset-0 rounded-full"
              style={{
                background: `conic-gradient(${
                  item.color
                } ${rotation}deg, transparent ${rotation}deg ${
                  rotation + percentage * 3.6
                }deg)`,
              }}
            />
          );
        })}
      </div>
      <div className="space-y-1">
        {data.map((item, index) => (
          <div key={index} className="flex items-center gap-2 text-xs">
            <div
              className="w-3 h-3 rounded"
              style={{ backgroundColor: item.color }}
            />
            <span>{item.label}</span>
            <span className="text-muted-foreground">({item.value})</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default function Analytics() {
  const attendanceData = [85, 92, 78, 95, 88, 45, 30];
  const locationData = [
    { label: "Library", value: 45 },
    { label: "Dining Hall", value: 120 },
    { label: "Gym", value: 35 },
    { label: "Classrooms", value: 180 },
    { label: "Dorms", value: 95 },
  ];
  const eventData = [
    { label: "Science Fair", value: 85, color: "#3b82f6" },
    { label: "Sports Events", value: 120, color: "#10b981" },
    { label: "Academic", value: 65, color: "#f59e0b" },
    { label: "Social", value: 40, color: "#ef4444" },
  ];
  const wellnessData = [
    { label: "Low Risk", value: 180 },
    { label: "Medium Risk", value: 25 },
    { label: "High Risk", value: 8 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Analytics</h1>
          <p className="text-muted-foreground">
            View usage and student activity data
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Select defaultValue="7d">
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="card-enhanced">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Average Attendance
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87.5%</div>
            <p className="text-xs text-success">+2.3% from last week</p>
          </CardContent>
        </Card>

        <Card className="card-enhanced">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Active Locations
            </CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">28</div>
            <p className="text-xs text-muted-foreground">Across campus</p>
          </CardContent>
        </Card>

        <Card className="card-enhanced">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Events This Month
            </CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-warning">3 upcoming</p>
          </CardContent>
        </Card>

        <Card className="card-enhanced">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Wellness Alerts
            </CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-destructive">Require attention</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Attendance Over Time */}
        <Card className="card-enhanced">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Attendance Over Time
            </CardTitle>
          </CardHeader>
          <CardContent>
            <LineChart
              data={attendanceData}
              title="Weekly Attendance Rate (%)"
            />
          </CardContent>
        </Card>

        {/* Location Check-ins */}
        <Card className="card-enhanced">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Location Check-ins
            </CardTitle>
          </CardHeader>
          <CardContent>
            <BarChart data={locationData} title="Students per Location" />
          </CardContent>
        </Card>

        {/* Event Participation */}
        <Card className="card-enhanced">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Event Participation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <PieChart data={eventData} title="Event Categories" />
          </CardContent>
        </Card>

        {/* Wellness Flagging */}
        <Card className="card-enhanced">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Wellness Risk Levels
            </CardTitle>
          </CardHeader>
          <CardContent>
            <BarChart data={wellnessData} title="Students by Risk Level" />
          </CardContent>
        </Card>
      </div>

      {/* Detailed Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Performing Locations */}
        <Card className="card-enhanced">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Top Performing Locations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Main Library", attendance: 95, change: "+5%" },
                { name: "Science Lab 101", attendance: 92, change: "+3%" },
                { name: "Dining Hall", attendance: 88, change: "+2%" },
                { name: "Gymnasium", attendance: 85, change: "-1%" },
                { name: "Computer Lab", attendance: 82, change: "+4%" },
              ].map((location, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{location.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {location.attendance}% attendance
                    </p>
                  </div>
                  <Badge
                    variant={
                      location.change.startsWith("+") ? "default" : "secondary"
                    }
                  >
                    {location.change}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="card-enhanced">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  time: "2 minutes ago",
                  activity: "Alice Johnson checked into Library",
                  type: "check-in",
                },
                {
                  time: "5 minutes ago",
                  activity: 'New event "Spring Concert" created',
                  type: "event",
                },
                {
                  time: "15 minutes ago",
                  activity: "Bob Smith submitted leave request",
                  type: "leave",
                },
                {
                  time: "1 hour ago",
                  activity: "System backup completed",
                  type: "system",
                },
                {
                  time: "2 hours ago",
                  activity: "Wellness alert for David Wilson",
                  type: "wellness",
                },
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div
                    className={`w-2 h-2 rounded-full mt-2 ${
                      item.type === "check-in"
                        ? "bg-green-500"
                        : item.type === "event"
                        ? "bg-blue-500"
                        : item.type === "leave"
                        ? "bg-yellow-500"
                        : item.type === "system"
                        ? "bg-gray-500"
                        : "bg-red-500"
                    }`}
                  />
                  <div className="flex-1">
                    <p className="text-sm">{item.activity}</p>
                    <p className="text-xs text-muted-foreground">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Export */}
      <Card className="card-enhanced">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Advanced Analytics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Date Range</label>
              <Select defaultValue="7d">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7d">Last 7 days</SelectItem>
                  <SelectItem value="30d">Last 30 days</SelectItem>
                  <SelectItem value="90d">Last 90 days</SelectItem>
                  <SelectItem value="1y">Last year</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Location</label>
              <Select defaultValue="all">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  <SelectItem value="library">Library</SelectItem>
                  <SelectItem value="dining">Dining Hall</SelectItem>
                  <SelectItem value="gym">Gymnasium</SelectItem>
                  <SelectItem value="classrooms">Classrooms</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Export Format</label>
              <Select defaultValue="csv">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="csv">CSV</SelectItem>
                  <SelectItem value="pdf">PDF</SelectItem>
                  <SelectItem value="excel">Excel</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex justify-end mt-4">
            <Button>
              <Download className="h-4 w-4 mr-2" />
              Generate Report
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
