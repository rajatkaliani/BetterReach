import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Search, RefreshCw, Users, AlertTriangle } from "lucide-react"

interface Student {
  id: string
  name: string
  location: string
  status: "present" | "missing" | "in-transit"
  lastUpdate: string
  grade: string
}

export default function RollCall() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isRefreshing, setIsRefreshing] = useState(false)

  const students: Student[] = [
    {
      id: "1",
      name: "Alice Johnson",
      location: "Dining Hall",
      status: "present",
      lastUpdate: "2 minutes ago",
      grade: "10th"
    },
    {
      id: "2",
      name: "Bob Smith",
      location: "Library",
      status: "present",
      lastUpdate: "5 minutes ago",
      grade: "11th"
    },
    {
      id: "3",
      name: "Carol Davis",
      location: "Unknown",
      status: "missing",
      lastUpdate: "45 minutes ago",
      grade: "9th"
    },
    {
      id: "4",
      name: "David Wilson",
      location: "Classroom 101",
      status: "present",
      lastUpdate: "1 minute ago",
      grade: "12th"
    },
    {
      id: "5",
      name: "Emma Brown",
      location: "En route to Dorm A",
      status: "in-transit",
      lastUpdate: "3 minutes ago",
      grade: "10th"
    },
    {
      id: "6",
      name: "Frank Miller",
      location: "Gymnasium",
      status: "present",
      lastUpdate: "10 minutes ago",
      grade: "11th"
    },
    {
      id: "7",
      name: "Grace Lee",
      location: "Unknown",
      status: "missing",
      lastUpdate: "1 hour ago",
      grade: "9th"
    },
    {
      id: "8",
      name: "Henry Clark",
      location: "Cafeteria",
      status: "present",
      lastUpdate: "7 minutes ago",
      grade: "12th"
    }
  ]

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.location.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getStatusBadge = (status: Student["status"]) => {
    switch (status) {
      case "present":
        return <Badge className="badge-success">Present</Badge>
      case "in-transit":
        return <Badge className="badge-warning">In Transit</Badge>
      case "missing":
        return <Badge className="badge-error">Missing</Badge>
      default:
        return <Badge variant="secondary">Unknown</Badge>
    }
  }

  const getLocationColor = (status: Student["status"]) => {
    switch (status) {
      case "present":
        return "text-success"
      case "in-transit":
        return "text-warning"
      case "missing":
        return "text-destructive"
      default:
        return "text-muted-foreground"
    }
  }

  const handleRefresh = () => {
    setIsRefreshing(true)
    setTimeout(() => {
      setIsRefreshing(false)
    }, 2000)
  }

  const presentCount = students.filter(s => s.status === "present").length
  const missingCount = students.filter(s => s.status === "missing").length
  const inTransitCount = students.filter(s => s.status === "in-transit").length

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Live Roll Call</h1>
          <p className="text-muted-foreground">Real-time student location tracking</p>
        </div>
        <Button onClick={handleRefresh} disabled={isRefreshing} className="gap-2">
          <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
          {isRefreshing ? "Refreshing..." : "Refresh"}
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="card-enhanced">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-success/10 rounded-lg">
                <Users className="h-5 w-5 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{presentCount}</p>
                <p className="text-sm text-muted-foreground">Present</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-enhanced">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-warning/10 rounded-lg">
                <RefreshCw className="h-5 w-5 text-warning" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{inTransitCount}</p>
                <p className="text-sm text-muted-foreground">In Transit</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-enhanced">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-destructive/10 rounded-lg">
                <AlertTriangle className="h-5 w-5 text-destructive" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{missingCount}</p>
                <p className="text-sm text-muted-foreground">Missing</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-enhanced">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{students.length}</p>
                <p className="text-sm text-muted-foreground">Total</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card className="card-enhanced">
        <CardHeader>
          <CardTitle>Student List</CardTitle>
          <CardDescription>
            Current location status of all students
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search students or locations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="space-y-3">
            {filteredStudents.map((student) => (
              <div key={student.id} className="flex items-center justify-between p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-4">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {student.name.split(" ").map(n => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium text-foreground">{student.name}</h3>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-muted-foreground">Grade {student.grade}</span>
                      <span className="text-muted-foreground">•</span>
                      <span className={getLocationColor(student.status)}>
                        {student.location}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Last update: {student.lastUpdate}
                    </p>
                  </div>
                </div>
                {getStatusBadge(student.status)}
              </div>
            ))}
          </div>

          {filteredStudents.length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No students found matching your search.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}