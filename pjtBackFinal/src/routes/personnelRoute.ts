import { Router } from 'express';
import { getPersonnel, getPersonnelById, getPersonnelByMission, getPersonnelByCompetence, addPersonnel, validatePersonnelRecommendations, updatePersonnel, deletePersonnel } from '../controllers/personnelController';

const router = Router();

router.get('/personnel', getPersonnel);
router.get('/personnel/:id', getPersonnelById);
router.get('/missions/:id/personnel', getPersonnelByMission);
router.get('/personnel/competence/:id', getPersonnelByCompetence);    
router.post('/personnel', addPersonnel);
router.post('/missions/:id/validate', validatePersonnelRecommendations);
router.put('/personnel/:id', updatePersonnel);
router.delete('/personnel/:id', deletePersonnel);

export default router;