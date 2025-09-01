const express = require("express");
const router = express.Router();
const whyAssanaComponentModel = require("../models/whyAssanaComponentModel");




router.post(
  "/dataAdd", async (req, res) => {
    try {
      const whyAssanaComponentData = {
        ...req.body,
      };

      const updatedDoc = await whyAssanaComponentModel.findOneAndUpdate(
        {}, // only one landing page
        { $set: whyAssanaComponentData },
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
    const data = await whyAssanaComponentModel.findOne(); // single landing page
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




module.exports = router