import { Router } from 'express';
import { getPersonnel, getPersonnelById, getPersonnelByMission, addPersonnel, updatePersonnel, deletePersonnel } from '../controllers/personnelController';

const router = Router();

router.get('/personnel', getPersonnel);
router.get('/personnel/:id', getPersonnelById);
router.get('/missions/:id/personnel', getPersonnelByMission);    
router.post('/personnel', addPersonnel);
router.put('/personnel/:id', updatePersonnel);
router.delete('/personnel/:id', deletePersonnel);

export default router;