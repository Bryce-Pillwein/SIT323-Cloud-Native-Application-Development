import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';
import { HealthData } from '../types/HealthData';

const baseSchema = z.object({
  userId: z.string(),
  timestamp: z.string().refine(s => !Number.isNaN(Date.parse(s)), 'Invalid ISO date'),
  mode: z.enum(['idle', 'run']),
  heartRate: z.number().min(0).max(220),
  spo2: z.number().min(0).max(100),
  temperature: z.number().min(30).max(45),
  motion: z.boolean(),
  location: z.object({ lat: z.number(), lng: z.number() })
});

// Extend for run to require runId, pace, distance
const runSchema = baseSchema.extend({
  mode: z.literal('run'),
  runId: z.string(),
  pace: z.number().positive(),
  distance: z.number().nonnegative()
});

export const HealthDataSchema = z.union([baseSchema, runSchema]);

export function validateHealthData(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  try {
    req.body = HealthDataSchema.parse(req.body) as HealthData;
    next();
  } catch (err: any) {
    res.status(400);
    res.json({ error: err.errors });
  }
}
