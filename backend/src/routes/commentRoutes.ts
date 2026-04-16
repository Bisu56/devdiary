import express from 'express';
import { getCommentsForPost, addComment } from '../controllers/commentController';
import { protect } from '../middleware/auth';

const router = express.Router();

router.get('/:postId', getCommentsForPost);
router.post('/:postId', protect, addComment);

export default router;