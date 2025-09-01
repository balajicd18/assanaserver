const mongoose = require("mongoose");

const bannerComponentSchema = new mongoose.Schema(
  {
    upperContent: String,
    bannerCenterHead: String,
    bannerleftParaHighlightBefore: String,
    bannerleftParaHighlight: String,
    bannerleftParaHighlightAfter: String,
    bannerrightPara: String,
    bannerrightParaHighlight: String,
    bannerleftImg1Head: String,
    bannerleftImg1Para: String,
    bannerleftImg2Head: String,
    bannerleftImg2Para: String,
    bannerleftImg3Head: String,
    bannerleftImg3Para: String,
    bannerleftImg4Head: String,
    bannerleftImg4Para: String,


    // Image fields
    bannerImg: String,
    bannerleftImg1: String,
    bannerleftImg2: String,
    bannerleftImg3: String,
    bannerleftImg4: String,

  },
  { timestamps: true }
);

module.exports = mongoose.model("BannerComponent", bannerComponentSchema);
