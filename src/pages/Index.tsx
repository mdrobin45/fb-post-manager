import { InstantPost } from "@/components/InstantPost";
import { PostsList } from "@/components/PostsList";
import { SchedulePost } from "@/components/SchedulePost";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import axiosClient from "@/lib/axiosClient";
import { useEffect, useState } from "react";

export default function Index() {
   const [published, setPublished] = useState([]);

   // Get published post
   useEffect(() => {
      axiosClient
         .get("/feed")
         .then((res) => {
            if (res.data.data) {
               setPublished(res.data.data);
            }
         })
         .catch((err) => console.log(err));
   }, []);

   return (
      <div className="container mx-auto py-8 px-4">
         <h1 className="text-3xl font-bold text-facebook-primary mb-8">
            Facebook Post Manager
         </h1>

         <Tabs defaultValue="instant" className="w-full">
            {/* Tabs */}
            <TabsList className="grid w-full grid-cols-3 mb-8">
               <TabsTrigger value="instant">Instant Post</TabsTrigger>
               <TabsTrigger value="schedule">Schedule Post</TabsTrigger>
               <TabsTrigger value="history">Published Post</TabsTrigger>
            </TabsList>

            {/* Create instant post */}
            <TabsContent value="instant">
               <InstantPost />
            </TabsContent>

            {/* Create schedule post */}
            <TabsContent value="schedule" className="space-y-8">
               <SchedulePost/>
            </TabsContent>

            {/* Published posts */}
            <TabsContent value="history">
               <div className="space-y-4">
                  <h2 className="text-xl font-semibold">Published Post</h2>
                  <PostsList posts={published} is_published={true} />
               </div>
            </TabsContent>
         </Tabs>
      </div>
   );
}
