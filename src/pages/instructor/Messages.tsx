import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ChatMessageBubble } from "@/components/instructor/ChatMessageBubble";
import { MessageCircle, Send, User, Clock, Search } from "lucide-react";

interface Message {
  id: string;
  text: string;
  sender: "instructor" | "student";
  timestamp: string;
  isRead?: boolean;
}

interface Student {
  id: string;
  name: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  messages: Message[];
}

const mockStudents: Student[] = [
  {
    id: "1",
    name: "Alice Johnson",
    lastMessage: "Can I get permission to leave campus this weekend?",
    lastMessageTime: "2 minutes ago",
    unreadCount: 1,
    messages: [
      {
        id: "1",
        text: "Hi Ms. Smith, I have a question about the weekend policy.",
        sender: "student",
        timestamp: "10:30 AM",
      },
      {
        id: "2",
        text: "Of course Alice, what would you like to know?",
        sender: "instructor",
        timestamp: "10:32 AM",
      },
      {
        id: "3",
        text: "Can I get permission to leave campus this weekend?",
        sender: "student",
        timestamp: "10:35 AM",
        isRead: false,
      },
    ],
  },
  {
    id: "2",
    name: "Bob Smith",
    lastMessage: "Thank you for the clarification!",
    lastMessageTime: "1 hour ago",
    unreadCount: 0,
    messages: [
      {
        id: "1",
        text: "Ms. Smith, I'm confused about the new attendance policy.",
        sender: "student",
        timestamp: "9:15 AM",
      },
      {
        id: "2",
        text: "Let me explain the new policy to you...",
        sender: "instructor",
        timestamp: "9:20 AM",
      },
      {
        id: "3",
        text: "Thank you for the clarification!",
        sender: "student",
        timestamp: "9:25 AM",
      },
    ],
  },
  {
    id: "3",
    name: "Carol Davis",
    lastMessage: "I'll be late to class today due to a doctor appointment.",
    lastMessageTime: "3 hours ago",
    unreadCount: 0,
    messages: [
      {
        id: "1",
        text: "I'll be late to class today due to a doctor appointment.",
        sender: "student",
        timestamp: "8:00 AM",
      },
      {
        id: "2",
        text: "No problem Carol, I hope everything is okay. See you when you arrive.",
        sender: "instructor",
        timestamp: "8:05 AM",
      },
    ],
  },
  {
    id: "4",
    name: "David Wilson",
    lastMessage: "Is there any homework due tomorrow?",
    lastMessageTime: "5 hours ago",
    unreadCount: 0,
    messages: [
      {
        id: "1",
        text: "Is there any homework due tomorrow?",
        sender: "student",
        timestamp: "6:30 PM",
      },
      {
        id: "2",
        text: "Yes, please complete the reading assignment from Chapter 5.",
        sender: "instructor",
        timestamp: "6:35 PM",
      },
    ],
  },
  {
    id: "5",
    name: "Emma Brown",
    lastMessage: "I need help with the math assignment.",
    lastMessageTime: "1 day ago",
    unreadCount: 0,
    messages: [
      {
        id: "1",
        text: "I need help with the math assignment.",
        sender: "student",
        timestamp: "Yesterday",
      },
      {
        id: "2",
        text: "I'd be happy to help! Can you come to my office hours tomorrow?",
        sender: "instructor",
        timestamp: "Yesterday",
      },
    ],
  },
];

export default function Messages() {
  const [students, setStudents] = useState<Student[]>(mockStudents);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(
    students[0]
  );
  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedStudent) return;

    const message: Message = {
      id: Date.now().toString(),
      text: newMessage,
      sender: "instructor",
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setStudents((prev) =>
      prev.map((student) =>
        student.id === selectedStudent.id
          ? {
              ...student,
              lastMessage: newMessage,
              lastMessageTime: "Just now",
              unreadCount: 0,
              messages: [...student.messages, message],
            }
          : student
      )
    );

    setSelectedStudent((prev) =>
      prev
        ? {
            ...prev,
            lastMessage: newMessage,
            lastMessageTime: "Just now",
            unreadCount: 0,
            messages: [...prev.messages, message],
          }
        : null
    );

    setNewMessage("");
  };

  const handleStudentSelect = (student: Student) => {
    setSelectedStudent(student);
    // Mark messages as read
    setStudents((prev) =>
      prev.map((s) =>
        s.id === student.id
          ? {
              ...s,
              unreadCount: 0,
              messages: s.messages.map((m) => ({ ...m, isRead: true })),
            }
          : s
      )
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Messages</h1>
        <p className="text-muted-foreground">
          Review and respond to student messages
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
        {/* Student List */}
        <Card className="card-enhanced">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5" />
              Students
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search students..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="space-y-2 max-h-[500px] overflow-y-auto">
              {filteredStudents.map((student) => (
                <div
                  key={student.id}
                  className={`p-3 rounded-lg cursor-pointer transition-colors ${
                    selectedStudent?.id === student.id
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-muted"
                  }`}
                  onClick={() => handleStudentSelect(student)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 bg-primary/10 rounded-full flex items-center justify-center">
                        <User className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{student.name}</p>
                        <p
                          className={`text-sm ${
                            selectedStudent?.id === student.id
                              ? "text-primary-foreground/70"
                              : "text-muted-foreground"
                          }`}
                        >
                          {student.lastMessage}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p
                        className={`text-xs ${
                          selectedStudent?.id === student.id
                            ? "text-primary-foreground/70"
                            : "text-muted-foreground"
                        }`}
                      >
                        {student.lastMessageTime}
                      </p>
                      {student.unreadCount > 0 && (
                        <Badge className="mt-1 bg-red-500 text-white">
                          {student.unreadCount}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Chat Area */}
        <div className="lg:col-span-2">
          <Card className="card-enhanced h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                {selectedStudent ? selectedStudent.name : "Select a student"}
              </CardTitle>
            </CardHeader>
            <CardContent className="h-full flex flex-col">
              {selectedStudent ? (
                <>
                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto space-y-4 mb-4">
                    {selectedStudent.messages.map((message) => (
                      <ChatMessageBubble key={message.id} message={message} />
                    ))}
                  </div>

                  {/* Message Input */}
                  <div className="flex gap-2">
                    <Input
                      placeholder="Type your message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) =>
                        e.key === "Enter" && handleSendMessage()
                      }
                      className="flex-1"
                    />
                    <Button
                      onClick={handleSendMessage}
                      disabled={!newMessage.trim()}
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center text-muted-foreground">
                  <div className="text-center">
                    <MessageCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Select a student to start messaging</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
