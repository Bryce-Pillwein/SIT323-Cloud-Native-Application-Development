import express, { RequestHandler } from 'express';
import { logRun, getRunsByUser } from '../controllers/run.controller';

const runRouter: express.Router = express.Router();

// POST /api/run -> log a run
runRouter.post('/', logRun as RequestHandler);

// GET /api/run/:userId -> fetch all runs for a given user
runRouter.get('/:userId', getRunsByUser as RequestHandler);

export default runRouter;
