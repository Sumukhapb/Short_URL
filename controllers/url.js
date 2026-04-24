const shortid = require("shortid");
const URL = require("../models/url");

async function handleGenerateNewShortUrl(req, res) {
  const url = req.body.url;
  if (!url) return res.status(400).json({ error: "url is required" });

  const shortID = shortid.generate();

  try {
    const newUrl = await URL.create({
      shortID,
      redirectURL: url,
      visitHistory: [],
      createdBy: req.user?._id,
    });

    return res.status(201).json({
      message: "Short URL created successfully",
      shortID: newUrl.shortID,
      shortURL: `${req.protocol}://${req.get("host")}/${newUrl.shortID}`,
      redirectURL: newUrl.redirectURL,
    });
  } catch (error) {
    console.error("Error creating new URL:", error);
    if (error.code === 11000) {
      return res.status(400).json({ error: "Duplicate shortID error" });
    }
    return res.status(500).json({ error: "Server error" });
  }
}

module.exports = {
  handleGenerateNewShortUrl,
};
