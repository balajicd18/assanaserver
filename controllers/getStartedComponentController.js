const express = require("express");
const router = express.Router();
const getStartedComponentModel = require("../models/getStartedComponentModel");
const { upload } = require("../middleware");

router.post(
  "/dataAdd",
  upload.fields([{ name: "backgroundImg", maxCount: 1 }]),
  async (req, res) => {
    try {
      let getStartedComponentData = {
        ...req.body,
      };

      // If new file uploaded → use new filename
      if (req.files && req.files.backgroundImg) {
        getStartedComponentData.backgroundImg =
          req.files.backgroundImg[0].filename;
      } else if (req.body.backgroundImg) {
        // If no new file but frontend sends old filename → keep it
        getStartedComponentData.backgroundImg = req.body.backgroundImg;
      }

      const updatedDoc = await getStartedComponentModel.findOneAndUpdate(
        {}, // only one document
        { $set: getStartedComponentData },
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
    const data = await getStartedComponentModel.findOne(); // single landing page
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
