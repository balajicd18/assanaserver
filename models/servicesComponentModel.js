const mongoose = require("mongoose");

const servicesComponentSchema = new mongoose.Schema(
  {
    componentHeading: String,
    serviceHeading: String,
    serviceOpenHeading: String,
    serviceOpenPara1: String,
    serviceOpenPara2: String,

  },
  { timestamps: true }
);

module.exports = mongoose.model("servicesComponent", servicesComponentSchema);
