import React, { useEffect, useState } from "react";
import { apiClient } from "@/lib/api-client";

interface BlogComment {
  id: string;
  user_id?: string;
  content: string;
  created_at: string;
}

interface BlogCommentsProps {
  postId: string;
  userId?: string; // Optional, for authenticated users
}

const BlogComments: React.FC<BlogCommentsProps> = ({ postId, userId }) => {
  const [comments, setComments] = useState<BlogComment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [content, setContent] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const fetchComments = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiClient.get(`/blog/posts/${postId}/comments`);
      setComments(data);
    } catch (err: any) {
      setError(err.message || "Failed to load comments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
    // eslint-disable-next-line
  }, [postId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;
    setSubmitting(true);
    setError(null);
    try {
      await apiClient.post(`/blog/posts/${postId}/comments`, {
        content,
        user_id: userId || null,
      });
      setContent("");
      fetchComments();
    } catch (err: any) {
      setError(err.message || "Failed to add comment");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mt-10">
      <h3 className="text-lg font-semibold mb-4">Comments</h3>
      {loading ? (
        <div>Loading comments...</div>
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : (
        <div className="space-y-4 mb-6">
          {comments.length === 0 ? (
            <div className="text-gray-500">No comments yet.</div>
          ) : (
            comments.map((comment) => (
              <div key={comment.id} className="bg-gray-100 dark:bg-gray-800 rounded p-3">
                <div className="text-sm text-gray-700 dark:text-gray-200 mb-1">{comment.content}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {new Date(comment.created_at).toLocaleString()}
                </div>
              </div>
            ))
          )}
        </div>
      )}
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <textarea
          className="border rounded p-2 min-h-[60px] bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100"
          placeholder="Add a comment..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          disabled={submitting}
        />
        <button
          type="submit"
          className="self-end px-4 py-2 bg-[#1A237E] text-white rounded hover:bg-[#3949ab] disabled:opacity-50"
          disabled={submitting || !content.trim()}
        >
          {submitting ? "Posting..." : "Post Comment"}
        </button>
      </form>
    </div>
  );
};

export default BlogComments;
