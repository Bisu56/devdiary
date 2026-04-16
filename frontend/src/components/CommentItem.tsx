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
    <div className="border-l-2 border-slate-200 pl-4 py-2">
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium flex-shrink-0">
          {comment.author.name[0].toUpperCase()}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-medium text-slate-900">{comment.author.name}</span>
            <span className="text-xs text-slate-400">
              {new Date(comment.createdAt).toLocaleDateString()}
            </span>
          </div>
          <p className="text-slate-600">{comment.content}</p>

          <div className="flex items-center gap-4 mt-2 text-sm">
            <button 
              onClick={() => setShowReplyForm(!showReplyForm)}
              className="text-slate-500 hover:text-slate-700"
            >
              Reply
            </button>
            <span className="text-slate-400">{comment.likes} likes</span>
          </div>

          {showReplyForm && isAuthenticated && (
            <div className="mt-4">
              <textarea
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                className="input resize-none"
                placeholder="Write your reply..."
                rows={3}
              />
              <div className="flex items-center gap-2 mt-2">
                <button 
                  onClick={handleReply}
                  className="btn btn-primary text-sm py-1.5"
                >
                  Reply
                </button>
                <button 
                  onClick={() => setShowReplyForm(false)}
                  className="btn btn-ghost text-sm py-1.5"
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