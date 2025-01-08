import { Badge } from "@/components/ui/badge";
import {
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
} from "@/components/ui/table";
import { Trash2 } from "lucide-react";
import { Button } from "./ui/button";

export function PostsList({ posts, is_published }) {
   return (
      <div className="rounded-md border">
         <Table>
            <TableHeader>
               <TableRow>
                  <TableHead>Content</TableHead>
                  <TableHead>Scheduled For</TableHead>
                  <TableHead>{!is_published ? "Status" : "Action"}</TableHead>
               </TableRow>
            </TableHeader>
            <TableBody>
               {posts.length === 0 ? (
                  <TableRow>
                     <TableCell className="text-center text-muted-foreground">
                        No posts to display
                     </TableCell>
                  </TableRow>
               ) : (
                  posts.map((post) => (
                     <TableRow key={post.id}>
                        <TableCell className="font-medium">
                           {post.message.split(" ",10)}
                        </TableCell>
                        <TableCell>
                           {new Date(post?.created_time).toLocaleString(
                              "en-US",
                              {
                                 year: "numeric",
                                 month: "long",
                                 day: "numeric",
                                 hour: "numeric",
                                 minute: "numeric",
                                 hour12: true,
                                 timeZone: "Asia/Dhaka",
                              }
                           )}
                        </TableCell>
                        <TableCell>
                           {!is_published ? (
                              <Badge className="bg-green-100 text-green-800">
                                 Pending
                              </Badge>
                           ) : (
                              <></>
                           )}
                           {is_published && (
                              <TableCell>
                                 <Button
                                    variant="ghost"
                                    size="icon"
                                    className="hover:bg-destructive/10">
                                    <Trash2 className="h-4 w-4 text-destructive" />
                                 </Button>
                              </TableCell>
                           )}
                        </TableCell>
                     </TableRow>
                  ))
               )}
            </TableBody>
         </Table>
      </div>
   );
}
