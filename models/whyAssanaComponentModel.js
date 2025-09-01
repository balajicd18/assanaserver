const mongoose = require("mongoose");

const whyassanaComponentSchema = new mongoose.Schema(
  {
    leftHeading: String,
    rightHeading: String,
    rightPara: String,



  },
  { timestamps: true }
);

module.exports = mongoose.model("whyassanaComponent", whyassanaComponentSchema);
