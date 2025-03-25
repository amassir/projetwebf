import { Router } from 'express';
import { createForum, getForums, createComment, getCommentsByForum } from '../controllers/forumController';

// Initialisation du router
const router = Router();

/* Routes avec GET*/
// Route pour récupérer tous les forums
router.get('/forums', getForums);

// Route pour récupérer les commentaires d'un forum
router.get('/forums/:id/comments', getCommentsByForum);

/* Routes avec POST*/
// Route pour ajouter un forum
router.post('/forums', createForum);

// Route pour ajouter un commentaire à un forum
router.post('/forums/:id/comments', createComment);

export default router;