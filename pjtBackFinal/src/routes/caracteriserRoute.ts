import { Router } from 'express';
import { getCaracteriser, addCaracteriser, deleteCaracteriser } from '../controllers/caracteriserController';

// Initialisation du router
const router = Router();

/* Routes avec GET*/
// Route pour récupérer toutes les caractérisations (Compétences/Missions)
router.get('/caracteriser', getCaracteriser);

/* Routes avec POST*/
// Route pour ajouter une caractérisation (Compétences/Missions)
router.post('/caracteriser', addCaracteriser);

/* Routes avec DELETE*/
// Route pour supprimer une caractérisation (Compétences/Missions)
router.delete('/caracteriser/:idM/:idC', deleteCaracteriser);

export default router;