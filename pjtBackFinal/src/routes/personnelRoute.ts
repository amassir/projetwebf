import { Router } from 'express';
import { getPersonnel, getPersonnelById, addPersonnel, updatePersonnelStatus, deletePersonnel } from '../controllers/personnelController';

const router = Router();

router.get('/personnel', getPersonnel);
router.get('/personnel/:id', getPersonnelById);
router.post('/personnel', addPersonnel);
router.put('/personnel/:id', updatePersonnelStatus);
router.delete('/personnel/:id', deletePersonnel);

export default router;
