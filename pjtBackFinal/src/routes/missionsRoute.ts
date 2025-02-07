import { Router } from 'express';
import { getMissions, addMission, deleteMission } from '../controllers/missionsController';

const router = Router();

router.get('/missions', getMissions);
router.post('/missions', addMission);
router.delete('/missions/:id', deleteMission);

export default router;