import { Router } from 'express';
import { getExecuter, addExecuter, deleteExecuter } from '../controllers/executerController';

const router = Router();

router.get('/executer', getExecuter);
router.post('/executer', addExecuter);
router.delete('/executer/:idM/:idP', deleteExecuter);

export default router;