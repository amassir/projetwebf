import { Router } from 'express';
import { getDisposer, addDisposer, deleteDisposer } from '../controllers/disposerController';

const router = Router();

router.get('/disposer', getDisposer);
router.post('/disposer', addDisposer);
router.delete('/disposer/:idP/:idC', deleteDisposer);

export default router;