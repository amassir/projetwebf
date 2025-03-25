import { Router } from 'express';
import { getDisposer, addDisposer, deleteDisposer } from '../controllers/disposerController';

// Initialisation du router
const router = Router();

/* Routes avec GET*/
// Route pour récupérer toutes les dispositions (Compétences/Personnel)
router.get('/disposer', getDisposer);

/* Routes avec POST*/
// Route pour ajouter une disposition (Compétences/Personnel)
router.post('/disposer', addDisposer);

/* Routes avec DELETE*/
// Route pour supprimer une disposition (Compétences/Personnel)
router.delete('/disposer/:idP/:idC', deleteDisposer);

export default router;