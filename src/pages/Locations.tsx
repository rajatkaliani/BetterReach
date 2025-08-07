import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { 
  MapPin, 
  Users, 
  Search, 
  Building, 
  UtensilsCrossed, 
  GraduationCap,
  Home,
  Dumbbell,
  BookOpen,
  Plus
} from "lucide-react"

interface Location {
  id: string
  name: string
  type: "dorm" | "classroom" | "dining" | "recreation" | "library" | "other"
  studentCount: number
  capacity: number
  description: string
  status: "active" | "maintenance" | "closed"
}

export default function Locations() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState<string>("all")

  const locations: Location[] = [
    {
      id: "1",
      name: "Dorm A - West Wing",
      type: "dorm",
      studentCount: 45,
      capacity: 50,
      description: "Freshman dormitory with common areas",
      status: "active"
    },
    {
      id: "2",
      name: "Dorm B - East Wing",
      type: "dorm",
      studentCount: 38,
      capacity: 50,
      description: "Sophomore dormitory with study lounges",
      status: "active"
    },
    {
      id: "3",
      name: "Classroom 101",
      type: "classroom",
      studentCount: 22,
      capacity: 30,
      description: "Mathematics and Sciences",
      status: "active"
    },
    {
      id: "4",
      name: "Classroom 205",
      type: "classroom",
      studentCount: 0,
      capacity: 25,
      description: "Literature and Arts",
      status: "maintenance"
    },
    {
      id: "5",
      name: "Main Dining Hall",
      type: "dining",
      studentCount: 67,
      capacity: 200,
      description: "Primary cafeteria and meal service",
      status: "active"
    },
    {
      id: "6",
      name: "Gymnasium",
      type: "recreation",
      studentCount: 15,
      capacity: 100,
      description: "Sports and fitness activities",
      status: "active"
    },
    {
      id: "7",
      name: "Library - Main Floor",
      type: "library",
      studentCount: 28,
      capacity: 80,
      description: "Study areas and book collections",
      status: "active"
    },
    {
      id: "8",
      name: "Cafeteria Annex",
      type: "dining",
      studentCount: 12,
      capacity: 50,
      description: "Secondary dining area",
      status: "closed"
    }
  ]

  const locationTypes = [
    { id: "all", name: "All Locations", icon: MapPin },
    { id: "dorm", name: "Dormitories", icon: Home },
    { id: "classroom", name: "Classrooms", icon: GraduationCap },
    { id: "dining", name: "Dining", icon: UtensilsCrossed },
    { id: "recreation", name: "Recreation", icon: Dumbbell },
    { id: "library", name: "Library", icon: BookOpen },
    { id: "other", name: "Other", icon: Building }
  ]

  const filteredLocations = locations.filter(location => {
    const matchesSearch = location.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         location.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = selectedType === "all" || location.type === selectedType
    return matchesSearch && matchesType
  })

  const getLocationIcon = (type: Location["type"]) => {
    switch (type) {
      case "dorm":
        return Home
      case "classroom":
        return GraduationCap
      case "dining":
        return UtensilsCrossed
      case "recreation":
        return Dumbbell
      case "library":
        return BookOpen
      default:
        return Building
    }
  }

  const getStatusBadge = (status: Location["status"]) => {
    switch (status) {
      case "active":
        return <Badge className="badge-success">Active</Badge>
      case "maintenance":
        return <Badge className="badge-warning">Maintenance</Badge>
      case "closed":
        return <Badge className="badge-error">Closed</Badge>
      default:
        return <Badge variant="secondary">Unknown</Badge>
    }
  }

  const getCapacityColor = (current: number, capacity: number) => {
    const percentage = (current / capacity) * 100
    if (percentage >= 90) return "text-destructive"
    if (percentage >= 75) return "text-warning"
    return "text-success"
  }

  const totalStudents = locations.reduce((sum, loc) => sum + loc.studentCount, 0)
  const activeLocations = locations.filter(loc => loc.status === "active").length

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Locations</h1>
          <p className="text-muted-foreground">Manage student locations and facilities</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Add Location
        </Button>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="card-enhanced">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <MapPin className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{locations.length}</p>
                <p className="text-sm text-muted-foreground">Total Locations</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-enhanced">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-success/10 rounded-lg">
                <Building className="h-5 w-5 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{activeLocations}</p>
                <p className="text-sm text-muted-foreground">Active Locations</p>
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
                <p className="text-2xl font-bold text-foreground">{totalStudents}</p>
                <p className="text-sm text-muted-foreground">Students Located</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="card-enhanced">
        <CardHeader>
          <CardTitle>Filter Locations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search locations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {locationTypes.map((type) => (
                <Button
                  key={type.id}
                  variant={selectedType === type.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedType(type.id)}
                  className="gap-2"
                >
                  <type.icon className="h-4 w-4" />
                  {type.name}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Locations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredLocations.map((location) => {
          const LocationIcon = getLocationIcon(location.type)
          const capacityPercentage = (location.studentCount / location.capacity) * 100
          
          return (
            <Card key={location.id} className="card-enhanced">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <LocationIcon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{location.name}</CardTitle>
                      <CardDescription className="capitalize">
                        {location.type.replace("-", " ")}
                      </CardDescription>
                    </div>
                  </div>
                  {getStatusBadge(location.status)}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  {location.description}
                </p>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Occupancy</span>
                    <span className={`text-sm font-medium ${getCapacityColor(location.studentCount, location.capacity)}`}>
                      {location.studentCount}/{location.capacity}
                    </span>
                  </div>
                  
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-300 ${
                        capacityPercentage >= 90 ? "bg-destructive" :
                        capacityPercentage >= 75 ? "bg-warning" : "bg-success"
                      }`}
                      style={{ width: `${Math.min(capacityPercentage, 100)}%` }}
                    />
                  </div>
                  
                  <div className="flex gap-2 pt-2">
                    <Button size="sm" variant="outline" className="flex-1">
                      View Students
                    </Button>
                    <Button size="sm" className="flex-1">
                      Start Roll Call
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {filteredLocations.length === 0 && (
        <Card className="card-enhanced">
          <CardContent className="text-center py-8">
            <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No locations found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filter criteria.</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}