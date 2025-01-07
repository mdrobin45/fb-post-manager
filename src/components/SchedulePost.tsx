import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format, set } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

interface SchedulePostProps {
  onSubmit: (content: string, date: Date) => void;
}

export function SchedulePost({ onSubmit }: SchedulePostProps) {
  const [content, setContent] = useState("");
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState("12:00");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim() && date) {
      // Parse the time string and combine with the selected date
      const [hours, minutes] = time.split(":").map(Number);
      const scheduledDateTime = set(date, {
        hours,
        minutes,
        seconds: 0,
        milliseconds: 0,
      });
      
      onSubmit(content, scheduledDateTime);
      setContent("");
      setDate(undefined);
      setTime("12:00");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Schedule a Post</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="What's on your mind?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="min-h-[150px]"
          />
          
          <div className="flex gap-4">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-[240px] justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>

            <Input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-[120px]"
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button 
            type="submit" 
            disabled={!content.trim() || !date}
            className="bg-facebook-primary hover:bg-facebook-hover"
          >
            Schedule Post
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}