"use strict";
// Run.Controller 
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRunsByUser = exports.cancelRun = exports.finishRun = exports.resumeRun = exports.pauseRun = exports.updateRun = exports.startRun = void 0;
const firebase_1 = require("../config/firebase");
const uuid_1 = require("uuid");
const inMemoryStore_1 = require("../types/inMemoryStore");
/**
 * Start Run
 * @param req
 * @param res
 * @returns
 */
const startRun = (req, res) => {
    const { userId, startTime } = req.body;
    if (!userId || !startTime) {
        return res.status(400).json({ error: 'Missing userId or startTime' });
    }
    const runId = (0, uuid_1.v4)();
    ;
    inMemoryStore_1.activeRuns[runId] = {
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
exports.startRun = startRun;
/**
 * Update Run
 * @param req
 * @param res
 * @returns
 */
const updateRun = (req, res) => {
    const { runId, coordinate, distance, heartRate, elevation, timestamp } = req.body;
    const run = inMemoryStore_1.activeRuns[runId];
    if (!run)
        return res.status(404).json({ error: 'Run not found' });
    if (run.status !== 'active')
        return res.status(400).json({ error: 'Run is not active' });
    run.route.push({ coordinate, timestamp });
    run.totalDistance = distance; // optionally recalculate from coordinates instead
    if (heartRate)
        run.heartRates.push(heartRate);
    if (elevation !== undefined)
        run.totalElevation += elevation;
    run.latestTimestamp = timestamp;
    res.status(200).json({ message: 'Run Updated' });
};
exports.updateRun = updateRun;
/**
 * Pause Run
 * @param req
 * @param res
 * @returns
 */
const pauseRun = (req, res) => {
    const { runId } = req.body;
    const run = inMemoryStore_1.activeRuns[runId];
    if (!run)
        return res.status(404).json({ error: 'Run not found' });
    run.status = 'paused';
    res.status(200).json({ message: 'Run paused' });
};
exports.pauseRun = pauseRun;
/**
 * Resume Run
 * @param req
 * @param res
 * @returns
 */
const resumeRun = (req, res) => {
    const { runId } = req.body;
    const run = inMemoryStore_1.activeRuns[runId];
    if (!run)
        return res.status(404).json({ error: 'Run not found' });
    run.status = 'active';
    res.status(200).json({ message: 'Run resumed' });
};
exports.resumeRun = resumeRun;
/**
 * Finish Run
 * Calculate & Aggregate Data
 * @param req
 * @param res
 * @returns
 */
const finishRun = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { runId, endTime } = req.body;
        const run = inMemoryStore_1.activeRuns[runId];
        if (!run)
            return res.status(404).json({ error: 'Run not found' });
        const avgHeartRate = run.heartRates.length
            ? run.heartRates.reduce((a, b) => a + b, 0) / run.heartRates.length
            : null;
        const totalTimeSec = (new Date(endTime).getTime() - new Date(run.startTime).getTime()) / 1000;
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
        yield firebase_1.db.collection('runsHistory').doc(runId).set(result);
        delete inMemoryStore_1.activeRuns[runId];
        res.status(200).json({ message: 'Run finished and saved to Firestore' });
    }
    catch (err) {
        console.error('Error finishing run:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.finishRun = finishRun;
/**
 * Cancel Run
 * @param req
 * @param res
 * @returns
 */
const cancelRun = (req, res) => {
    const { runId } = req.body;
    if (!inMemoryStore_1.activeRuns[runId])
        return res.status(404).json({ error: 'Run not found' });
    delete inMemoryStore_1.activeRuns[runId];
    res.status(200).json({ message: 'Run Canceled' });
};
exports.cancelRun = cancelRun;
/**
 * Get Runs By User
 * @param req
 * @param res
 * @returns
 */
const getRunsByUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        if (!userId)
            return res.status(400).json({ error: 'User ID is required' });
        const snapshot = yield firebase_1.db.collection('runsHistory').where('userId', '==', userId).get();
        const runs = snapshot.docs.map(doc => (Object.assign({ id: doc.id }, doc.data())));
        res.status(200).json({ runs });
    }
    catch (err) {
        console.error('Error fetching runs:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.getRunsByUser = getRunsByUser;
