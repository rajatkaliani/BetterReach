import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar, Clock, MapPin, Users, Search, Filter } from "lucide-react";

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  type: "academic" | "sports" | "social" | "parent" | "other";
  attendees?: string[];
  registrationRequired: boolean;
  registered: boolean;
}

export default function Events() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<string>("all");

  const events: Event[] = [
    {
      id: "1",
      title: "Parent-Teacher Conference",
      date: "March 20, 2024",
      time: "3:00 PM - 6:00 PM",
      location: "Main Hall",
      description:
        "Annual parent-teacher conference to discuss student progress and academic performance.",
      type: "parent",
      attendees: ["All Parents"],
      registrationRequired: true,
      registered: true,
    },
    {
      id: "2",
      title: "Spring Sports Day",
      date: "March 25, 2024",
      time: "10:00 AM - 4:00 PM",
      location: "School Grounds",
      description:
        "Annual sports day featuring various athletic competitions and activities for all students.",
      type: "sports",
      attendees: ["All Students", "Parents Welcome"],
      registrationRequired: false,
      registered: false,
    },
    {
      id: "3",
      title: "Science Fair",
      date: "April 5, 2024",
      time: "2:00 PM - 5:00 PM",
      location: "Gymnasium",
      description:
        "Student science projects showcase with awards and recognition ceremony.",
      type: "academic",
      attendees: ["Students", "Parents", "Community"],
      registrationRequired: false,
      registered: false,
    },
    {
      id: "4",
      title: "School Board Meeting",
      date: "April 10, 2024",
      time: "7:00 PM - 9:00 PM",
      location: "Conference Room A",
      description:
        "Monthly school board meeting to discuss policies and school improvements.",
      type: "parent",
      attendees: ["Board Members", "Parents Welcome"],
      registrationRequired: false,
      registered: false,
    },
    {
      id: "5",
      title: "Graduation Ceremony",
      date: "May 15, 2024",
      time: "2:00 PM - 4:00 PM",
      location: "Auditorium",
      description: "Annual graduation ceremony for graduating students.",
      type: "academic",
      attendees: ["Graduating Students", "Families"],
      registrationRequired: true,
      registered: false,
    },
    {
      id: "6",
      title: "Summer Camp Registration",
      date: "May 20, 2024",
      time: "9:00 AM - 12:00 PM",
      location: "Administration Office",
      description: "Registration day for summer camp programs and activities.",
      type: "other",
      attendees: ["Students", "Parents"],
      registrationRequired: true,
      registered: false,
    },
  ];

  const eventTypes = [
    { value: "all", label: "All Events" },
    { value: "academic", label: "Academic" },
    { value: "sports", label: "Sports" },
    { value: "social", label: "Social" },
    { value: "parent", label: "Parent Events" },
    { value: "other", label: "Other" },
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case "academic":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "sports":
        return "bg-green-100 text-green-800 border-green-200";
      case "social":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "parent":
        return "bg-orange-100 text-orange-800 border-orange-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === "all" || event.type === selectedType;
    return matchesSearch && matchesType;
  });

  const handleRegister = (eventId: string) => {
    // Simulate registration
    console.log(`Registered for event: ${eventId}`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">School Events</h1>
          <p className="text-muted-foreground">
            View and register for upcoming school events
          </p>
        </div>
        <Badge className="bg-blue-100 text-blue-800 border-blue-200">
          <Calendar className="h-3 w-3 mr-1" />
          Events Calendar
        </Badge>
      </div>

      {/* Search and Filter */}
      <Card className="card-enhanced">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Search & Filter
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search events..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-3 py-2 border border-border rounded-md bg-background"
            >
              {eventTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map((event) => (
          <Card key={event.id} className="card-enhanced">
            <CardHeader>
              <div className="flex items-start justify-between">
                <CardTitle className="text-lg">{event.title}</CardTitle>
                <Badge className={getTypeColor(event.type)}>
                  {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  {event.date}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  {event.time}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  {event.location}
                </div>
              </div>

              <p className="text-sm text-muted-foreground">
                {event.description}
              </p>

              {event.attendees && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Users className="h-4 w-4" />
                  <span>{event.attendees.join(", ")}</span>
                </div>
              )}

              <div className="flex items-center justify-between pt-2">
                {event.registrationRequired ? (
                  <Button
                    variant={event.registered ? "outline" : "default"}
                    size="sm"
                    onClick={() => handleRegister(event.id)}
                    disabled={event.registered}
                  >
                    {event.registered ? "Registered" : "Register"}
                  </Button>
                ) : (
                  <Badge variant="outline" className="text-xs">
                    No Registration Required
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredEvents.length === 0 && (
        <Card className="card-enhanced">
          <CardContent className="p-8">
            <div className="text-center text-muted-foreground">
              <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No events found matching your search criteria</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
