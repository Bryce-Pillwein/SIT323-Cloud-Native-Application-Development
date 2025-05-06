// Run.Controller 

import { Request, Response } from 'express';
import { db } from '../config/firebase';
import { v4 as uuidv4 } from 'uuid';
import { activeRuns } from '../types/inMemoryStore';

/**
 * Start Run
 * @param req 
 * @param res 
 * @returns 
 */
export const startRun = (req: Request, res: Response) => {
  const { userId, startTime } = req.body;
  if (!userId || !startTime) {
    return res.status(400).json({ error: 'Missing userId or startTime' });
  }

  const runId = uuidv4();;

  activeRuns[runId] = {
    userId,
    startTime,
    status: 'active',
    route: [],
    totalDistance: 0,
    totalElevation: 0,
    heartRates: [],
    latestTimestamp: startTime,
  };

  res.status(201).json({ runId, message: 'Run started' });
};


/**
 * Update Run
 * @param req 
 * @param res 
 * @returns 
 */
export const updateRun = (req: Request, res: Response) => {
  const { runId, coordinate, distance, heartRate, elevation, timestamp } = req.body;

  const run = activeRuns[runId];
  if (!run) return res.status(404).json({ error: 'Run not found' });
  if (run.status !== 'active') return res.status(400).json({ error: 'Run is not active' });

  run.route.push({ coordinate, timestamp });
  run.totalDistance = distance; // optionally recalculate from coordinates instead

  if (heartRate) run.heartRates.push(heartRate);

  if (elevation !== undefined) run.totalElevation += elevation;

  run.latestTimestamp = timestamp;

  res.status(200).json({ message: 'Run Updated' });
};


/**
 * Pause Run
 * @param req 
 * @param res 
 * @returns 
 */
export const pauseRun = (req: Request, res: Response) => {
  const { runId } = req.body;
  const run = activeRuns[runId];
  if (!run) return res.status(404).json({ error: 'Run not found' });

  run.status = 'paused';
  res.status(200).json({ message: 'Run paused' });
};


/**
 * Resume Run
 * @param req 
 * @param res 
 * @returns 
 */
export const resumeRun = (req: Request, res: Response) => {
  const { runId } = req.body;
  const run = activeRuns[runId];
  if (!run) return res.status(404).json({ error: 'Run not found' });

  run.status = 'active';
  res.status(200).json({ message: 'Run resumed' });
};

/**
 * Finish Run
 * Calculate & Aggregate Data
 * @param req 
 * @param res 
 * @returns 
 */
export const finishRun = async (req: Request, res: Response) => {
  try {
    const { runId, endTime } = req.body;
    const run = activeRuns[runId];
    if (!run) return res.status(404).json({ error: 'Run not found' });

    const avgHeartRate = run.heartRates.length
      ? run.heartRates.reduce((a, b) => a + b, 0) / run.heartRates.length
      : null;

    const totalTimeSec =
      (new Date(endTime).getTime() - new Date(run.startTime).getTime()) / 1000;

    const avgPace = run.totalDistance > 0
      ? totalTimeSec / (run.totalDistance / 1000)
      : null;

    const result = {
      userId: run.userId,
      startTime: run.startTime,
      endTime,
      distance: run.totalDistance,
      avgPace,
      avgHeartRate,
      elevationGain: run.totalElevation,
      route: run.route,
      createdAt: new Date().toISOString(),
    };

    await db.collection('runsHistory').doc(runId).set(result);

    delete activeRuns[runId];

    res.status(200).json({ message: 'Run finished and saved to Firestore' });
  } catch (err) {
    console.error('Error finishing run:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

/**
 * Cancel Run
 * @param req 
 * @param res 
 * @returns 
 */
export const cancelRun = (req: Request, res: Response) => {
  const { runId } = req.body;
  if (!activeRuns[runId]) return res.status(404).json({ error: 'Run not found' });

  delete activeRuns[runId];
  res.status(200).json({ message: 'Run Canceled' });
};

/**
 * Get Runs By User
 * @param req 
 * @param res 
 * @returns 
 */
export const getRunsByUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    if (!userId) return res.status(400).json({ error: 'User ID is required' });

    const snapshot = await db.collection('runsHistory').where('userId', '==', userId).get();
    const runs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).json({ runs });
  } catch (err) {
    console.error('Error fetching runs:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
