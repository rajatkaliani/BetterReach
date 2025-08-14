import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageCircle, User, Clock, Send, Search } from "lucide-react";

interface Message {
  id: string;
  from: string;
  subject: string;
  content: string;
  time: string;
  read: boolean;
  messages?: ChatMessage[];
}

interface ChatMessage {
  id: string;
  text: string;
  sender: "parent" | "instructor" | "admin";
  timestamp: string;
}

export default function Messages() {
  const [messages] = useState<Message[]>([
    {
      id: "1",
      from: "Principal Johnson",
      subject: "Parent-Teacher Conference",
      content: "We would like to schedule a parent-teacher conference.",
      time: "2 hours ago",
      read: false,
      messages: [
        {
          id: "1",
          text: "Hello, we would like to schedule a parent-teacher conference for Jamie.",
          sender: "admin",
          timestamp: "10:30 AM",
        },
        {
          id: "2",
          text: "Thank you for reaching out. I would be happy to attend. What times are available?",
          sender: "parent",
          timestamp: "10:35 AM",
        },
        {
          id: "3",
          text: "We have slots available on March 20th at 3:00 PM or March 22nd at 4:00 PM.",
          sender: "admin",
          timestamp: "10:40 AM",
        },
      ],
    },
    {
      id: "2",
      from: "Math Teacher - Mrs. Davis",
      subject: "Progress Report Available",
      content: "Alex's progress report is now available for review.",
      time: "1 day ago",
      read: true,
      messages: [
        {
          id: "1",
          text: "Hello, Alex's progress report for the current semester is now available.",
          sender: "instructor",
          timestamp: "Yesterday",
        },
        {
          id: "2",
          text: "Thank you for the update. I'll review it right away.",
          sender: "parent",
          timestamp: "Yesterday",
        },
        {
          id: "3",
          text: "Alex has been doing very well in class. Keep up the great work!",
          sender: "instructor",
          timestamp: "Yesterday",
        },
      ],
    },
    {
      id: "3",
      from: "School Nurse",
      subject: "Health Check Reminder",
      content: "Reminder for annual health checkup.",
      time: "2 days ago",
      read: true,
      messages: [
        {
          id: "1",
          text: "This is a reminder that Jamie's annual health checkup is due next month.",
          sender: "admin",
          timestamp: "2 days ago",
        },
        {
          id: "2",
          text: "Thank you for the reminder. I'll schedule an appointment soon.",
          sender: "parent",
          timestamp: "2 days ago",
        },
      ],
    },
  ]);

  const [selectedMessage, setSelectedMessage] = useState<Message | null>(
    messages[0]
  );
  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredMessages = messages.filter(
    (message) =>
      message.from.toLowerCase().includes(searchQuery.toLowerCase()) ||
      message.subject.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedMessage) return;

    const chatMessage: ChatMessage = {
      id: Date.now().toString(),
      text: newMessage,
      sender: "parent",
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    // Update the selected message with the new chat message
    setSelectedMessage((prev) =>
      prev
        ? {
            ...prev,
            messages: [...(prev.messages || []), chatMessage],
          }
        : null
    );

    setNewMessage("");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Messages</h1>
        <p className="text-muted-foreground">
          Communicate with school staff and administrators
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
        {/* Message List */}
        <Card className="card-enhanced">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5" />
              Conversations
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search messages..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="space-y-2 max-h-[500px] overflow-y-auto">
              {filteredMessages.map((message) => (
                <div
                  key={message.id}
                  className={`p-3 rounded-lg cursor-pointer transition-colors ${
                    selectedMessage?.id === message.id
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-muted"
                  }`}
                  onClick={() => setSelectedMessage(message)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 bg-primary/10 rounded-full flex items-center justify-center">
                        <User className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{message.from}</p>
                        <p
                          className={`text-sm ${
                            selectedMessage?.id === message.id
                              ? "text-primary-foreground/70"
                              : "text-muted-foreground"
                          }`}
                        >
                          {message.subject}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p
                        className={`text-xs ${
                          selectedMessage?.id === message.id
                            ? "text-primary-foreground/70"
                            : "text-muted-foreground"
                        }`}
                      >
                        {message.time}
                      </p>
                      {!message.read && (
                        <Badge className="mt-1 bg-blue-500 text-white">
                          New
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Chat Window */}
        <div className="lg:col-span-2">
          <Card className="card-enhanced h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                {selectedMessage
                  ? selectedMessage.from
                  : "Select a conversation"}
              </CardTitle>
            </CardHeader>
            <CardContent className="h-full flex flex-col">
              {selectedMessage ? (
                <>
                  {/* Chat Messages */}
                  <div className="flex-1 overflow-y-auto space-y-4 mb-4">
                    {selectedMessage.messages?.map((chatMessage) => (
                      <div
                        key={chatMessage.id}
                        className={`flex ${
                          chatMessage.sender === "parent"
                            ? "justify-end"
                            : "justify-start"
                        }`}
                      >
                        <div
                          className={`max-w-xs lg:max-w-md ${
                            chatMessage.sender === "parent"
                              ? "order-2"
                              : "order-1"
                          }`}
                        >
                          <div
                            className={`p-3 rounded-lg ${
                              chatMessage.sender === "parent"
                                ? "bg-primary text-primary-foreground"
                                : "bg-muted"
                            }`}
                          >
                            <p className="text-sm">{chatMessage.text}</p>
                            <p
                              className={`text-xs mt-1 ${
                                chatMessage.sender === "parent"
                                  ? "text-primary-foreground/70"
                                  : "text-muted-foreground"
                              }`}
                            >
                              {chatMessage.timestamp}
                            </p>
                          </div>
                        </div>
                      </div>
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
                    <p>Select a conversation to start messaging</p>
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
