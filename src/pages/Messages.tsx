import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Send, Search, MessageCircle } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"

interface Contact {
  id: string
  name: string
  role: string
  lastMessage: string
  timestamp: string
  unreadCount: number
  online: boolean
}

interface Message {
  id: string
  senderId: string
  content: string
  timestamp: string
  sent: boolean
}

export default function Messages() {
  const [selectedContact, setSelectedContact] = useState<string>("1")
  const [messageInput, setMessageInput] = useState("")
  const [searchTerm, setSearchTerm] = useState("")

  const contacts: Contact[] = [
    {
      id: "1",
      name: "Dr. Sarah Johnson",
      role: "Dean of Students",
      lastMessage: "Can you check on the students in Dorm A?",
      timestamp: "2 min ago",
      unreadCount: 2,
      online: true
    },
    {
      id: "2",
      name: "Mike Rodriguez",
      role: "Security Officer",
      lastMessage: "All clear on the evening patrol",
      timestamp: "15 min ago",
      unreadCount: 0,
      online: true
    },
    {
      id: "3",
      name: "Emma Davis",
      role: "Resident Advisor",
      lastMessage: "Thanks for the update!",
      timestamp: "1 hour ago",
      unreadCount: 1,
      online: false
    },
    {
      id: "4",
      name: "John Smith",
      role: "Maintenance",
      lastMessage: "The heater in Building B is fixed",
      timestamp: "2 hours ago",
      unreadCount: 0,
      online: false
    }
  ]

  const messages: { [contactId: string]: Message[] } = {
    "1": [
      {
        id: "1",
        senderId: "1",
        content: "Good morning! How is everything going with the roll call?",
        timestamp: "9:30 AM",
        sent: false
      },
      {
        id: "2",
        senderId: "me",
        content: "Good morning Dr. Johnson! Everything is running smoothly. We have 245 students checked in.",
        timestamp: "9:32 AM",
        sent: true
      },
      {
        id: "3",
        senderId: "1",
        content: "That's great to hear. Can you check on the students in Dorm A? We had a few reports of noise complaints.",
        timestamp: "9:35 AM",
        sent: false
      },
      {
        id: "4",
        senderId: "1",
        content: "Please let me know what you find.",
        timestamp: "9:35 AM",
        sent: false
      }
    ],
    "2": [
      {
        id: "1",
        senderId: "2",
        content: "Evening patrol completed. All dormitories secure.",
        timestamp: "10:45 PM",
        sent: false
      },
      {
        id: "2",
        senderId: "me",
        content: "Thanks Mike! Any issues to report?",
        timestamp: "10:46 PM",
        sent: true
      },
      {
        id: "3",
        senderId: "2",
        content: "All clear on the evening patrol. Students are settling in for the night.",
        timestamp: "10:47 PM",
        sent: false
      }
    ]
  }

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.role.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const selectedContactData = contacts.find(c => c.id === selectedContact)
  const currentMessages = messages[selectedContact] || []

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      // Here you would typically send the message to your backend
      setMessageInput("")
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Messages</h1>
        <p className="text-muted-foreground">Communicate with staff and administrators</p>
      </div>

      {/* Messages Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
        {/* Contacts List */}
        <Card className="card-enhanced lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5 text-primary" />
              Contacts
            </CardTitle>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search contacts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-full">
              <div className="space-y-2 p-4">
                {filteredContacts.map((contact) => (
                  <div
                    key={contact.id}
                    onClick={() => setSelectedContact(contact.id)}
                    className={`p-3 rounded-lg cursor-pointer transition-colors ${
                      selectedContact === contact.id
                        ? "bg-primary/10 border border-primary/20"
                        : "hover:bg-muted/50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback className="bg-primary/10 text-primary">
                            {contact.name.split(" ").map(n => n[0]).join("")}
                          </AvatarFallback>
                        </Avatar>
                        {contact.online && (
                          <div className="absolute -bottom-1 -right-1 h-3 w-3 bg-success rounded-full border-2 border-card"></div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium text-foreground truncate">{contact.name}</h3>
                          {contact.unreadCount > 0 && (
                            <Badge className="badge-success text-xs">
                              {contact.unreadCount}
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground">{contact.role}</p>
                        <p className="text-sm text-muted-foreground truncate mt-1">
                          {contact.lastMessage}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">{contact.timestamp}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Chat Area */}
        <Card className="card-enhanced lg:col-span-2 flex flex-col">
          {selectedContactData ? (
            <>
              {/* Chat Header */}
              <CardHeader className="border-b border-border/50">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {selectedContactData.name.split(" ").map(n => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium text-foreground">{selectedContactData.name}</h3>
                    <p className="text-sm text-muted-foreground">{selectedContactData.role}</p>
                  </div>
                </div>
              </CardHeader>

              {/* Messages */}
              <CardContent className="flex-1 p-0">
                <ScrollArea className="h-full p-4">
                  <div className="space-y-4">
                    {currentMessages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.sent ? "justify-end" : "justify-start"}`}
                      >
                        <div className={`max-w-[70%] ${
                          message.sent ? "chat-bubble-sent" : "chat-bubble-received"
                        }`}>
                          <p className="text-sm">{message.content}</p>
                          <p className={`text-xs mt-1 opacity-70`}>
                            {message.timestamp}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>

              {/* Message Input */}
              <div className="p-4 border-t border-border/50">
                <div className="flex gap-2">
                  <Input
                    placeholder="Type your message..."
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="flex-1"
                  />
                  <Button onClick={handleSendMessage} disabled={!messageInput.trim()}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <MessageCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium text-foreground">Select a conversation</h3>
                <p className="text-muted-foreground">Choose a contact to start messaging</p>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}