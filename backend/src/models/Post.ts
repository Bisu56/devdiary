import mongoose, { Document, Schema } from 'mongoose';

export interface IPost extends Document {
  title: string;
  slug: string;
  content: string;
  featuredImage?: string;
  tags: string[];
  published: boolean;
  author: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const PostSchema = new Schema<IPost>({
  title: { 
    type: String, 
    required: true, 
    trim: true 
  },
  slug: { 
    type: String, 
    required: true, 
    unique: true 
  },
  content: { 
    type: String, 
    required: true 
  },
  featuredImage: { 
    type: String 
  },
  tags: [{ 
    type: String 
  }],
  published: { 
    type: Boolean, 
    default: false 
  },
  author: { 
    type: Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
}, { 
  timestamps: true
});

export default mongoose.model<IPost>('Post', PostSchema);