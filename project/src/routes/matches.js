import { Router } from "express";

const router = Router();

// Define routes for matches
router.get("/", (req, res) => {
  res.send("Get all matches");
});

export default router;