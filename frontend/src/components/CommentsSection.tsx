import { useEffect, useState } from 'react';
import axios from 'axios';
import type { Comment } from '../types';
import CommentItem from './CommentItem';
import { useAuth } from '../context/AuthContext';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const commentSchema = z.object({
  content: z.string().min(3, 'Comment must be at least 3 characters'),
});

type CommentFormData = z.infer<typeof commentSchema>;

interface Props {
  postId: string;
}

const CommentsSection = ({ postId }: Props) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const { token, isAuthenticated } = useAuth();

  const { register, handleSubmit, reset, formState: { errors } } = useForm<CommentFormData>({
    resolver: zodResolver(commentSchema),
  });

  const fetchComments = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/comments/${postId}`);
      setComments(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [postId]);

  const onSubmit = async (data: CommentFormData) => {
    if (!token) return;
    try {
      await axios.post(
        `http://localhost:5000/api/comments/${postId}`,
        { content: data.content },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      reset();
      fetchComments();
    } catch (error) {
      console.error(error);
    }
  };

  const topLevelComments = comments.filter(c => !c.parentComment);

  return (
    <div>
      <h2 className="text-lg font-semibold text-slate-900 mb-6">
        Comments ({comments.length})
      </h2>

      {isAuthenticated ? (
        <form onSubmit={handleSubmit(onSubmit)} className="mb-8">
          <textarea
            {...register('content')}
            className="input resize-none"
            placeholder="Write a comment..."
            rows={4}
          />
          {errors.content && <p className="error-text">{errors.content.message}</p>}
          <button 
            type="submit"
            className="btn btn-primary mt-3"
          >
            Post Comment
          </button>
        </form>
      ) : (
        <p className="text-slate-500 mb-6">Log in to join the discussion</p>
      )}

      {loading ? (
        <p className="text-slate-500">Loading comments...</p>
      ) : (
        <div className="space-y-4">
          {topLevelComments.map((comment) => (
            <CommentItem 
              key={comment._id} 
              comment={comment} 
              postId={postId} 
              onReplyAdded={fetchComments} 
            />
          ))}
          {topLevelComments.length === 0 && (
            <p className="text-slate-500">No comments yet. Be the first!</p>
          )}
        </div>
      )}
    </div>
  );
};

export default CommentsSection;