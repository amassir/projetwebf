import { Router } from 'express';
import { getExecuter, addExecuter, deleteExecuter } from '../controllers/executerController';

// Initialisation du router
const router = Router();

/* Routes avec GET*/
// Route pour récupérer tous les exécutants (Personnel/Missions)
router.get('/executer', getExecuter);

/* Routes avec POST*/
// Route pour ajouter un exécutant (Personnel/Missions)
router.post('/executer', addExecuter);

/* Routes avec DELETE*/
// Route pour supprimer un exécutant (Personnel/Missions)
router.delete('/executer/:idM/:idP', deleteExecuter);

export default router;