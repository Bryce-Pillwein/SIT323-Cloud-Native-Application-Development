import { Request, Response } from 'express';
import { db } from '../config/firebase';
import { RunEntry } from '../types/RunEntry';

export const logRun = async (req: Request, res: Response) => {
  try {
    const {
      userId,
      startTime, endTime, distance, pace,
      route, calories, elevationGain,
    } = req.body;

    if (!userId || !startTime || !distance || !pace || !Array.isArray(route)) {
      return res.status(400).json({ error: 'Missing or invalid required fields' });
    }

    const runData: RunEntry = {
      userId,
      startTime,
      endTime: endTime ?? null,
      distance: Number(distance),
      pace: Number(pace),
      route,
      calories: calories ?? null,
      elevationGain: elevationGain ?? null,
      createdAt: new Date().toISOString(),
    };

    await db.collection('runs').add(runData);
    res.status(201).json({ message: 'Run logged successfully' });
  } catch (err) {
    console.error('Error logging run:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getRunsByUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    const snapshot = await db.collection('runs').where('userId', '==', userId).get();
    const runs: RunEntry[] = [];
    snapshot.forEach(doc => {
      runs.push({ id: doc.id, ...doc.data() } as RunEntry);
    });

    res.status(200).json({ runs });
  } catch (err) {
    console.error('Error fetching runs:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
