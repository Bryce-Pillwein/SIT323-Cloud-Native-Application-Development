import { Router, Request, Response } from "express";
import { clearUserData } from "../../services/clearUserData";

const router = Router();

const clearDataHandler = async (req: Request, res: Response): Promise<void> => {
  const { userId } = req.params;

  try {
    await clearUserData(userId);
    res.status(200).json({ message: `Cleared data for user ${userId}` });
    return;
  } catch (err: any) {
    console.error("Error clearing user data:", err);
    res.status(500).json({ message: err.message });
    return;
  }
}

router.delete(
  '/users/:userId/data',
  clearDataHandler
);

export default router;