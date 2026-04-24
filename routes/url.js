const express = require("express");
const {
  handleGenerateNewShortUrl,
  // handleGetAnalytics,
} = require("../controllers/url");

const router = express.Router();

// Define a route for generating new short URLs
router.post("/", handleGenerateNewShortUrl);

// Define a route for getting analytics, ensuring it does not conflict with short IDs
// router.get("/analytics/:shortID", handleGetAnalytics);

module.exports = router;
