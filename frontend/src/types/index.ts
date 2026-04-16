export interface Post {
  _id: string;
  title: string;
  slug: string;
  content: string;
  featuredImage?: string;
  tags: string[];
  published: boolean;
  createdAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface Comment {
  _id: string;
  post: string;
  author: {
    _id: string;
    name: string;
    email?: string;
  };
  content: string;
  parentComment?: string | null;
  likes: number;
  createdAt: string;
}

export interface CommentForm {
  content: string;
  parentComment?: string;
}