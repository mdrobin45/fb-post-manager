import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
   Card,
   CardContent,
   CardFooter,
   CardHeader,
   CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
   Popover,
   PopoverContent,
   PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import axiosClient from "@/lib/axiosClient";
import { cn } from "@/lib/utils";
import { format, set } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { PostsList } from "./PostsList";

export function SchedulePost() {
   const [scheduledPosts, setScheduledPosts] = useState([]);
   const { toast } = useToast();
   const [content, setContent] = useState("");
   const [date, setDate] = useState<Date>();
   const [time, setTime] = useState("12:00");

   const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (content.trim() && date) {
         const [hours, minutes] = time.split(":").map(Number);
         const scheduledDateTime = set(date, {
            hours,
            minutes,
            seconds: 0,
            milliseconds: 0,
         });

         const scheduleInSecond =
            Math.floor(new Date(scheduledDateTime).getTime()) / 1000;

         axiosClient
            .post("/feed", {
               message: content,
               published: false,
               scheduled_publish_time: scheduleInSecond,
            })
            .then((res) => {
               if (res.data.id) {
                  setContent("");
                  toast({
                     title: "Post Scheduled",
                     description: "Your post has been scheduled successfully!",
                  });
               }
            })
            .catch((err) => {
               console.log(err);
            });

         setContent("");
         setDate(undefined);
         setTime("12:00");
      }
   };

   // Get scheduled post
   useEffect(() => {
      axiosClient
         .get("/scheduled_posts")
         .then((res) => {
            if (res.data.data) {
               setScheduledPosts(res.data.data);
            }
         })
         .catch((err) => console.log(err));
   }, [scheduledPosts]);

   return (
      <>
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
                              )}>
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {date ? (
                                 format(date, "PPP")
                              ) : (
                                 <span>Pick a date</span>
                              )}
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
                     className="bg-facebook-primary hover:bg-facebook-hover">
                     Schedule Post
                  </Button>
               </CardFooter>
            </form>
         </Card>

         {/* Schedule posts list */}
         <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Scheduled Posts</h2>
            <PostsList posts={scheduledPosts} is_published={false} />
         </div>
      </>
   );
}
