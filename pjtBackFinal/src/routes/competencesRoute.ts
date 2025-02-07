import { Router } from 'express';
import { getCompetences, addCompetence, deleteCompetence } from '../controllers/competencesController';

const router = Router();

router.get('/competences', getCompetences);
router.post('/competences', addCompetence);
router.delete('/competences/:id', deleteCompetence);

export default router;