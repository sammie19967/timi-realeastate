import { requireAuth } from "@clerk/express";
import User from "../models/User.js";

export const syncUser = async (req, res, next) => {
  const { userId, emailAddresses, firstName, lastName } = req.auth.user;

  try {
    // Check if the user already exists in the database
    let user = await User.findOne({ clerkId: userId });

    if (!user) {
      // Create a new user if they don't exist
      user = new User({
        clerkId: userId,
        email: emailAddresses[0].emailAddress,
        name: `${firstName} ${lastName}`,
      });
      await user.save();
    }

    // Attach the user to the request object for further use
    req.user = user;
    next();
  } catch (error) {
    console.error("Error syncing user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};