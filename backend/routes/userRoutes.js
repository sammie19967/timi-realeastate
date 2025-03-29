import express from "express";
import { requireAuth } from "@clerk/express";
import { syncUser } from "../middleware/clerkMiddleware.js";

const router = express.Router();

router.get("/profile", requireAuth(), syncUser, (req, res) => {
  res.json({
    message: "User profile",
    user: req.user, // User data from the database
  });
});

export default router;