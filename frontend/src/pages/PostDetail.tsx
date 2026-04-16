import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import type { Post } from '../types';
import CommentsSection from '../components/CommentsSection';

const PostDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      axios.get(`http://localhost:5000/api/posts/${slug}`)
        .then(res => {
          setPost(res.data);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="w-5 h-5 border-2 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="max-w-xl mx-auto px-5 py-10 text-center">
        <p className="text-slate-500 mb-4">Post not found</p>
        <Link to="/" className="text-cyan-400 hover:text-cyan-300">Go back</Link>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto px-5 py-10">
      <Link to="/" className="text-xs text-slate-500 hover:text-white mb-4 block">← Back</Link>
      
      <h1 className="text-xl font-bold text-white mb-2">{post.title}</h1>
      <p className="text-xs text-slate-500 mb-8">
        {new Date(post.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
      </p>
      
      <div className="prose prose-invert max-w-none mb-10 text-sm text-slate-300" dangerouslySetInnerHTML={{ __html: post.content }} />
      
      <CommentsSection postId={post._id} />
    </div>
  );
};

export default PostDetail;