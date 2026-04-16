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
        <div className="w-6 h-6 border-2 border-slate-200 border-t-blue-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="w-full px-6 py-12 max-w-3xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-slate-900 mb-3">
          Welcome to DevDiary
        </h1>
        <p className="text-slate-500">Thoughts, tutorials, and insights</p>
      </div>

      {posts.length === 0 ? (
        <div className="card text-center py-12">
          <p className="text-slate-500 mb-4">No posts yet. Be the first to write!</p>
          <Link to="/create" className="btn btn-primary">
            Write a Post
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {posts.map(post => (
            <Link key={post._id} to={`/post/${post.slug}`} className="block group">
              <article className="card p-6 hover:shadow-md transition-shadow duration-200">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-sm text-slate-400">
                    {new Date(post.createdAt).toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric', 
                      year: 'numeric' 
                    })}
                  </span>
                  {post.tags?.length > 0 && (
                    <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">
                      {post.tags[0]}
                    </span>
                  )}
                </div>
                <h2 className="text-lg font-semibold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {post.title}
                </h2>
                <p className="text-slate-500 text-sm line-clamp-2">
                  {stripHtml(post.content).slice(0, 150)}
                </p>
              </article>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;