require("dotenv").config();
const express = require("express");
const cors = require("cors");

const { connectMongoDB } = require("./connection");
const URL = require("./models/url");

const urlRouter = require("./routes/url");
const staticRoute = require("./routes/staticRouter");
const userRouter = require("./routes/user");
const cookieParser = require("cookie-parser");
const { checkForAuthentication, restrictTo } = require("./middlewares/auth");

const app = express();
const port = process.env.PORT || 8001;
const dbUrl = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/short-url";

// MongoDB Connection
connectMongoDB(dbUrl)
  .then(() => console.log("MongoDB Connected"))
  .catch((error) => console.error("MongoDB connection error:", error));

// MiddleWares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthentication);

// URL Routes
app.use("/url", restrictTo(["NORMAL", "ADMIN"]), urlRouter);

app.use("/user", userRouter);

app.use("/", staticRoute);

// Redirect Route for shortID
app.use("/:shortID", async (req, res) => {
  const shortID = req.params.shortID;
  console.log("Received shortID:", shortID);

  try {
    const entry = await URL.findOneAndUpdate(
      { shortID },
      {
        $push: {
          visitHistory: {
            timestamp: Date.now(),
          },
        },
      },
      { new: true }
    );

    // console.log("Found entry:", entry);  // Debug

    if (!entry) {
      console.error("Entry not found for shortID:", shortID);
      return res.status(404).send("URL not found");
    }

    res.redirect(entry.redirectURL);
  } catch (error) {
    console.error("Error handling redirect:", error);
    res.status(500).send("Server error");
  }
});

app.listen(port, () => console.log(`Server Started at Port: ${port}`));
