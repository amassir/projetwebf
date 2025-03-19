import { Router } from 'express';
import { 
    getMissions, 
    addMission, 
    addCompetenceToMission, 
    addPersonnelToMission, 
    deleteMission, 
    updateMission, 
    getMissionById, 
    recommendPersonnelForMission,
    getPersonnelByMission
} from '../controllers/missionsController';

const router = Router();

router.get('/missions', getMissions);
router.get('/missions/:id', getMissionById);
router.post('/missions', addMission);
router.post('/missions/:id/competences', addCompetenceToMission);
router.post('/missions/:id/personnels', addPersonnelToMission);
router.put('/missions/:id', updateMission);
router.delete('/missions/:id', deleteMission);
router.get('/missions/:id/personnels', getPersonnelByMission);

// ✅ Assure-toi que cette route est correcte
router.get('/missions/:id/recommendations', recommendPersonnelForMission);

export default router;
