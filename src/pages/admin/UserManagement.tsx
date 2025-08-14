import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DataTable } from "@/components/ui/DataTable";
import { Modal } from "@/components/ui/Modal";
import { FormField } from "@/components/ui/FormField";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Eye, Edit, Trash2, Users, ArrowLeft } from "lucide-react";

interface User {
  id: string;
  name: string;
  role: "admin" | "instructor" | "student" | "parent";
  email: string;
  contact: string;
  birthday: string;
  genderIdentity: string;
  origin: string;
  allergens?: string;
  cautions?: string;
  parentInfo?: string;
}

const mockUsers: User[] = [
  {
    id: "1",
    name: "Alice Johnson",
    role: "student",
    email: "alice.johnson@school.edu",
    contact: "+1 (555) 123-4567",
    birthday: "2005-03-15",
    genderIdentity: "Female",
    origin: "New York, NY",
    allergens: "Peanuts, Shellfish",
    cautions: "Asthma - carries inhaler",
    parentInfo:
      "John Johnson (Father) - +1 (555) 123-4568\nMary Johnson (Mother) - +1 (555) 123-4569",
  },
  {
    id: "2",
    name: "Bob Smith",
    role: "instructor",
    email: "bob.smith@school.edu",
    contact: "+1 (555) 234-5678",
    birthday: "1985-07-22",
    genderIdentity: "Male",
    origin: "Boston, MA",
  },
  {
    id: "3",
    name: "Carol Davis",
    role: "parent",
    email: "carol.davis@email.com",
    contact: "+1 (555) 345-6789",
    birthday: "1978-11-08",
    genderIdentity: "Female",
    origin: "Chicago, IL",
  },
  {
    id: "4",
    name: "David Wilson",
    role: "student",
    email: "david.wilson@school.edu",
    contact: "+1 (555) 456-7890",
    birthday: "2006-01-30",
    genderIdentity: "Male",
    origin: "Los Angeles, CA",
    allergens: "None",
    cautions: "ADHD - requires frequent breaks",
    parentInfo: "Sarah Wilson (Mother) - +1 (555) 456-7891",
  },
];

export default function UserManagement() {
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [filteredUsers, setFilteredUsers] = useState<User[]>(mockUsers);
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [newUser, setNewUser] = useState<Partial<User>>({});

  const roleOptions = [
    { value: "all", label: "All Roles" },
    { value: "admin", label: "Administrator" },
    { value: "instructor", label: "Instructor" },
    { value: "student", label: "Student" },
    { value: "parent", label: "Parent" },
  ];

  const roleColors = {
    admin: "bg-red-100 text-red-800",
    instructor: "bg-blue-100 text-blue-800",
    student: "bg-green-100 text-green-800",
    parent: "bg-purple-100 text-purple-800",
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    filterUsers(query, roleFilter);
  };

  const handleRoleFilter = (role: string) => {
    setRoleFilter(role);
    filterUsers(searchQuery, role);
  };

  const filterUsers = (query: string, role: string) => {
    let filtered = users;

    if (query) {
      filtered = filtered.filter(
        (user) =>
          user.name.toLowerCase().includes(query.toLowerCase()) ||
          user.email.toLowerCase().includes(query.toLowerCase())
      );
    }

    if (role !== "all") {
      filtered = filtered.filter((user) => user.role === role);
    }

    setFilteredUsers(filtered);
  };

  const handleViewUser = (user: User) => {
    setSelectedUser(user);
    setIsViewModalOpen(true);
  };

  const handleAddUser = () => {
    const user: User = {
      id: Date.now().toString(),
      name: newUser.name || "",
      role: (newUser.role as any) || "student",
      email: newUser.email || "",
      contact: newUser.contact || "",
      birthday: newUser.birthday || "",
      genderIdentity: newUser.genderIdentity || "",
      origin: newUser.origin || "",
      allergens: newUser.allergens,
      cautions: newUser.cautions,
      parentInfo: newUser.parentInfo,
    };

    setUsers([...users, user]);
    setFilteredUsers([...filteredUsers, user]);
    setNewUser({});
    setIsAddModalOpen(false);
  };

  const columns = [
    { key: "name", label: "Name" },
    {
      key: "role",
      label: "Role",
      render: (value: string) => (
        <Badge className={roleColors[value as keyof typeof roleColors]}>
          {value.charAt(0).toUpperCase() + value.slice(1)}
        </Badge>
      ),
    },
    { key: "email", label: "Email" },
    { key: "contact", label: "Contact" },
    { key: "birthday", label: "Birthday" },
    { key: "genderIdentity", label: "Gender Identity" },
    { key: "origin", label: "Origin" },
    {
      key: "actions",
      label: "Actions",
      render: (_: any, row: User) => (
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={() => handleViewUser(row)}>
            <Eye className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <Edit className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" className="text-destructive">
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
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => navigate("/")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              User Management
            </h1>
            <p className="text-muted-foreground">
              Add, edit, or delete users (Students, Instructors, Parents,
              Admins)
            </p>
          </div>
        </div>
        <Button onClick={() => setIsAddModalOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add New User
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="card-enhanced">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Users
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{users.length}</div>
          </CardContent>
        </Card>
        <Card className="card-enhanced">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Students
            </CardTitle>
            <Badge className="bg-green-100 text-green-800">Student</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {users.filter((u) => u.role === "student").length}
            </div>
          </CardContent>
        </Card>
        <Card className="card-enhanced">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Instructors
            </CardTitle>
            <Badge className="bg-blue-100 text-blue-800">Instructor</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {users.filter((u) => u.role === "instructor").length}
            </div>
          </CardContent>
        </Card>
        <Card className="card-enhanced">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Parents
            </CardTitle>
            <Badge className="bg-purple-100 text-purple-800">Parent</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {users.filter((u) => u.role === "parent").length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Users Table */}
      <DataTable
        title="Users"
        columns={columns}
        data={filteredUsers}
        searchPlaceholder="Search users..."
        onSearch={handleSearch}
        onExport={() => console.log("Export users")}
        filters={
          <Select value={roleFilter} onValueChange={handleRoleFilter}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {roleOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        }
      />

      {/* Add User Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add New User"
        size="lg"
      >
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              label="Full Name"
              name="name"
              value={newUser.name}
              onChange={(value) => setNewUser({ ...newUser, name: value })}
              required
            />
            <FormField
              label="Role"
              name="role"
              type="select"
              value={newUser.role}
              onChange={(value) =>
                setNewUser({ ...newUser, role: value as any })
              }
              options={[
                { value: "admin", label: "Administrator" },
                { value: "instructor", label: "Instructor" },
                { value: "student", label: "Student" },
                { value: "parent", label: "Parent" },
              ]}
              required
            />
            <FormField
              label="Email"
              name="email"
              type="email"
              value={newUser.email}
              onChange={(value) => setNewUser({ ...newUser, email: value })}
              required
            />
            <FormField
              label="Contact"
              name="contact"
              type="tel"
              value={newUser.contact}
              onChange={(value) => setNewUser({ ...newUser, contact: value })}
              required
            />
            <FormField
              label="Birthday"
              name="birthday"
              type="date"
              value={newUser.birthday}
              onChange={(value) => setNewUser({ ...newUser, birthday: value })}
              required
            />
            <FormField
              label="Gender Identity"
              name="genderIdentity"
              value={newUser.genderIdentity}
              onChange={(value) =>
                setNewUser({ ...newUser, genderIdentity: value })
              }
              required
            />
            <FormField
              label="Origin"
              name="origin"
              value={newUser.origin}
              onChange={(value) => setNewUser({ ...newUser, origin: value })}
              required
            />
          </div>

          {newUser.role === "student" && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Student Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  label="Allergens"
                  name="allergens"
                  type="textarea"
                  value={newUser.allergens}
                  onChange={(value) =>
                    setNewUser({ ...newUser, allergens: value })
                  }
                  placeholder="List any food allergies or sensitivities..."
                />
                <FormField
                  label="Physical/Mental Cautions"
                  name="cautions"
                  type="textarea"
                  value={newUser.cautions}
                  onChange={(value) =>
                    setNewUser({ ...newUser, cautions: value })
                  }
                  placeholder="Any medical conditions, medications, or special needs..."
                />
              </div>
              <FormField
                label="Parent Information"
                name="parentInfo"
                type="textarea"
                value={newUser.parentInfo}
                onChange={(value) =>
                  setNewUser({ ...newUser, parentInfo: value })
                }
                placeholder="Parent name(s) and contact information..."
              />
            </div>
          )}

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddUser}>Add User</Button>
          </div>
        </div>
      </Modal>

      {/* View User Modal */}
      <Modal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        title={`User Details - ${selectedUser?.name}`}
        size="lg"
      >
        {selectedUser && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Name
                </label>
                <p className="text-sm">{selectedUser.name}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Role
                </label>
                <Badge className={roleColors[selectedUser.role]}>
                  {selectedUser.role.charAt(0).toUpperCase() +
                    selectedUser.role.slice(1)}
                </Badge>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Email
                </label>
                <p className="text-sm">{selectedUser.email}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Contact
                </label>
                <p className="text-sm">{selectedUser.contact}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Birthday
                </label>
                <p className="text-sm">{selectedUser.birthday}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Gender Identity
                </label>
                <p className="text-sm">{selectedUser.genderIdentity}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Origin
                </label>
                <p className="text-sm">{selectedUser.origin}</p>
              </div>
            </div>

            {selectedUser.role === "student" && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Student Information</h3>
                {selectedUser.allergens && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">
                      Allergens
                    </label>
                    <p className="text-sm">{selectedUser.allergens}</p>
                  </div>
                )}
                {selectedUser.cautions && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">
                      Physical/Mental Cautions
                    </label>
                    <p className="text-sm">{selectedUser.cautions}</p>
                  </div>
                )}
                {selectedUser.parentInfo && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">
                      Parent Information
                    </label>
                    <p className="text-sm whitespace-pre-line">
                      {selectedUser.parentInfo}
                    </p>
                  </div>
                )}
              </div>
            )}

            <div className="flex justify-end">
              <Button
                variant="outline"
                onClick={() => setIsViewModalOpen(false)}
              >
                Close
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
