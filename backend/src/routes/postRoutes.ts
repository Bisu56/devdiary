import express from 'express';
import { getAllPosts, getPostBySlug, createPost, deletePost } from '../controllers/postController';
import { protect } from '../middleware/auth';

const router = express.Router();

router.get('/', getAllPosts);
router.get('/all', protect, getAllPosts);
router.get('/:slug', getPostBySlug);
router.post('/', protect, createPost);
router.delete('/:id', protect, deletePost);

export default router;