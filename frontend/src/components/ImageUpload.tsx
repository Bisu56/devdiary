import { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

interface Props {
  onUpload: (url: string) => void;
}

const ImageUpload = ({ onUpload }: Props) => {
  const [uploading, setUploading] = useState(false);
  const { token } = useAuth();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('image', file);

    try {
      const res = await axios.post('http://localhost:5000/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });
      onUpload(res.data.url);
    } catch (error) {
      console.error(error);
      alert('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  return (
    <label className="inline-flex items-center gap-2 px-3 py-1.5 bg-slate-800 border border-slate-700 rounded-md text-sm text-slate-400 hover:text-white hover:border-slate-600 cursor-pointer">
      {uploading ? 'Uploading...' : 'Upload Image'}
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
        disabled={uploading}
      />
    </label>
  );
};

export default ImageUpload;