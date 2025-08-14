import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  ClipboardCheck, 
  MapPin, 
  MessageCircle, 
  UserCheck, 
  Clock,
  AlertTriangle,
  CheckCircle
} from "lucide-react"

export default function InstructorDashboard() {
  const [stats] = useState({
    studentsPresent: 28,
    totalStudents: 32,
    pendingRollCalls: 2,
    leaveRequests: 5,
    unreadMessages: 8
  })

  const quickActions = [
    { title: "Start Roll Call", description: "Begin attendance check", icon: ClipboardCheck, action: "start-rollcall", variant: "default" as const },
    { title: "View Student Locations", description: "See where students are", icon: MapPin, action: "view-locations", variant: "outline" as const },
    { title: "Check Messages", description: "Review student messages", icon: MessageCircle, action: "check-messages", variant: "outline" as const },
    { title: "Approve Leave Requests", description: "Review pending requests", icon: UserCheck, action: "approve-leaves", variant: "outline" as const }
  ]

  const recentRollCalls = [
    { class: "Biology 101", time: "9:00 AM", present: 28, total: 30, status: "completed" },
    { class: "Chemistry Lab", time: "11:00 AM", present: 25, total: 28, status: "in-progress" },
    { class: "Physics 201", time: "2:00 PM", present: 0, total: 32, status: "pending" }
  ]

  const pendingRequests = [
    { student: "Emma Johnson", type: "Medical Leave", time: "2 hours ago", urgent: false },
    { student: "Alex Chen", type: "Family Emergency", time: "30 minutes ago", urgent: true },
    { student: "Maria Garcia", type: "Appointment", time: "1 hour ago", urgent: false }
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Instructor Dashboard</h1>
          <p className="text-muted-foreground">Manage roll calls, student locations, and communications</p>
        </div>
        <Badge variant="outline" className="bg-accent/10 text-accent-foreground border-accent/20">
          Instructor
        </Badge>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <Card className="card-enhanced">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Students Present</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{stats.studentsPresent}/{stats.totalStudents}</div>
            <p className="text-xs text-success">87.5% attendance</p>
          </CardContent>
        </Card>
        
        <Card className="card-enhanced">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Pending Roll Calls</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{stats.pendingRollCalls}</div>
            <p className="text-xs text-warning">Need attention</p>
          </CardContent>
        </Card>
        
        <Card className="card-enhanced">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Leave Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{stats.leaveRequests}</div>
            <p className="text-xs text-warning">Awaiting approval</p>
          </CardContent>
        </Card>
        
        <Card className="card-enhanced">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Messages</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{stats.unreadMessages}</div>
            <p className="text-xs text-muted-foreground">Unread</p>
          </CardContent>
        </Card>
        
        <Card className="card-enhanced">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Classes Today</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">3</div>
            <p className="text-xs text-success">On schedule</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="card-enhanced">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common instructor tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <Button
                key={index}
                variant={action.variant}
                className="h-auto p-4 flex flex-col items-center text-center"
                onClick={() => console.log(`Action: ${action.action}`)}
              >
                <action.icon className="h-6 w-6 mb-2" />
                <div className="font-medium">{action.title}</div>
                <div className="text-xs text-muted-foreground mt-1">{action.description}</div>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Roll Calls */}
        <Card className="card-enhanced">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ClipboardCheck className="h-5 w-5" />
              Today's Roll Calls
            </CardTitle>
            <CardDescription>Attendance status for your classes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentRollCalls.map((rollCall, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg border border-border/50">
                  <div className="flex items-center gap-3">
                    {rollCall.status === 'completed' && <CheckCircle className="h-4 w-4 text-success" />}
                    {rollCall.status === 'in-progress' && <Clock className="h-4 w-4 text-warning" />}
                    {rollCall.status === 'pending' && <AlertTriangle className="h-4 w-4 text-muted-foreground" />}
                    <div>
                      <p className="font-medium">{rollCall.class}</p>
                      <p className="text-sm text-muted-foreground">{rollCall.time}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{rollCall.present}/{rollCall.total}</p>
                    <Badge 
                      variant={rollCall.status === 'completed' ? 'default' : rollCall.status === 'in-progress' ? 'secondary' : 'outline'}
                      className="text-xs"
                    >
                      {rollCall.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Pending Requests */}
        <Card className="card-enhanced">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserCheck className="h-5 w-5" />
              Pending Leave Requests
            </CardTitle>
            <CardDescription>Student requests awaiting your approval</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pendingRequests.map((request, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg border border-border/50">
                  <div className="flex items-center gap-3">
                    {request.urgent && <AlertTriangle className="h-4 w-4 text-warning" />}
                    <div>
                      <p className="font-medium">{request.student}</p>
                      <p className="text-sm text-muted-foreground">{request.type} • {request.time}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">Deny</Button>
                    <Button size="sm">Approve</Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}