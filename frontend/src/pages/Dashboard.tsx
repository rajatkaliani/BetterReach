import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Users, 
  MapPin, 
  MessageCircle, 
  Calendar,
  TrendingUp,
  AlertTriangle
} from "lucide-react"

export default function Dashboard() {
  const stats = [
    {
      title: "Total Students",
      value: "247",
      change: "+12 this week",
      icon: Users,
      color: "text-primary"
    },
    {
      title: "Active Locations",
      value: "8",
      change: "2 new this month",
      icon: MapPin,
      color: "text-success"
    },
    {
      title: "Unread Messages",
      value: "15",
      change: "5 urgent",
      icon: MessageCircle,
      color: "text-warning"
    },
    {
      title: "Upcoming Events",
      value: "3",
      change: "This week",
      icon: Calendar,
      color: "text-accent-foreground"
    }
  ]

  const recentActivity = [
    {
      student: "Alice Johnson",
      action: "Checked into Dining Hall",
      time: "2 minutes ago",
      status: "success"
    },
    {
      student: "Bob Smith",
      action: "Left Classroom 101",
      time: "5 minutes ago",
      status: "warning"
    },
    {
      student: "Carol Davis",
      action: "Missing from Roll Call",
      time: "15 minutes ago",
      status: "error"
    },
    {
      student: "David Wilson",
      action: "Checked into Library",
      time: "20 minutes ago",
      status: "success"
    }
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "success":
        return <Badge className="badge-success">Active</Badge>
      case "warning":
        return <Badge className="badge-warning">In Transit</Badge>
      case "error":
        return <Badge className="badge-error">Missing</Badge>
      default:
        return <Badge variant="secondary">Unknown</Badge>
    }
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">Overview of student life activity</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title} className="card-enhanced">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {stat.change}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="card-enhanced">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Recent Activity
            </CardTitle>
            <CardDescription>
              Latest student location updates
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div className="space-y-1">
                    <p className="font-medium text-foreground">{activity.student}</p>
                    <p className="text-sm text-muted-foreground">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                  {getStatusBadge(activity.status)}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="card-enhanced">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-warning" />
              Quick Actions
            </CardTitle>
            <CardDescription>
              Common tasks and alerts
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-3 rounded-lg bg-warning/10 border border-warning/20">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-warning" />
                  <span className="font-medium text-warning">3 students missing from evening roll call</span>
                </div>
              </div>
              <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-primary" />
                  <span className="font-medium text-primary">Basketball practice starts in 30 minutes</span>
                </div>
              </div>
              <div className="p-3 rounded-lg bg-success/10 border border-success/20">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-success" />
                  <span className="font-medium text-success">247 students checked in today</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}