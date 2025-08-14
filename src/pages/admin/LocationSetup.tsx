import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DataTable } from "@/components/ui/DataTable";
import { Modal } from "@/components/ui/Modal";
import { FormField } from "@/components/ui/FormField";
import { Plus, MapPin, Edit, Trash2, Building2 } from "lucide-react";

interface Location {
  id: string;
  name: string;
  type:
    | "dorm"
    | "classroom"
    | "dining"
    | "library"
    | "gym"
    | "office"
    | "other";
  description: string;
  building: string;
  floor?: string;
  capacity?: number;
  isActive: boolean;
}

const mockLocations: Location[] = [
  {
    id: "1",
    name: "Main Library",
    type: "library",
    description: "Central library with study spaces and computer labs",
    building: "Academic Building A",
    floor: "1st Floor",
    capacity: 200,
    isActive: true,
  },
  {
    id: "2",
    name: "Dining Hall",
    type: "dining",
    description: "Main cafeteria serving breakfast, lunch, and dinner",
    building: "Student Center",
    floor: "Ground Floor",
    capacity: 500,
    isActive: true,
  },
  {
    id: "3",
    name: "Science Lab 101",
    type: "classroom",
    description: "Chemistry laboratory with safety equipment",
    building: "Science Building",
    floor: "1st Floor",
    capacity: 30,
    isActive: true,
  },
  {
    id: "4",
    name: "Boys Dormitory - East Wing",
    type: "dorm",
    description: "Male student housing with shared facilities",
    building: "Residence Hall B",
    floor: "2nd Floor",
    capacity: 50,
    isActive: true,
  },
  {
    id: "5",
    name: "Gymnasium",
    type: "gym",
    description: "Multi-purpose sports facility with basketball courts",
    building: "Athletic Center",
    floor: "Ground Floor",
    capacity: 300,
    isActive: true,
  },
  {
    id: "6",
    name: "Administrative Office",
    type: "office",
    description: "Main administrative offices and student services",
    building: "Administration Building",
    floor: "1st Floor",
    capacity: 20,
    isActive: true,
  },
];

const locationTypeOptions = [
  { value: "dorm", label: "Dormitory" },
  { value: "classroom", label: "Classroom" },
  { value: "dining", label: "Dining" },
  { value: "library", label: "Library" },
  { value: "gym", label: "Gymnasium" },
  { value: "office", label: "Office" },
  { value: "other", label: "Other" },
];

const typeColors = {
  dorm: "bg-blue-100 text-blue-800",
  classroom: "bg-green-100 text-green-800",
  dining: "bg-orange-100 text-orange-800",
  library: "bg-purple-100 text-purple-800",
  gym: "bg-red-100 text-red-800",
  office: "bg-gray-100 text-gray-800",
  other: "bg-yellow-100 text-yellow-800",
};

export default function LocationSetup() {
  const [locations, setLocations] = useState<Location[]>(mockLocations);
  const [filteredLocations, setFilteredLocations] =
    useState<Location[]>(mockLocations);
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(
    null
  );
  const [newLocation, setNewLocation] = useState<Partial<Location>>({});

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    filterLocations(query, typeFilter);
  };

  const handleTypeFilter = (type: string) => {
    setTypeFilter(type);
    filterLocations(searchQuery, type);
  };

  const filterLocations = (query: string, type: string) => {
    let filtered = locations;

    if (query) {
      filtered = filtered.filter(
        (location) =>
          location.name.toLowerCase().includes(query.toLowerCase()) ||
          location.building.toLowerCase().includes(query.toLowerCase()) ||
          location.description.toLowerCase().includes(query.toLowerCase())
      );
    }

    if (type !== "all") {
      filtered = filtered.filter((location) => location.type === type);
    }

    setFilteredLocations(filtered);
  };

  const handleAddLocation = () => {
    const location: Location = {
      id: Date.now().toString(),
      name: newLocation.name || "",
      type: (newLocation.type as any) || "other",
      description: newLocation.description || "",
      building: newLocation.building || "",
      floor: newLocation.floor,
      capacity: newLocation.capacity
        ? parseInt(newLocation.capacity.toString())
        : undefined,
      isActive: true,
    };

    setLocations([...locations, location]);
    setFilteredLocations([...filteredLocations, location]);
    setNewLocation({});
    setIsAddModalOpen(false);
  };

  const handleEditLocation = (location: Location) => {
    setSelectedLocation(location);
    setIsEditModalOpen(true);
  };

  const handleDeleteLocation = (id: string) => {
    setLocations(locations.filter((loc) => loc.id !== id));
    setFilteredLocations(filteredLocations.filter((loc) => loc.id !== id));
  };

  const columns = [
    { key: "name", label: "Location Name" },
    {
      key: "type",
      label: "Type",
      render: (value: string) => (
        <Badge className={typeColors[value as keyof typeof typeColors]}>
          {locationTypeOptions.find((opt) => opt.value === value)?.label ||
            value}
        </Badge>
      ),
    },
    { key: "building", label: "Building" },
    { key: "floor", label: "Floor" },
    { key: "capacity", label: "Capacity" },
    {
      key: "isActive",
      label: "Status",
      render: (value: boolean) => (
        <Badge variant={value ? "default" : "secondary"}>
          {value ? "Active" : "Inactive"}
        </Badge>
      ),
    },
    {
      key: "actions",
      label: "Actions",
      render: (_: any, row: Location) => (
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleEditLocation(row)}
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-destructive"
            onClick={() => handleDeleteLocation(row.id)}
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
            Campus Locations
          </h1>
          <p className="text-muted-foreground">
            Add or edit predefined campus locations for tracking attendance
          </p>
        </div>
        <Button onClick={() => setIsAddModalOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add New Location
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="card-enhanced">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Locations
            </CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{locations.length}</div>
          </CardContent>
        </Card>
        <Card className="card-enhanced">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Active Locations
            </CardTitle>
            <Badge variant="default">Active</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {locations.filter((l) => l.isActive).length}
            </div>
          </CardContent>
        </Card>
        <Card className="card-enhanced">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Classrooms
            </CardTitle>
            <Badge className="bg-green-100 text-green-800">Classroom</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {locations.filter((l) => l.type === "classroom").length}
            </div>
          </CardContent>
        </Card>
        <Card className="card-enhanced">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Dormitories
            </CardTitle>
            <Badge className="bg-blue-100 text-blue-800">Dormitory</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {locations.filter((l) => l.type === "dorm").length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Locations Table */}
      <DataTable
        title="Locations"
        columns={columns}
        data={filteredLocations}
        searchPlaceholder="Search locations..."
        onSearch={handleSearch}
        filters={
          <select
            value={typeFilter}
            onChange={(e) => handleTypeFilter(e.target.value)}
            className="px-3 py-2 border border-input rounded-md text-sm"
          >
            <option value="all">All Types</option>
            {locationTypeOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        }
      />

      {/* Add Location Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add New Location"
        size="lg"
      >
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              label="Location Name"
              name="name"
              value={newLocation.name}
              onChange={(value) =>
                setNewLocation({ ...newLocation, name: value })
              }
              required
            />
            <FormField
              label="Type"
              name="type"
              type="select"
              value={newLocation.type}
              onChange={(value) =>
                setNewLocation({ ...newLocation, type: value as any })
              }
              options={locationTypeOptions}
              required
            />
            <FormField
              label="Building"
              name="building"
              value={newLocation.building}
              onChange={(value) =>
                setNewLocation({ ...newLocation, building: value })
              }
              required
            />
            <FormField
              label="Floor"
              name="floor"
              value={newLocation.floor}
              onChange={(value) =>
                setNewLocation({ ...newLocation, floor: value })
              }
              placeholder="e.g., 1st Floor, Ground Floor"
            />
            <FormField
              label="Capacity"
              name="capacity"
              type="text"
              value={newLocation.capacity?.toString()}
              onChange={(value) =>
                setNewLocation({
                  ...newLocation,
                  capacity: parseInt(value) || undefined,
                })
              }
              placeholder="Maximum number of people"
            />
          </div>

          <FormField
            label="Description"
            name="description"
            type="textarea"
            value={newLocation.description}
            onChange={(value) =>
              setNewLocation({ ...newLocation, description: value })
            }
            placeholder="Brief description of the location..."
            required
          />

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddLocation}>Add Location</Button>
          </div>
        </div>
      </Modal>

      {/* Edit Location Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title={`Edit Location - ${selectedLocation?.name}`}
        size="lg"
      >
        {selectedLocation && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                label="Location Name"
                name="name"
                value={selectedLocation.name}
                onChange={(value) =>
                  setSelectedLocation({ ...selectedLocation, name: value })
                }
                required
              />
              <FormField
                label="Type"
                name="type"
                type="select"
                value={selectedLocation.type}
                onChange={(value) =>
                  setSelectedLocation({
                    ...selectedLocation,
                    type: value as any,
                  })
                }
                options={locationTypeOptions}
                required
              />
              <FormField
                label="Building"
                name="building"
                value={selectedLocation.building}
                onChange={(value) =>
                  setSelectedLocation({ ...selectedLocation, building: value })
                }
                required
              />
              <FormField
                label="Floor"
                name="floor"
                value={selectedLocation.floor}
                onChange={(value) =>
                  setSelectedLocation({ ...selectedLocation, floor: value })
                }
              />
              <FormField
                label="Capacity"
                name="capacity"
                type="text"
                value={selectedLocation.capacity?.toString()}
                onChange={(value) =>
                  setSelectedLocation({
                    ...selectedLocation,
                    capacity: parseInt(value) || undefined,
                  })
                }
              />
            </div>

            <FormField
              label="Description"
              name="description"
              type="textarea"
              value={selectedLocation.description}
              onChange={(value) =>
                setSelectedLocation({ ...selectedLocation, description: value })
              }
              required
            />

            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setIsEditModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  setLocations(
                    locations.map((loc) =>
                      loc.id === selectedLocation.id ? selectedLocation : loc
                    )
                  );
                  setFilteredLocations(
                    filteredLocations.map((loc) =>
                      loc.id === selectedLocation.id ? selectedLocation : loc
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
