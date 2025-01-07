import { Button } from "@/components/ui/button";
import {
   Card,
   CardContent,
   CardFooter,
   CardHeader,
   CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import axiosClient from "@/lib/axiosClient";
import { useState } from "react";

export function InstantPost() {
   const { toast } = useToast();
   const [content, setContent] = useState("");

   // Handle post submission
   const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      axiosClient
         .post("/feed", { message: content })
         .then((res) => {
            if (res.data.id) {
               setContent("");
               toast({
                  title: "Post Created",
                  description: "Your post has been published successfully!",
               });
            }
         })
         .catch((err) => {
            console.log(err);
         });
   };

   return (
      <Card>
         <CardHeader>
            <CardTitle>Create Post</CardTitle>
         </CardHeader>
         <form onSubmit={handleSubmit}>
            <CardContent>
               <Textarea
                  placeholder="What's on your mind?"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="min-h-[150px]"
               />
            </CardContent>
            <CardFooter className="flex justify-end">
               <Button
                  type="submit"
                  disabled={!content.trim()}
                  className="bg-facebook-primary hover:bg-facebook-hover">
                  Post Now
               </Button>
            </CardFooter>
         </form>
      </Card>
   );
}
