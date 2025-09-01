const mongoose = require("mongoose");

const askedQuestionsComponentSchema = new mongoose.Schema(
  {
    componentHeading: { type: String, default: "" },
    questionHeading: { type: String, default: "" },
    answerPara: { type: String, default: "" },
  },
  { timestamps: true }
);

// ✅ Export model, not schema
module.exports = mongoose.model(
  "AskedQuestionsComponent",  // model name
  askedQuestionsComponentSchema
);
