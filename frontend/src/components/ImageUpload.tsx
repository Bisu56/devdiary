import { useState, useRef } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

interface Props {
  onUploadComplete: (url: string) => void;
}

const ImageUpload = ({ onUploadComplete }: Props) => {
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { token } = useAuth();

  const handleFile = async (file: File) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

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
      onUploadComplete(res.data.url);
    } catch (error) {
      alert('Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  return (
    <div
      className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
        dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
      }`}
      onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
      onDragLeave={() => setDragActive(false)}
      onDrop={handleDrop}
      onClick={() => fileInputRef.current?.click()}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleChange}
      />
      {uploading ? (
        <p className="text-gray-500">Uploading...</p>
      ) : (
        <p className="text-gray-500">Click or drag image here to upload</p>
      )}
    </div>
  );
};

export default ImageUpload;