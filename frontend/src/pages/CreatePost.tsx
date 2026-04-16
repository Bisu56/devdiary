import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import RichTextEditor from '../components/RichTextEditor';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('<p></p>');
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();
  const { token, isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) navigate('/login');
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    
    setSaving(true);
    try {
      await axios.post('http://localhost:5000/api/posts', {
        title,
        content,
        published: true
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      navigate('/');
    } catch {
      alert('Error creating post');
    } finally {
      setSaving(false);
    }
  };

  if (!isAuthenticated) return null;

  return (
    <div className="flex items-start justify-center min-h-[calc(100vh-8rem)] py-10">
      <div className="w-full max-w-xl">
        <h1 className="text-xl font-bold text-white mb-6 text-center">New Post</h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white focus:border-cyan-500 focus:outline-none"
            placeholder="Post title"
            required
          />
          
          <RichTextEditor content={content} onChange={setContent} />
          
          <div className="flex justify-center gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="px-4 py-2 text-slate-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-5 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-md disabled:opacity-50"
            >
              {saving ? 'Publishing...' : 'Publish'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;