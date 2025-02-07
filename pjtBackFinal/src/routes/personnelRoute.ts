import { Router } from 'express';
import { getPersonnel, addPersonnel, deletePersonnel } from '../controllers/personnelController';

const router = Router();

router.get('/personnel', getPersonnel);
router.post('/personnel', addPersonnel);
router.delete('/personnel/:id', deletePersonnel);

export default router;
