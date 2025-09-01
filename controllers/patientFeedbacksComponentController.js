const express = require("express");
const router = express.Router();
const patientFeedbacksComponentModel = require("../models/patientFeedbacksComponentModel");
const { upload } = require("../middleware");

// Create or update feedbacks
router.post(
  "/dataAdd",
  upload.any(), // accept multiple files
  async (req, res) => {
    try {
      const body = req.body;
      const files = req.files;

      let results = [];
      const count = Object.keys(body).filter((k) =>
        k.startsWith("componentHeading_")
      ).length;

      for (let i = 0; i < count; i++) {
        const file = files.find((f) => f.fieldname === `patientImg_${i}`);
        const _id = body[`_id_${i}`]; // coming from frontend

        let feedbackData = {
          componentHeading: body[`componentHeading_${i}`],
          patientFeeback: body[`patientFeeback_${i}`],
          patientName: body[`patientName_${i}`],
          patientProblem: body[`patientProblem_${i}`],
        };

        // Handle image
        if (file) {
          feedbackData.patientImg = file.filename;
        } else if (body[`patientImg_${i}`]) {
          // keep old image if provided
          feedbackData.patientImg = body[`patientImg_${i}`];
        }

        if (_id) {
          // Update existing document
          const updated = await patientFeedbacksComponentModel.findByIdAndUpdate(
            _id,
            { $set: feedbackData },
            { new: true }
          );
          results.push(updated);
        } else {
          // Insert new document
          const newDoc = new patientFeedbacksComponentModel(feedbackData);
          const saved = await newDoc.save();
          results.push(saved);
        }
      }

      res.send({ status: 1, message: "saved", data: results });
    } catch (error) {
      console.error("Error saving:", error);
      res.status(500).send({ status: 0, message: "Internal server error" });
    }
  }
);

// Fetch all
router.get("/dataGet", async (req, res) => {
  try {
    const data = await patientFeedbacksComponentModel.find();
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

// Delete by ID
router.delete("/dataDelete/:id", async (req, res) => {
  try {
    await patientFeedbacksComponentModel.findByIdAndDelete(req.params.id);
    res.status(200).send({ status: 1, message: "deleted" });
  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).send({ status: 0, message: "Internal server error" });
  }
});

module.exports = router;
