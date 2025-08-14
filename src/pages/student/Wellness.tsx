import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Heart,
  CheckCircle,
  AlertTriangle,
  Clock,
  Smile,
  Meh,
  Frown,
} from "lucide-react";

interface WellnessEntry {
  id: string;
  date: string;
  mood: number;
  message: string;
  needsAttention: boolean;
  status: "healthy" | "concerned" | "urgent";
}

export default function Wellness() {
  const [mood, setMood] = useState(3);
  const [message, setMessage] = useState("");
  const [needsAttention, setNeedsAttention] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const [wellnessHistory, setWellnessHistory] = useState<WellnessEntry[]>([
    {
      id: "1",
      date: "2024-03-14",
      mood: 4,
      message: "Feeling great today",
      needsAttention: false,
      status: "healthy",
    },
    {
      id: "2",
      date: "2024-03-13",
      mood: 3,
      message: "Slightly tired",
      needsAttention: false,
      status: "healthy",
    },
    {
      id: "3",
      date: "2024-03-12",
      mood: 2,
      message: "High stress due to exams",
      needsAttention: true,
      status: "concerned",
    },
  ]);

  const getMoodIcon = (moodLevel: number) => {
    if (moodLevel >= 4) return <Smile className="h-6 w-6 text-green-600" />;
    if (moodLevel >= 3) return <Meh className="h-6 w-6 text-yellow-600" />;
    return <Frown className="h-6 w-6 text-red-600" />;
  };

  const getMoodText = (moodLevel: number) => {
    if (moodLevel >= 4) return "Great";
    if (moodLevel >= 3) return "Okay";
    if (moodLevel >= 2) return "Not Great";
    return "Poor";
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "healthy":
        return "bg-green-100 text-green-800 border-green-200";
      case "concerned":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "urgent":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const status = needsAttention
      ? "urgent"
      : mood <= 2
      ? "concerned"
      : "healthy";

    const newEntry: WellnessEntry = {
      id: Date.now().toString(),
      date: new Date().toISOString().split("T")[0],
      mood,
      message,
      needsAttention,
      status,
    };

    setWellnessHistory((prev) => [newEntry, ...prev]);
    setMood(3);
    setMessage("");
    setNeedsAttention(false);
    setIsSubmitting(false);
    setShowConfirmation(true);

    // Hide confirmation after 3 seconds
    setTimeout(() => setShowConfirmation(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Daily Wellness Check
          </h1>
          <p className="text-muted-foreground">
            Report how you're feeling today
          </p>
        </div>
        <Button>
          <Heart className="h-4 w-4 mr-2" />
          Daily Check-in
        </Button>
      </div>

      {/* Confirmation Message */}
      {showConfirmation && (
        <Card className="card-enhanced border-green-200 bg-green-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-green-800">
              <CheckCircle className="h-5 w-5" />
              <span className="font-medium">
                Wellness check submitted successfully!
              </span>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Wellness Form */}
      <Card className="card-enhanced">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="h-5 w-5" />
            Today's Wellness Check
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Mood Slider */}
            <div className="space-y-4">
              <Label className="text-base font-medium">
                How are you feeling today?
              </Label>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Poor</span>
                <div className="flex items-center gap-4">
                  {[1, 2, 3, 4, 5].map((level) => (
                    <button
                      key={level}
                      type="button"
                      onClick={() => setMood(level)}
                      className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${
                        mood === level
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-muted"
                      }`}
                    >
                      {getMoodIcon(level)}
                      <span className="text-xs">{level}</span>
                    </button>
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">Great</span>
              </div>
              <div className="text-center">
                <span className="text-sm font-medium">{getMoodText(mood)}</span>
              </div>
            </div>

            {/* Message */}
            <div className="space-y-2">
              <Label htmlFor="message">Optional Message</Label>
              <Textarea
                id="message"
                placeholder="Share any concerns or how you're feeling..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={3}
              />
            </div>

            {/* Needs Attention Toggle */}
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label className="text-base font-medium">Needs Attention</Label>
                <p className="text-sm text-muted-foreground">
                  Check this if you need immediate support or have urgent
                  concerns
                </p>
              </div>
              <Switch
                checked={needsAttention}
                onCheckedChange={setNeedsAttention}
              />
            </div>

            {/* Submit Button */}
            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? "Submitting..." : "Submit Wellness Check"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Wellness History */}
      <Card className="card-enhanced">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Recent Wellness Checks
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {wellnessHistory.map((entry) => (
              <div
                key={entry.id}
                className="flex items-center justify-between p-4 rounded-lg border border-border/50"
              >
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center">
                    {getMoodIcon(entry.mood)}
                  </div>
                  <div>
                    <h3 className="font-medium">{entry.date}</h3>
                    <p className="text-sm text-muted-foreground">
                      Mood: {getMoodText(entry.mood)} • {entry.message}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {entry.needsAttention && (
                    <Badge className="bg-red-100 text-red-800 border-red-200">
                      <AlertTriangle className="h-3 w-3 mr-1" />
                      Urgent
                    </Badge>
                  )}
                  <Badge className={getStatusColor(entry.status)}>
                    {entry.status.charAt(0).toUpperCase() +
                      entry.status.slice(1)}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
