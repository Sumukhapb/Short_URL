const express = require("express");
const { restrictTo } = require("../middlewares/auth");
const URL = require("../models/url");

const router = express.Router();

// API: Get all URLs (admin only)
router.get("/admin/urls", restrictTo(["ADMIN"]), async (req, res) => {
  try {
    const allUrls = await URL.find({});
    return res.json({
      message: "All URLs retrieved successfully",
      count: allUrls.length,
      urls: allUrls,
    });
  } catch (error) {
    return res.status(500).json({ error: "Failed to retrieve URLs" });
  }
});

// API: Get user's URLs
router.get("/", restrictTo(["NORMAL", "ADMIN"]), async (req, res) => {
  try {
    const allUrls = await URL.find({ createdBy: req.user._id });
    return res.json({
      message: "User URLs retrieved successfully",
      count: allUrls.length,
      urls: allUrls,
    });
  } catch (error) {
    return res.status(500).json({ error: "Failed to retrieve URLs" });
  }
});

module.exports = router;
