const mongoose = require("mongoose");

const landingPageSchema = new mongoose.Schema(
  {
    leftContent1: String,
    leftContent2: String,
    leftContent3: String,
    leftPara1: String,
    leftPara2: String,
    rightPara1: String,
    rightPara2: String,
    doctorName: String,
    doctorQualification: String,
    doctorWork: String,
    email: String,
    scrollPara: String,
    address: String,

    // Image fields
    logo: String,
    background: String,
    doctorImage: String,
  },
  { timestamps: false } //  disable createdAt & updatedAt
);

module.exports = mongoose.model("LandingPage", landingPageSchema);
