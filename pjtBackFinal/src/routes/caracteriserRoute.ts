import { Router } from 'express';
import { getCaracteriser, addCaracteriser, deleteCaracteriser } from '../controllers/caracteriserController';

const router = Router();

router.get('/caracteriser', getCaracteriser);
router.post('/caracteriser', addCaracteriser);
router.delete('/caracteriser/:idM/:idC', deleteCaracteriser);

export default router;