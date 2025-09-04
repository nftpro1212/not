const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/user"); // modelni chaqiramiz

// POST /api/auth/login
router.post("/login", async (req, res) => {
  try {
    const { telegramId, username, firstName, lastName } = req.body;

    if (!telegramId) {
      return res.status(400).json({ error: "telegramId is required" });
    }

    const now = new Date();

    // Upsert (bor bo‘lsa update, yo‘q bo‘lsa create)
    const user = await User.findOneAndUpdate(
      { telegramId },
      {
        $set: { username, firstName, lastName, lastLogin: now },
        $setOnInsert: { createdAt: now, balanceTon: 0, balanceUsdt: 0 }
      },
      { new: true, upsert: true }
    );

    // JWT token yaratamiz
    const token = jwt.sign(
      { id: user._id, telegramId: user.telegramId },
      process.env.JWT_SECRET || "dev_secret",
      { expiresIn: "30d" }
    );

    res.json({ token, user });
  } catch (err) {
    console.error("❌ Auth error:", err.message);
    res.status(500).json({ error: "Server error" });
  }
});

// GET /api/auth/me
const auth = require("../utils/authMiddleware");
router.get("/me", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
