import express from "express";

const router = express.Router();

// Placeholder routes - will be implemented as needed
router.get("/", (req, res) => {
  res.json({ success: true, message: "Chat route" });
});

export default router;
