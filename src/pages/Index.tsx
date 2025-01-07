import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { InstantPost } from "@/components/InstantPost";
import { SchedulePost } from "@/components/SchedulePost";
import { ScheduledPosts } from "@/components/ScheduledPosts";
import { useToast } from "@/hooks/use-toast";

export default function Index() {
  const { toast } = useToast();
  const [scheduledPosts, setScheduledPosts] = useState<Array<{
    id: string;
    content: string;
    scheduledFor: Date;
    status: "pending" | "posted";
  }>>([
    {
      id: "1",
      content: "Exciting news! Join us for our upcoming product launch event! 🚀",
      scheduledFor: new Date(Date.now() + 24 * 60 * 60 * 1000), // Tomorrow
      status: "pending",
    },
    {
      id: "2",
      content: "Happy Friday everyone! Don't forget to check out our weekend special offers! 🎉",
      scheduledFor: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // Day after tomorrow
      status: "pending",
    },
    {
      id: "3",
      content: "Thank you for being part of our amazing community! ❤️",
      scheduledFor: new Date(Date.now() - 12 * 60 * 60 * 1000), // 12 hours ago
      status: "posted",
    },
  ]);

  const handleSchedulePost = (content: string, date: Date) => {
    const newPost = {
      id: Math.random().toString(36).substr(2, 9),
      content,
      scheduledFor: date,
      status: "pending" as const,
    };
    setScheduledPosts((prev) => [...prev, newPost]);
    toast({
      title: "Post Scheduled",
      description: "Your post has been scheduled successfully!",
    });
  };

  const handleInstantPost = (content: string) => {
    const newPost = {
      id: Math.random().toString(36).substr(2, 9),
      content,
      scheduledFor: new Date(),
      status: "posted" as const,
    };
    setScheduledPosts((prev) => [...prev, newPost]);
    toast({
      title: "Post Created",
      description: "Your post has been published successfully!",
    });
  };

  const handleDeletePost = (postId: string) => {
    setScheduledPosts((prev) => prev.filter((post) => post.id !== postId));
    toast({
      title: "Post Deleted",
      description: "The post has been deleted successfully.",
    });
  };

  // Filter posts for different views
  const pendingPosts = scheduledPosts.filter((post) => post.status === "pending");
  const last30DaysPosts = scheduledPosts.filter(
    (post) => 
      post.status === "posted" && 
      post.scheduledFor >= new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
  );

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-facebook-primary mb-8">
        Facebook Post Manager
      </h1>

      <Tabs defaultValue="instant" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="instant">Instant Post</TabsTrigger>
          <TabsTrigger value="schedule">Schedule Post</TabsTrigger>
          <TabsTrigger value="history">Post History</TabsTrigger>
        </TabsList>

        <TabsContent value="instant">
          <InstantPost onSubmit={handleInstantPost} />
        </TabsContent>

        <TabsContent value="schedule" className="space-y-8">
          <SchedulePost onSubmit={handleSchedulePost} />
          {pendingPosts.length > 0 && (
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4">Scheduled Posts</h2>
              <ScheduledPosts posts={pendingPosts} />
            </div>
          )}
        </TabsContent>

        <TabsContent value="history">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Post History (Last 30 Days)</h2>
            <ScheduledPosts 
              posts={last30DaysPosts} 
              showDelete={true} 
              onDelete={handleDeletePost} 
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}