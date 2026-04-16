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
        <div className="w-6 h-6 border-2 border-slate-200 border-t-blue-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="w-full px-6 py-12 text-center max-w-3xl mx-auto">
        <p className="text-slate-500 mb-4">Post not found</p>
        <Link to="/" className="link">Go back home</Link>
      </div>
    );
  }

  return (
    <div className="w-full px-6 py-12 max-w-3xl mx-auto">
      <Link to="/" className="text-sm text-slate-500 hover:text-slate-700 mb-6 inline-flex items-center gap-1">
        ← Back
      </Link>
      
      <article>
        {post.featuredImage && (
          <img 
            src={post.featuredImage.startsWith('http') ? post.featuredImage : `http://localhost:5000${post.featuredImage}`}
            alt={post.title}
            className="w-full h-64 object-cover rounded-lg mb-8"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
        )}
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-4">{post.title}</h1>
          <div className="flex items-center gap-3 text-sm text-slate-500">
            <span>
              {new Date(post.createdAt).toLocaleDateString('en-US', { 
                month: 'long', 
                day: 'numeric', 
                year: 'numeric' 
              })}
            </span>
            {post.tags?.length > 0 && (
              <>
                <span>·</span>
                <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full text-xs">
                  {post.tags.join(', ')}
                </span>
              </>
            )}
          </div>
        </header>
        
        <div 
          className="prose max-w-none mb-12"
          dangerouslySetInnerHTML={{ __html: post.content }} 
        />
      </article>
      
      <div className="border-t border-slate-200 pt-10">
        <CommentsSection postId={post._id} />
      </div>
    </div>
  );
};

export default PostDetail;