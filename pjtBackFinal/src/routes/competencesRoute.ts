import { Router } from 'express';
import { getCompetences,getCompetencesByPersonnel, addCompetence, deleteCompetence, getCompetencesByMission, getCompetenceById } from '../controllers/competencesController';

const router = Router();

router.get('/competences', getCompetences);
router.get('/competences/:id', getCompetenceById);
router.get("/personnel/:id/competences", getCompetencesByPersonnel);
router.get("/missions/:id/competences", getCompetencesByMission);
router.post('/competences', addCompetence);
router.delete('/competences/:id', deleteCompetence);

export default router;