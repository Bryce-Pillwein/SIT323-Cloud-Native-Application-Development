import { Router } from 'express';
import dataRouter from './data';
import historyRouter from './history';

const router = Router();

router.use('/v1', dataRouter);
router.use('/v1', historyRouter);

export default router;
