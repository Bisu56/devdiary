import mongoose, { Document, Schema } from 'mongoose';

export interface IComment extends Document {
  post: mongoose.Types.ObjectId;
  author: mongoose.Types.ObjectId;
  content: string;
  parentComment?: mongoose.Types.ObjectId | null;
  likes: number;
  createdAt: Date;
  updatedAt: Date;
}

const CommentSchema = new Schema<IComment>({
  post: { 
    type: Schema.Types.ObjectId, 
    ref: 'Post', 
    required: true 
  },
  author: { 
    type: Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  content: { 
    type: String, 
    required: true, 
    trim: true 
  },
  parentComment: { 
    type: Schema.Types.ObjectId, 
    ref: 'Comment', 
    default: null 
  },
  likes: { 
    type: Number, 
    default: 0 
  },
}, { 
  timestamps: true 
});

export default mongoose.model<IComment>('Comment', CommentSchema);