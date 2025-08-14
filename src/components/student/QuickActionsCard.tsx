import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, ClipboardCheck, MessageCircle, Heart } from "lucide-react";

interface QuickAction {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  route: string;
  variant?: "default" | "outline";
}

const quickActions: QuickAction[] = [
  {
    title: "Schedule",
    description: "View your class schedule",
    icon: Calendar,
    route: "/student/schedule",
    variant: "default",
  },
  {
    title: "Request Leave",
    description: "Submit leave request",
    icon: ClipboardCheck,
    route: "/student/leave-requests",
    variant: "outline",
  },
  {
    title: "View Messages",
    description: "Check instructor messages",
    icon: MessageCircle,
    route: "/student/messages",
    variant: "outline",
  },
  {
    title: "Wellness Check",
    description: "Daily health status",
    icon: Heart,
    route: "/student/wellness",
    variant: "outline",
  },
];

export function QuickActionsCard() {
  const navigate = useNavigate();

  const handleActionClick = (route: string) => {
    navigate(route);
  };

  return (
    <Card className="card-enhanced">
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
        <CardDescription>Common student tasks</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, index) => (
            <Button
              key={index}
              variant={action.variant}
              className="h-auto p-4 flex flex-col items-center text-center hover:scale-105 transition-transform"
              onClick={() => handleActionClick(action.route)}
            >
              <action.icon className="h-6 w-6 mb-2" />
              <div className="font-medium">{action.title}</div>
              <div className="text-xs text-muted-foreground mt-1">
                {action.description}
              </div>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
