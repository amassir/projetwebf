import { Router } from 'express';
import { getMissions, addMission, addCompetenceToMission, deleteMission, updateMission, getMissionById } from '../controllers/missionsController';

const router = Router();

router.get('/missions', getMissions);
router.get('/missions/:id', getMissionById);
router.post('/missions', addMission);
router.post('/missions/:id/competences', addCompetenceToMission);
router.put('/missions/:id', updateMission);
router.delete('/missions/:id', deleteMission);

export default router;