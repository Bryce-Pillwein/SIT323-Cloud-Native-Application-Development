import { Router, Request, Response, RequestHandler } from "express";
import { db } from "../config/firebase";

const router = Router();

const getProfile: RequestHandler<{ userId: string }> = async (req, res) => {
  const { userId } = req.params;
  try {
    const snap = await db.collection("USER_PROFILES").doc(userId).get();

    if (!snap.exists) {
      res.status(404).json({ message: "Profile not found" });
      return;
    }

    res.json(snap.data());
    return;
  } catch (err: any) {
    console.error("Error fetching profile:", err);
    res.status(500).json({ message: err.message });
    return;
  }
};

router.get("/profile/:userId", getProfile);

export default router;
