import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  MapPin, 
  Calendar, 
  MessageCircle, 
  UserCheck,
  Clock,
  Heart,
  BookOpen,
  CheckCircle,
  AlertTriangle
} from "lucide-react"

export default function ParentDashboard() {
  const [children] = useState([
    { 
      name: "Emma Johnson", 
      grade: "Grade 10", 
      status: "Present", 
      location: "Chemistry Lab", 
      lastCheckIn: "11:00 AM",
      attendance: "94%"
    },
    { 
      name: "James Johnson", 
      grade: "Grade 8", 
      status: "Present", 
      location: "Classroom 205", 
      lastCheckIn: "10:30 AM",
      attendance: "97%"
    }
  ])

  const quickActions = [
    { title: "View Child Locations", description: "See where your children are", icon: MapPin, action: "view-locations", variant: "default" as const },
    { title: "Approve Leave", description: "Review leave requests", icon: UserCheck, action: "approve-leave", variant: "outline" as const },
    { title: "Send Message", description: "Contact school/child", icon: MessageCircle, action: "send-message", variant: "outline" as const },
    { title: "View Events", description: "Upcoming school events", icon: Calendar, action: "view-events", variant: "outline" as const }
  ]

  const pendingApprovals = [
    { child: "Emma Johnson", type: "Doctor Appointment", date: "Tomorrow 2:00 PM", urgent: false },
    { child: "James Johnson", type: "Early Dismissal", date: "Friday 1:00 PM", urgent: false }
  ]

  const recentMessages = [
    { from: "Emma (Chemistry Lab)", message: "Lab experiment going well!", time: "30 min ago", type: "child" },
    { from: "Prof. Johnson", message: "Emma's assignment submitted", time: "2 hours ago", type: "instructor" },
    { from: "School Admin", message: "Parent-teacher conference reminder", time: "1 day ago", type: "admin" }
  ]

  const upcomingEvents = [
    { name: "Parent-Teacher Conference", date: "Monday", time: "3:00 PM", child: "Emma Johnson" },
    { name: "Science Fair Presentation", date: "Wednesday", time: "10:00 AM", child: "James Johnson" },
    { name: "School Board Meeting", date: "Friday", time: "7:00 PM", child: "All Students" }
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Parent Dashboard</h1>
          <p className="text-muted-foreground">Monitor your children's activities and school communication</p>
        </div>
        <Badge variant="outline" className="bg-warning/10 text-warning border-warning/20">
          Parent
        </Badge>
      </div>

      {/* Children Status */}
      <Card className="card-enhanced">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserCheck className="h-5 w-5" />
            Children Status
          </CardTitle>
          <CardDescription>Real-time location and attendance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {children.map((child, index) => (
              <div key={index} className="p-4 rounded-lg border border-border/50 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">{child.name}</h3>
                    <p className="text-sm text-muted-foreground">{child.grade}</p>
                  </div>
                  <Badge variant={child.status === 'Present' ? 'default' : 'secondary'}>
                    {child.status}
                  </Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4" />
                    <span>{child.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4" />
                    <span>Last check-in: {child.lastCheckIn}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <BookOpen className="h-4 w-4" />
                    <span>Attendance: {child.attendance}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="card-enhanced">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common parent tasks</CardDescription>
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
        {/* Pending Approvals */}
        <Card className="card-enhanced">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Pending Approvals
            </CardTitle>
            <CardDescription>Leave requests awaiting your approval</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pendingApprovals.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-4">No pending approvals</p>
              ) : (
                pendingApprovals.map((approval, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg border border-border/50">
                    <div className="flex items-center gap-3">
                      {approval.urgent && <AlertTriangle className="h-4 w-4 text-warning" />}
                      <div>
                        <p className="font-medium">{approval.child}</p>
                        <p className="text-sm text-muted-foreground">{approval.type}</p>
                        <p className="text-xs text-muted-foreground">{approval.date}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">Deny</Button>
                      <Button size="sm">Approve</Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        {/* Recent Messages */}
        <Card className="card-enhanced">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5" />
              Recent Messages
            </CardTitle>
            <CardDescription>Latest communications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentMessages.map((message, index) => (
                <div key={index} className="p-3 rounded-lg border border-border/50">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-medium text-sm">{message.from}</p>
                    <Badge variant="outline" className="text-xs">
                      {message.type}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">{message.message}</p>
                  <p className="text-xs text-muted-foreground">{message.time}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Events */}
      <Card className="card-enhanced">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Upcoming Events
          </CardTitle>
          <CardDescription>School events and activities</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {upcomingEvents.map((event, index) => (
              <div key={index} className="p-4 rounded-lg border border-border/50">
                <h4 className="font-medium mb-2">{event.name}</h4>
                <p className="text-sm text-muted-foreground mb-1">
                  {event.date} at {event.time}
                </p>
                <p className="text-xs text-muted-foreground">For: {event.child}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}