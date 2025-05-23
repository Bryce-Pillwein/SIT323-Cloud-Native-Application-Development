import { Router, RequestHandler } from 'express';
import fetch from 'node-fetch';

const router = Router();

const getProfile: RequestHandler<{ userId: string }> = async (req, res) => {
  const { userId } = req.params;

  try {
    const response = await fetch(`http://profile-service:3001/v1/profile/${userId}`);
    const body = await response.json();
    res.status(response.status).json(body);
  } catch (err) {
    console.error('Error fetching profile:', err);
    res.status(500).json({ message: 'Failed to fetch profile' });
  }
};

router.get('/profile/:userId', getProfile);

export default router;
