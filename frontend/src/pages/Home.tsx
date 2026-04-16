import { useEffect, useState } from 'react';
import axios from 'axios';
import type { Post } from '../types';
import { Link } from 'react-router-dom';

const Home = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:5000/api/posts')
      .then(res => {
        setPosts(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const stripHtml = (html: string) => {
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="w-5 h-5 border-2 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto px-5 py-10">
      <div className="text-center mb-10">
        <h1 className="text-2xl font-bold text-white mb-1">
          Your thoughts, <span className="text-cyan-400">architected.</span>
        </h1>
        <p className="text-slate-500 text-sm">Share your knowledge</p>
      </div>

      <div className="mb-6">
        <h2 className="text-xs font-medium text-slate-500 mb-4">Recent Posts</h2>
        
        {posts.length === 0 ? (
          <div className="text-center py-10 bg-slate-900/30 rounded-lg border border-slate-800">
            <p className="text-slate-500 mb-4">No posts yet</p>
            <Link to="/create" className="text-sm bg-cyan-600 hover:bg-cyan-500 text-white px-4 py-2 rounded-md">
              Write First Post
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {posts.map(post => (
              <Link key={post._id} to={`/post/${post.slug}`} className="block">
                <article className="p-4 bg-slate-900 border border-slate-800 rounded-lg hover:border-cyan-500/40 transition-colors">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs text-cyan-500">
                      {new Date(post.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                  </div>
                  <h3 className="text-sm font-medium text-white">{post.title}</h3>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2">{stripHtml(post.content).slice(0, 80)}</p>
                </article>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;