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
import { MapPin, ClipboardCheck, MessageCircle, Calendar } from "lucide-react";

interface ParentQuickAction {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  route: string;
  variant?: "default" | "outline";
}

const parentQuickActions: ParentQuickAction[] = [
  {
    title: "View Child Location",
    description: "Check your child's current location",
    icon: MapPin,
    route: "/parent/child-locations",
    variant: "default",
  },
  {
    title: "Request Leave",
    description: "Submit leave request for your child",
    icon: ClipboardCheck,
    route: "/parent/request-leave",
    variant: "outline",
  },
  {
    title: "View Messages",
    description: "Check messages from school",
    icon: MessageCircle,
    route: "/parent/messages",
    variant: "outline",
  },
  {
    title: "View Events",
    description: "See upcoming school events",
    icon: Calendar,
    route: "/parent/events",
    variant: "outline",
  },
];

export function ParentQuickActionsCard() {
  const navigate = useNavigate();

  const handleActionClick = (route: string) => {
    navigate(route);
  };

  return (
    <Card className="card-enhanced">
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
        <CardDescription>Common parent tasks</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {parentQuickActions.map((action, index) => (
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
