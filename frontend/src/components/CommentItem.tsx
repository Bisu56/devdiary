import { useState } from 'react';
import type { Comment } from '../types';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

interface Props {
  comment: Comment;
  postId: string;
  onReplyAdded: () => void;
}

const CommentItem = ({ comment, postId, onReplyAdded }: Props) => {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replyContent, setReplyContent] = useState('');
  const { isAuthenticated, token } = useAuth();

  const handleReply = async () => {
    if (!replyContent.trim() || !token) return;

    try {
      await axios.post(
        `http://localhost:5000/api/comments/${postId}`,
        { 
          content: replyContent,
          parentComment: comment._id 
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setReplyContent('');
      setShowReplyForm(false);
      onReplyAdded();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="border-l-2 border-slate-700 pl-4 mb-6">
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 bg-cyan-900 rounded-full flex items-center justify-center text-cyan-400 font-medium flex-shrink-0">
          {comment.author.name[0].toUpperCase()}
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-medium text-white">{comment.author.name}</div>
          <div className="text-xs text-slate-500">
            {new Date(comment.createdAt).toLocaleDateString()}
          </div>
          <p className="mt-2 text-slate-300">{comment.content}</p>

          <div className="flex gap-4 mt-3 text-sm">
            <button 
              onClick={() => setShowReplyForm(!showReplyForm)}
              className="text-cyan-400 hover:underline"
            >
              Reply
            </button>
            <span className="text-slate-500">{comment.likes} likes</span>
          </div>

          {showReplyForm && isAuthenticated && (
            <div className="mt-4">
              <textarea
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                className="w-full p-3 border border-slate-700 rounded-lg bg-slate-900 text-white"
                placeholder="Write your reply..."
                rows={3}
              />
              <div className="flex gap-2 mt-2">
                <button 
                  onClick={handleReply}
                  className="bg-cyan-600 text-white px-4 py-1.5 rounded-md text-sm hover:bg-cyan-500"
                >
                  Post Reply
                </button>
                <button 
                  onClick={() => setShowReplyForm(false)}
                  className="text-slate-500 text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommentItem;