import express, { RequestHandler } from 'express';
import {
  startRun, updateRun,
  pauseRun, resumeRun,
  finishRun, cancelRun,
  getRunsByUser,
} from '../controllers/run.controller';

const runRouter = express.Router();

runRouter.post('/start', startRun as RequestHandler);
runRouter.post('/update', updateRun as RequestHandler);
runRouter.post('/pause', pauseRun as RequestHandler);
runRouter.post('/resume', resumeRun as RequestHandler);
runRouter.post('/finish', finishRun as RequestHandler);
runRouter.post('/cancel', cancelRun as RequestHandler);
runRouter.get('/:userId', getRunsByUser as RequestHandler);

export default runRouter;
