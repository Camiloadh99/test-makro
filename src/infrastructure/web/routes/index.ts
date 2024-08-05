import { Router } from 'express';
import healthyRouter from './healthy';
import v1Router from './v1';

const router = Router();

router.use('/', healthyRouter);
router.use('/v1', v1Router);

export default router;
