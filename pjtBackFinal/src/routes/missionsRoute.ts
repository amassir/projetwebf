import { Router } from 'express';
import { getMissions, addMission, deleteMission, updateMission, getMissionById } from '../controllers/missionsController';

const router = Router();

router.get('/missions', getMissions);
router.get('/missions/:id', getMissionById);
router.post('/missions', addMission);
router.put('/missions/:id', updateMission);
router.delete('/missions/:id', deleteMission);

export default router;