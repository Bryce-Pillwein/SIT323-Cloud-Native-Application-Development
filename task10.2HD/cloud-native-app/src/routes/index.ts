import { Router } from 'express';
import dataRouter from './data';
import historyRouter from './history';
import profileRouter from "./profile";

const router = Router();

router.use("/v1", profileRouter);
router.use('/v1', dataRouter);
router.use('/v1', historyRouter);

export default router;
