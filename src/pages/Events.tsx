import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  Search, 
  Plus,
  Filter,
  MoreHorizontal
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface Event {
  id: string
  title: string
  description: string
  date: string
  time: string
  location: string
  assignedStaff: string[]
  status: "active" | "completed" | "cancelled" | "upcoming"
  attendeeCount: number
  maxAttendees: number
  category: "academic" | "social" | "sports" | "maintenance" | "emergency"
}

export default function Events() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedFilter, setSelectedFilter] = useState<string>("all")

  const events: Event[] = [
    {
      id: "1",
      title: "Basketball Practice",
      description: "Weekly basketball practice session for the varsity team",
      date: "Today",
      time: "4:00 PM - 6:00 PM",
      location: "Gymnasium",
      assignedStaff: ["Coach Mike", "Dr. Johnson"],
      status: "active",
      attendeeCount: 12,
      maxAttendees: 15,
      category: "sports"
    },
    {
      id: "2",
      title: "Study Hall Session",
      description: "Supervised study time for students needing academic support",
      date: "Today",
      time: "7:00 PM - 9:00 PM",
      location: "Library - Main Floor",
      assignedStaff: ["Ms. Davis", "Mr. Wilson"],
      status: "upcoming",
      attendeeCount: 0,
      maxAttendees: 25,
      category: "academic"
    },
    {
      id: "3",
      title: "Movie Night",
      description: "Monthly movie screening in the common area",
      date: "Tomorrow",
      time: "8:00 PM - 10:30 PM",
      location: "Dorm A - Common Room",
      assignedStaff: ["Emma Brown"],
      status: "upcoming",
      attendeeCount: 8,
      maxAttendees: 40,
      category: "social"
    },
    {
      id: "4",
      title: "Fire Drill",
      description: "Mandatory fire safety drill for all buildings",
      date: "March 15",
      time: "2:00 PM - 2:30 PM",
      location: "All Buildings",
      assignedStaff: ["Security Team", "Safety Officer"],
      status: "upcoming",
      attendeeCount: 0,
      maxAttendees: 300,
      category: "emergency"
    },
    {
      id: "5",
      title: "HVAC Maintenance",
      description: "Scheduled maintenance for heating system in Dorm B",
      date: "March 12",
      time: "9:00 AM - 12:00 PM",
      location: "Dorm B - East Wing",
      assignedStaff: ["Maintenance Team"],
      status: "completed",
      attendeeCount: 0,
      maxAttendees: 0,
      category: "maintenance"
    },
    {
      id: "6",
      title: "Welcome Assembly",
      description: "Orientation session for new students",
      date: "March 10",
      time: "10:00 AM - 11:30 AM",
      location: "Main Auditorium",
      assignedStaff: ["Dr. Johnson", "Ms. Garcia"],
      status: "completed",
      attendeeCount: 45,
      maxAttendees: 50,
      category: "academic"
    }
  ]

  const filters = [
    { id: "all", name: "All Events" },
    { id: "active", name: "Active" },
    { id: "upcoming", name: "Upcoming" },
    { id: "completed", name: "Completed" },
    { id: "cancelled", name: "Cancelled" }
  ]

  const categories = [
    { id: "academic", name: "Academic", color: "bg-primary" },
    { id: "social", name: "Social", color: "bg-success" },
    { id: "sports", name: "Sports", color: "bg-warning" },
    { id: "maintenance", name: "Maintenance", color: "bg-muted-foreground" },
    { id: "emergency", name: "Emergency", color: "bg-destructive" }
  ]

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = selectedFilter === "all" || event.status === selectedFilter
    return matchesSearch && matchesFilter
  })

  const getStatusBadge = (status: Event["status"]) => {
    switch (status) {
      case "active":
        return <Badge className="badge-success">Active</Badge>
      case "upcoming":
        return <Badge className="badge-warning">Upcoming</Badge>
      case "completed":
        return <Badge variant="secondary">Completed</Badge>
      case "cancelled":
        return <Badge className="badge-error">Cancelled</Badge>
      default:
        return <Badge variant="secondary">Unknown</Badge>
    }
  }

  const getCategoryBadge = (category: Event["category"]) => {
    const categoryData = categories.find(c => c.id === category)
    return (
      <Badge variant="outline" className="capitalize">
        {categoryData?.name || category}
      </Badge>
    )
  }

  const getStaffAvatars = (staff: string[]) => {
    return staff.slice(0, 3).map((person, index) => (
      <Avatar key={index} className="h-6 w-6 border-2 border-card">
        <AvatarFallback className="text-xs bg-primary/10 text-primary">
          {person.split(" ").map(n => n[0]).join("")}
        </AvatarFallback>
      </Avatar>
    ))
  }

  const upcomingEvents = events.filter(e => e.status === "upcoming" || e.status === "active").length
  const activeEvents = events.filter(e => e.status === "active").length
  const totalAttendees = events.filter(e => e.status === "active").reduce((sum, e) => sum + e.attendeeCount, 0)

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Events</h1>
          <p className="text-muted-foreground">Manage activities and scheduled events</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Create Event
        </Button>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="card-enhanced">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Calendar className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{upcomingEvents}</p>
                <p className="text-sm text-muted-foreground">Upcoming Events</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-enhanced">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-success/10 rounded-lg">
                <Clock className="h-5 w-5 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{activeEvents}</p>
                <p className="text-sm text-muted-foreground">Active Now</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-enhanced">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-accent/10 rounded-lg">
                <Users className="h-5 w-5 text-accent-foreground" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{totalAttendees}</p>
                <p className="text-sm text-muted-foreground">Active Attendees</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="card-enhanced">
        <CardHeader>
          <CardTitle>Filter Events</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {filters.map((filter) => (
                <Button
                  key={filter.id}
                  variant={selectedFilter === filter.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedFilter(filter.id)}
                  className="gap-2"
                >
                  <Filter className="h-4 w-4" />
                  {filter.name}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Events Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredEvents.map((event) => (
          <Card key={event.id} className="card-enhanced">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-lg">{event.title}</CardTitle>
                    {getStatusBadge(event.status)}
                  </div>
                  <div className="flex items-center gap-2">
                    {getCategoryBadge(event.category)}
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Edit Event</DropdownMenuItem>
                    <DropdownMenuItem>View Attendees</DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">
                      Cancel Event
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="mb-4">
                {event.description}
              </CardDescription>
              
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">{event.date}</span>
                  <Clock className="h-4 w-4 text-muted-foreground ml-2" />
                  <span>{event.time}</span>
                </div>
                
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{event.location}</span>
                </div>
                
                {event.maxAttendees > 0 && (
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span>
                      {event.attendeeCount}/{event.maxAttendees} attendees
                    </span>
                  </div>
                )}
                
                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">Staff:</span>
                    <div className="flex -space-x-2">
                      {getStaffAvatars(event.assignedStaff)}
                      {event.assignedStaff.length > 3 && (
                        <div className="h-6 w-6 rounded-full bg-muted border-2 border-card flex items-center justify-center">
                          <span className="text-xs font-medium">+{event.assignedStaff.length - 3}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {(event.status === "upcoming" || event.status === "active") && (
                    <Button size="sm">
                      {event.status === "active" ? "View Details" : "Manage"}
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredEvents.length === 0 && (
        <Card className="card-enhanced">
          <CardContent className="text-center py-8">
            <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No events found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filter criteria.</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}