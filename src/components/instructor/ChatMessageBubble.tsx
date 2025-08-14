import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, Clock } from "lucide-react";

interface Message {
  id: string;
  text: string;
  sender: "instructor" | "student";
  timestamp: string;
  isRead?: boolean;
}

interface ChatMessageBubbleProps {
  message: Message;
}

export function ChatMessageBubble({ message }: ChatMessageBubbleProps) {
  const isInstructor = message.sender === "instructor";

  return (
    <div
      className={`flex ${isInstructor ? "justify-end" : "justify-start"} mb-4`}
    >
      <div
        className={`max-w-xs lg:max-w-md ${
          isInstructor ? "order-2" : "order-1"
        }`}
      >
        <Card
          className={`card-enhanced ${
            isInstructor ? "bg-primary text-primary-foreground" : "bg-muted"
          }`}
        >
          <CardContent className="p-3">
            <p className="text-sm">{message.text}</p>
            <div
              className={`flex items-center justify-between mt-2 text-xs ${
                isInstructor
                  ? "text-primary-foreground/70"
                  : "text-muted-foreground"
              }`}
            >
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {message.timestamp}
              </span>
              {!isInstructor && !message.isRead && (
                <Badge variant="outline" className="text-xs">
                  New
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <div
        className={`flex items-start gap-2 ${
          isInstructor ? "order-1" : "order-2"
        }`}
      >
        <div
          className={`h-8 w-8 rounded-full flex items-center justify-center ${
            isInstructor ? "bg-primary" : "bg-muted"
          }`}
        >
          <User className="h-4 w-4 text-foreground" />
        </div>
      </div>
    </div>
  );
}
