import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

interface InstantPostProps {
  onSubmit: (content: string) => void;
}

export function InstantPost({ onSubmit }: InstantPostProps) {
  const [content, setContent] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim()) {
      onSubmit(content);
      setContent("");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Instant Post</CardTitle>
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
            className="bg-facebook-primary hover:bg-facebook-hover"
          >
            Post Now
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}