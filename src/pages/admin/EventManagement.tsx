import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DataTable } from "@/components/ui/DataTable";
import { Modal } from "@/components/ui/Modal";
import { FormField } from "@/components/ui/FormField";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Plus,
  Calendar,
  Clock,
  MapPin,
  Users,
  Edit,
  Trash2,
  Bell,
} from "lucide-react";

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  assignedStaff: string[];
  description: string;
  sendAnnouncement: boolean;
  status: "scheduled" | "cancelled" | "completed";
  createdAt: string;
}

const mockEvents: Event[] = [
  {
    id: "1",
    title: "Science Fair 2024",
    date: "2024-03-15",
    time: "14:00",
    location: "Main Gymnasium",
    assignedStaff: ["Dr. Smith", "Ms. Johnson"],
    description:
      "Annual science fair showcasing student projects and experiments",
    sendAnnouncement: true,
    status: "scheduled",
    createdAt: "2024-02-01",
  },
  {
    id: "2",
    title: "Parent-Teacher Conference",
    date: "2024-03-20",
    time: "18:00",
    location: "Classroom Building",
    assignedStaff: ["All Teachers"],
    description:
      "Quarterly parent-teacher conferences to discuss student progress",
    sendAnnouncement: true,
    status: "scheduled",
    createdAt: "2024-02-05",
  },
  {
    id: "3",
    title: "Basketball Tournament",
    date: "2024-03-10",
    time: "16:00",
    location: "Sports Complex",
    assignedStaff: ["Coach Wilson", "Mr. Davis"],
    description: "Inter-school basketball tournament finals",
    sendAnnouncement: false,
    status: "completed",
    createdAt: "2024-02-15",
  },
  {
    id: "4",
    title: "Library Book Sale",
    date: "2024-03-25",
    time: "10:00",
    location: "Main Library",
    assignedStaff: ["Ms. Brown"],
    description: "Annual book sale to raise funds for library resources",
    sendAnnouncement: true,
    status: "scheduled",
    createdAt: "2024-02-10",
  },
  {
    id: "5",
    title: "Spring Concert",
    date: "2024-04-05",
    time: "19:00",
    location: "Auditorium",
    assignedStaff: ["Mr. Garcia", "Ms. Lee"],
    description: "Spring music concert featuring school choir and band",
    sendAnnouncement: true,
    status: "scheduled",
    createdAt: "2024-02-20",
  },
];

const statusColors = {
  scheduled: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
  completed: "bg-blue-100 text-blue-800",
};

const mockStaff = [
  "Dr. Smith",
  "Ms. Johnson",
  "Mr. Wilson",
  "Ms. Brown",
  "Mr. Davis",
  "Mr. Garcia",
  "Ms. Lee",
  "All Teachers",
];

export default function EventManagement() {
  const [events, setEvents] = useState<Event[]>(mockEvents);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>(mockEvents);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [newEvent, setNewEvent] = useState<Partial<Event>>({});

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    filterEvents(query, statusFilter);
  };

  const handleStatusFilter = (status: string) => {
    setStatusFilter(status);
    filterEvents(searchQuery, status);
  };

  const filterEvents = (query: string, status: string) => {
    let filtered = events;

    if (query) {
      filtered = filtered.filter(
        (event) =>
          event.title.toLowerCase().includes(query.toLowerCase()) ||
          event.location.toLowerCase().includes(query.toLowerCase()) ||
          event.description.toLowerCase().includes(query.toLowerCase())
      );
    }

    if (status !== "all") {
      filtered = filtered.filter((event) => event.status === status);
    }

    setFilteredEvents(filtered);
  };

  const handleAddEvent = () => {
    const event: Event = {
      id: Date.now().toString(),
      title: newEvent.title || "",
      date: newEvent.date || "",
      time: newEvent.time || "",
      location: newEvent.location || "",
      assignedStaff: newEvent.assignedStaff || [],
      description: newEvent.description || "",
      sendAnnouncement: newEvent.sendAnnouncement || false,
      status: "scheduled",
      createdAt: new Date().toISOString().split("T")[0],
    };

    setEvents([...events, event]);
    setFilteredEvents([...filteredEvents, event]);
    setNewEvent({});
    setIsAddModalOpen(false);
  };

  const handleEditEvent = (event: Event) => {
    setSelectedEvent(event);
    setIsEditModalOpen(true);
  };

  const handleDeleteEvent = (id: string) => {
    setEvents(events.filter((event) => event.id !== id));
    setFilteredEvents(filteredEvents.filter((event) => event.id !== id));
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const columns = [
    { key: "title", label: "Event Title" },
    {
      key: "date",
      label: "Date",
      render: (value: string) => formatDate(value),
    },
    { key: "time", label: "Time" },
    { key: "location", label: "Location" },
    {
      key: "assignedStaff",
      label: "Assigned Staff",
      render: (value: string[]) => value.join(", "),
    },
    {
      key: "status",
      label: "Status",
      render: (value: string) => (
        <Badge className={statusColors[value as keyof typeof statusColors]}>
          {value.charAt(0).toUpperCase() + value.slice(1)}
        </Badge>
      ),
    },
    {
      key: "actions",
      label: "Actions",
      render: (_: any, row: Event) => (
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleEditEvent(row)}
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-destructive"
            onClick={() => handleDeleteEvent(row.id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Event Management
          </h1>
          <p className="text-muted-foreground">
            Create and manage events and send optional announcements
          </p>
        </div>
        <Button onClick={() => setIsAddModalOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Create Event
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="card-enhanced">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Events
            </CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{events.length}</div>
          </CardContent>
        </Card>
        <Card className="card-enhanced">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Scheduled
            </CardTitle>
            <Badge className="bg-green-100 text-green-800">Scheduled</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {events.filter((e) => e.status === "scheduled").length}
            </div>
          </CardContent>
        </Card>
        <Card className="card-enhanced">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Completed
            </CardTitle>
            <Badge className="bg-blue-100 text-blue-800">Completed</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {events.filter((e) => e.status === "completed").length}
            </div>
          </CardContent>
        </Card>
        <Card className="card-enhanced">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              With Announcements
            </CardTitle>
            <Bell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {events.filter((e) => e.sendAnnouncement).length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Events Table */}
      <DataTable
        title="Events"
        columns={columns}
        data={filteredEvents}
        searchPlaceholder="Search events..."
        onSearch={handleSearch}
        filters={
          <select
            value={statusFilter}
            onChange={(e) => handleStatusFilter(e.target.value)}
            className="px-3 py-2 border border-input rounded-md text-sm"
          >
            <option value="all">All Status</option>
            <option value="scheduled">Scheduled</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        }
      />

      {/* Add Event Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Create Event"
        size="lg"
      >
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              label="Event Title"
              name="title"
              value={newEvent.title}
              onChange={(value) => setNewEvent({ ...newEvent, title: value })}
              required
            />
            <FormField
              label="Date"
              name="date"
              type="date"
              value={newEvent.date}
              onChange={(value) => setNewEvent({ ...newEvent, date: value })}
              required
            />
            <FormField
              label="Time"
              name="time"
              type="text"
              value={newEvent.time}
              onChange={(value) => setNewEvent({ ...newEvent, time: value })}
              placeholder="e.g., 14:00"
              required
            />
            <FormField
              label="Location"
              name="location"
              value={newEvent.location}
              onChange={(value) =>
                setNewEvent({ ...newEvent, location: value })
              }
              required
            />
          </div>

          <FormField
            label="Assigned Staff"
            name="assignedStaff"
            type="select"
            value=""
            onChange={(value) => {
              const staff = newEvent.assignedStaff || [];
              if (value && !staff.includes(value)) {
                setNewEvent({ ...newEvent, assignedStaff: [...staff, value] });
              }
            }}
            options={mockStaff.map((staff) => ({ value: staff, label: staff }))}
            placeholder="Select staff member"
          />

          {newEvent.assignedStaff && newEvent.assignedStaff.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {newEvent.assignedStaff.map((staff, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="cursor-pointer"
                >
                  {staff}
                  <button
                    onClick={() =>
                      setNewEvent({
                        ...newEvent,
                        assignedStaff: newEvent.assignedStaff?.filter(
                          (_, i) => i !== index
                        ),
                      })
                    }
                    className="ml-2 text-xs"
                  >
                    ×
                  </button>
                </Badge>
              ))}
            </div>
          )}

          <FormField
            label="Description"
            name="description"
            type="textarea"
            value={newEvent.description}
            onChange={(value) =>
              setNewEvent({ ...newEvent, description: value })
            }
            placeholder="Event description..."
            required
          />

          <div className="flex items-center space-x-2">
            <Switch
              id="announcement"
              checked={newEvent.sendAnnouncement}
              onCheckedChange={(checked) =>
                setNewEvent({ ...newEvent, sendAnnouncement: checked })
              }
            />
            <Label htmlFor="announcement">Send Announcement</Label>
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddEvent}>Create Event</Button>
          </div>
        </div>
      </Modal>

      {/* Edit Event Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title={`Edit Event - ${selectedEvent?.title}`}
        size="lg"
      >
        {selectedEvent && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                label="Event Title"
                name="title"
                value={selectedEvent.title}
                onChange={(value) =>
                  setSelectedEvent({ ...selectedEvent, title: value })
                }
                required
              />
              <FormField
                label="Date"
                name="date"
                type="date"
                value={selectedEvent.date}
                onChange={(value) =>
                  setSelectedEvent({ ...selectedEvent, date: value })
                }
                required
              />
              <FormField
                label="Time"
                name="time"
                type="text"
                value={selectedEvent.time}
                onChange={(value) =>
                  setSelectedEvent({ ...selectedEvent, time: value })
                }
                required
              />
              <FormField
                label="Location"
                name="location"
                value={selectedEvent.location}
                onChange={(value) =>
                  setSelectedEvent({ ...selectedEvent, location: value })
                }
                required
              />
            </div>

            <FormField
              label="Description"
              name="description"
              type="textarea"
              value={selectedEvent.description}
              onChange={(value) =>
                setSelectedEvent({ ...selectedEvent, description: value })
              }
              required
            />

            <div className="flex items-center space-x-2">
              <Switch
                id="edit-announcement"
                checked={selectedEvent.sendAnnouncement}
                onCheckedChange={(checked) =>
                  setSelectedEvent({
                    ...selectedEvent,
                    sendAnnouncement: checked,
                  })
                }
              />
              <Label htmlFor="edit-announcement">Send Announcement</Label>
            </div>

            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setIsEditModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  setEvents(
                    events.map((event) =>
                      event.id === selectedEvent.id ? selectedEvent : event
                    )
                  );
                  setFilteredEvents(
                    filteredEvents.map((event) =>
                      event.id === selectedEvent.id ? selectedEvent : event
                    )
                  );
                  setIsEditModalOpen(false);
                }}
              >
                Save Changes
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
