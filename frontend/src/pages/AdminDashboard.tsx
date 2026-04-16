import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import type { Post } from '../types';

const AdminDashboard = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const { token, isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    if (user?.role !== 'admin') {
      navigate('/');
      return;
    }
    fetchPosts();
  }, [isAuthenticated, navigate, token, user]);

  const fetchPosts = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/posts', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPosts(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const deletePost = async (id: string) => {
    if (!confirm('Delete this post?')) return;
    try {
      await axios.delete(`http://localhost:5000/api/posts/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchPosts();
    } catch {
      alert('Failed to delete');
    }
  };

  if (!isAuthenticated) return null;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="w-5 h-5 border-2 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-5 py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-headline font-bold text-white">Dashboard</h1>
        <Link to="/create" className="text-sm bg-cyan-600 hover:bg-cyan-500 text-white px-3 py-1.5 rounded-md">
          New Post
        </Link>
      </div>

      <div className="mb-4 flex gap-4">
        <div className="flex-1 p-4 bg-slate-900 border border-slate-800 rounded-lg text-center">
          <p className="text-xl font-bold text-cyan-400">{posts.length}</p>
          <p className="text-xs text-slate-500">Total Posts</p>
        </div>
        <div className="flex-1 p-4 bg-slate-900 border border-slate-800 rounded-lg text-center">
          <p className="text-xl font-bold text-green-400">{posts.filter(p => p.published).length}</p>
          <p className="text-xs text-slate-500">Published</p>
        </div>
      </div>

      <h2 className="text-sm font-medium text-slate-400 mb-3">All Posts</h2>
      
      {posts.length === 0 ? (
        <p className="text-slate-500 text-sm">No posts</p>
      ) : (
        <div className="space-y-2">
          {posts.map(post => (
            <div key={post._id} className="flex items-center justify-between p-3 bg-slate-900 border border-slate-800 rounded-md">
              <Link to={`/post/${post.slug}`} className="text-sm text-white hover:text-cyan-400">
                {post.title}
              </Link>
              <button onClick={() => deletePost(post._id)} className="text-xs text-red-400 hover:text-red-300">
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;