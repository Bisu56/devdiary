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
    <div className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-2xl font-bold text-slate-900 mb-8">New Post</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="label">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="input"
            placeholder="Enter post title"
            required
          />
        </div>
        
        <div>
          <label className="label">Content</label>
          <RichTextEditor content={content} onChange={setContent} />
        </div>
        
        <div className="flex items-center gap-3 pt-4">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="btn btn-ghost"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className="btn btn-primary"
          >
            {saving ? 'Publishing...' : 'Publish'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;