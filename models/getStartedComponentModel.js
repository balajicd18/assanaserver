const mongoose = require("mongoose");

const getStartedComponentSchema = new mongoose.Schema(
  {
    Heading: String,
    subHeading: String,

    // Image fields
    backgroundImg: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("getStartedComponent", getStartedComponentSchema);
