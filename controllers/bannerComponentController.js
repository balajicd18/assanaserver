const express = require("express");
const router = express.Router();
const bannerComponentModel = require("../models/bannerComponentModel");
const { upload } = require("../middleware");

router.post(
  "/dataAdd",
  upload.fields([
    { name: "bannerImg", maxCount: 1 },
    { name: "bannerleftImg1", maxCount: 1 },
    { name: "bannerleftImg2", maxCount: 1 },
    { name: "bannerleftImg3", maxCount: 1 },
    { name: "bannerleftImg4", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const bannerComponentData = {
        ...req.body,
        bannerImg: req.files.bannerImg ? req.files.bannerImg[0].filename : req.body.bannerImg || null,
        bannerleftImg1: req.files.bannerleftImg1 ? req.files.bannerleftImg1[0].filename : req.body.bannerleftImg1 || null,
        bannerleftImg2: req.files.bannerleftImg2 ? req.files.bannerleftImg2[0].filename : req.body.bannerleftImg2 || null,
        bannerleftImg3: req.files.bannerleftImg3 ? req.files.bannerleftImg3[0].filename : req.body.bannerleftImg3 || null,
        bannerleftImg4: req.files.bannerleftImg4 ? req.files.bannerleftImg4[0].filename : req.body.bannerleftImg4 || null,
      };

      const updatedDoc = await bannerComponentModel.findOneAndUpdate(
        {}, // only one document
        { $set: bannerComponentData },
        { new: true, upsert: true }
      );

      res.send({ status: 1, message: "saved", data: updatedDoc });
    } catch (error) {
      console.error("Error saving:", error);
      res.status(500).send({ status: 0, message: "Internal server error" });
    }
  }
);

router.get("/dataGet", async (req, res) => {
  try {
    const data = await bannerComponentModel.findOne().select("-createdAt -updatedAt"); // exclude fields
    res.status(200).send({
      status: 1,
      message: "success",
      data: data,
    });
  } catch (error) {
    console.error("Fetch error:", error);
    res.status(500).send({ status: 0, message: "Internal server error" });
  }
});

module.exports = router;
