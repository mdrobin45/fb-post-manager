import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

interface ScheduledPost {
  id: string;
  content: string;
  scheduledFor: Date;
  status: "pending" | "posted";
}

interface ScheduledPostsProps {
  posts: ScheduledPost[];
  showDelete?: boolean;
  onDelete?: (postId: string) => void;
}

export function ScheduledPosts({ posts, showDelete = false, onDelete }: ScheduledPostsProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Content</TableHead>
            <TableHead>Scheduled For</TableHead>
            <TableHead>Status</TableHead>
            {showDelete && <TableHead className="w-[100px]">Actions</TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {posts.length === 0 ? (
            <TableRow>
              <TableCell 
                colSpan={showDelete ? 4 : 3} 
                className="text-center text-muted-foreground"
              >
                No posts to display
              </TableCell>
            </TableRow>
          ) : (
            posts.map((post) => (
              <TableRow key={post.id}>
                <TableCell className="font-medium">{post.content}</TableCell>
                <TableCell>{format(new Date(post.scheduledFor), "PPP 'at' p")}</TableCell>
                <TableCell>
                  <Badge
                    variant={post.status === "pending" ? "outline" : "default"}
                    className={
                      post.status === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-green-100 text-green-800"
                    }
                  >
                    {post.status}
                  </Badge>
                </TableCell>
                {showDelete && (
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onDelete?.(post.id)}
                      className="hover:bg-destructive/10"
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </TableCell>
                )}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}