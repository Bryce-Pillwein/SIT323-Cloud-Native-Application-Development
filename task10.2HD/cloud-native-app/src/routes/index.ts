import { Router } from 'express';
import dataRouter from './post/data';
import historyRouter from './get/history';
import profileRouter from "./get/profile";
import aggregateRouter from "./get/aggregates"
import clearDataRouter from "./delete/clearData";


const router = Router();

router.use("/v1", profileRouter);
router.use('/v1', dataRouter);
router.use('/v1', historyRouter);
router.use('/v1', aggregateRouter);
router.use('/v1', clearDataRouter);

export default router;
