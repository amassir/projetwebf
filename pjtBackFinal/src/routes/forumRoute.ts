import { Router } from 'express';
import { createForum, getForums, createComment, getCommentsByForum } from '../controllers/forumController';

const router = Router();

// Routes pour les forums
router.get('/forums', getForums);
router.post('/forums', createForum);

// Routes pour les commentaires
router.post('/forums/:id/comments', createComment);
router.get('/forums/:id/comments', getCommentsByForum);

export default router;