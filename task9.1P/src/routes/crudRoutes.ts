import express from 'express';
import { ObjectId } from 'mongodb';
import { sendError } from '../utils';
import { getHistoryCollection } from '../db';

const router = express.Router();

/**
 * History
 */
router.get('/history', async (_req, res) => {
  const collection = await getHistoryCollection();
  const results = await collection.find().sort({ timestamp: -1 }).limit(20).toArray();
  res.json(results);
});

/**
 * Update
 */
router.put('/update/:id', async (req, res) => {
  const { id } = req.params;
  const newResult = req.body.result;

  if (typeof newResult !== 'number') {
    return sendError(res, 'New result must be a number.');
  }

  const collection = await getHistoryCollection();
  const result = await collection.updateOne(
    { _id: new ObjectId(id) },
    { $set: { result: newResult } }
  );

  if (result.matchedCount === 0) {
    return sendError(res, 'No record found with that ID.');
  }

  res.json({ message: 'Result updated successfully.' });
});


/**
 * Delete
 */
router.delete('/delete/:id', async (req, res) => {
  const { id } = req.params;
  const collection = await getHistoryCollection();
  const result = await collection.deleteOne({ _id: new ObjectId(id) });

  if (result.deletedCount === 0) {
    return sendError(res, 'No record found with that ID.');
  }

  res.json({ message: 'Entry deleted successfully.' });
});

export default router;