import { Request, Response } from 'express';
import Comment, { IComment } from '../models/Comment';
import { AuthRequest } from '../middleware/auth';

export const getCommentsForPost = async (req: Request, res: Response) => {
  try {
    const comments = await Comment.find({ post: req.params.postId })
      .populate('author', 'name email')
      .sort({ createdAt: 1 });

    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const addComment = async (req: AuthRequest, res: Response) => {
  try {
    const { content, parentComment } = req.body;
    const postId = req.params.postId;

    const comment: IComment = new Comment({
      post: postId,
      author: req.user!.id,
      content,
      parentComment: parentComment || null,
    });

    await comment.save();
    await comment.populate('author', 'name');

    res.status(201).json(comment);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};