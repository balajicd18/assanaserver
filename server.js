const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const serverless = require("serverless-http");
require("dotenv").config({ quiet: true });

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



// Routes
const landPagedata = require("./controllers/landingPagecontroller");
app.use("/api/landPage", landPagedata);

const bannerComponentData = require("./controllers/bannerComponentController");
app.use("/api/bannerComponent", bannerComponentData);

const whyAssanaComponentData = require("./controllers/whyAssanaComponentController");
app.use("/api/whyassanaComponent", whyAssanaComponentData);

const servicesComponentData = require("./controllers/servicesComponentController");
app.use("/api/servicesComponent", servicesComponentData);

const askedQuestionsComponentData = require("./controllers/askedQuestionsComponentController");
app.use("/api/askedQuestionsComponent", askedQuestionsComponentData);

const patientFeedbacksComponentData = require("./controllers/patientFeedbacksComponentController");
app.use("/api/patientFeedbackComponent", patientFeedbacksComponentData);

const getStartedComponentData = require("./controllers/getStartedComponentController");
app.use("/api/getStartedComponent", getStartedComponentData);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("DB connected successfully"))
  .catch(err => console.error("Connection error:", err));


module.exports = app;
module.exports.handler = serverless(app);
