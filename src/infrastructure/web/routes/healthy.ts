import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.send('I am healthy');
});

export default router;
