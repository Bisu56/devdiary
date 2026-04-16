import express from 'express';
import { getAllPosts, getPostBySlug, createPost } from '../controllers/postController';
import { protect } from '../middleware/auth';

const router = express.Router();

router.get('/', getAllPosts);
router.get('/:slug', getPostBySlug);
router.post('/', protect, createPost);

export default router;