import { InstantPost } from "@/components/InstantPost";
import { PostsList } from "@/components/PostsList";
import { SchedulePost } from "@/components/SchedulePost";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { facebookAuthProvider } from "@/lib/authProvider";
import axiosClient from "@/lib/axiosClient";
import auth from "@/lib/firebase.config";
import axios from "axios";
import { FacebookAuthProvider, signInWithPopup } from "firebase/auth";
import { useEffect, useState } from "react";
import { FaFacebook } from "react-icons/fa";

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

   // Get user id
   const getUserId = (userId:string) => {
      
   }
   // Get page access token & user id
   const getPageToken = (userAccessToken: string) => {
      // Get the user id
      axios
         .get(
            `${
               import.meta.env.VITE_GRAPH_API
            }/me?access_token=${userAccessToken}`
         )
         .then((res) => {
            console.log(res)
         })
         .then((err) => console.log(err));
   };

   // Handle login with facebook
   const loginWithFB = () => {
      signInWithPopup(auth, facebookAuthProvider).then((res) => {
         const credentials = FacebookAuthProvider.credentialFromResult(res);
         const user_access_token = credentials.accessToken;
         console.log("User Token: ",user_access_token);
         getPageToken(user_access_token);
      });
   };

   return (
      <div className="container mx-auto py-8 px-4">
         <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-facebook-primary mb-8">
               Facebook Post Manager
            </h1>
            <Button
               onClick={loginWithFB}
               className="bg-facebook-primary hover:bg-facebook-hover">
               <FaFacebook /> Login with Facebook
            </Button>
         </div>

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
               <SchedulePost />
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
