const express = require("express");
const router = express.Router();
const landingPageModel = require("../models/landingPagemodel");
const { upload } = require("../middleware");

router.post(
  "/dataAdd",
  upload.fields([
    { name: "logo", maxCount: 1 },
    { name: "background", maxCount: 1 },
    { name: "doctorImage", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      // Get existing landing page (since only one exists)
      let existingDoc = await landingPageModel.findOne();

      const landingPageData = {
        ...req.body,
        logo: req.files.logo
          ? req.files.logo[0].filename // new upload
          : req.body.logoOld || (existingDoc ? existingDoc.logo : null), // keep old

        background: req.files.background
          ? req.files.background[0].filename
          : req.body.backgroundOld || (existingDoc ? existingDoc.background : null),

        doctorImage: req.files.doctorImage
          ? req.files.doctorImage[0].filename
          : req.body.doctorImageOld || (existingDoc ? existingDoc.doctorImage : null),
      };

      const updatedDoc = await landingPageModel.findOneAndUpdate(
        {}, // update the single document
        { $set: landingPageData },
        { new: true, upsert: true }
      );

      res.send({ status: 1, message: "Saved Successfully", data: updatedDoc });
    } catch (error) {
      console.error("Error saving:", error);
      res.status(500).send({ status: 0, message: "Internal server error" });
    }
  }
);

router.get("/dataGet", async (req, res) => {
  try {
    const data = await landingPageModel.findOne().select(
      "-_id -__v -createdAt -updatedAt"
    ); // exclude unwanted fields

    res.status(200).send({
      status: 1,
      message: "success",
      data,
    });
  } catch (error) {
    console.error("Fetch error:", error);
    res.status(500).send({ status: 0, message: "Internal server error" });
  }
});

module.exports = router;
