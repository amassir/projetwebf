import { Router } from 'express';
import { register, login } from '../controllers/authController';

// Initialisation du router
const router = Router();

/* Routes avec POST*/
// Route pour l'inscription d'un utilisateur
router.post('/auth', register);

// Route pour la connexion d'un utilisateur
router.post('/login', login);

export default router;