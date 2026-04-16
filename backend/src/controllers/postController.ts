import { Request, Response } from 'express';
import Post, { IPost } from '../models/Post';
import { AuthRequest } from '../middleware/auth';

export const getAllPosts = async (req: Request, res: Response) => {
  try {
    const posts = await Post.find({ published: true })
      .sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getPostBySlug = async (req: Request, res: Response) => {
  try {
    const post = await Post.findOne({ 
      slug: req.params.slug, 
      published: true 
    });
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const createPost = async (req: AuthRequest, res: Response) => {
  try {
    const { title, content, tags, published = false } = req.body;
    
    const slug = title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-');

    const newPost: IPost = new Post({
      title,
      slug,
      content,
      tags: tags || [],
      published,
      author: req.user!.id,
    });

    await newPost.save();
    res.status(201).json(newPost);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};