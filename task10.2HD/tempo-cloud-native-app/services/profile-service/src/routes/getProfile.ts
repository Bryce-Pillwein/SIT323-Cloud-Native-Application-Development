import { Router, RequestHandler } from "express";
import { db } from '../config/firebase';
import { UserProfile } from '../types/UserProfile';

const router = Router();

const getProfile: RequestHandler<{ userId: string }> = async (req, res) => {
  const { userId } = req.params;

  try {
    const doc = await db.collection("USER_PROFILES").doc(userId).get();

    if (!doc.exists) {
      res.status(404).json({ message: "Profile not found" });
      return;
    }

    const profile = doc.data() as UserProfile;

    res.json(profile);
    return;
  } catch (err: any) {
    console.error("Error fetching profile:", err);
    res.status(500).json({ message: err.message });
    return;
  }
};

router.get("/profile/:userId", getProfile);

export default router;
