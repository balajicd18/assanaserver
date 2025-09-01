const express = require("express");
const router = express.Router();
const servicesComponentModel = require("../models/servicesComponentModel");

// Save / Update services
router.post("/dataAdd", async (req, res) => {
  try {
    const payload = req.body;

    // If it's an array → handle multiple services
    if (Array.isArray(payload)) {
      const results = [];

      for (let service of payload) {
        if (service._id) {
          // update existing
          const updated = await servicesComponentModel.findByIdAndUpdate(
            service._id,
            { $set: service },
            { new: true }
          );
          results.push(updated);
        } else {
          // create new
          const created = new servicesComponentModel(service);
          await created.save();
          results.push(created);
        }
      }

      return res.send({ status: 1, message: "saved", data: results });
    }

    // If only one object
    if (payload._id) {
      const updated = await servicesComponentModel.findByIdAndUpdate(
        payload._id,
        { $set: payload },
        { new: true }
      );
      return res.send({ status: 1, message: "saved", data: updated });
    } else {
      const created = new servicesComponentModel(payload);
      await created.save();
      return res.send({ status: 1, message: "saved", data: created });
    }
  } catch (error) {
    console.error("Error saving:", error);
    res
      .status(500)
      .send({ status: 0, message: "Internal server error", error });
  }
});

// DELETE service by ID
router.delete("/dataDelete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await servicesComponentModel.findByIdAndDelete(id);
    res.status(200).send({ status: 1, message: "Deleted successfully" });
  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).send({ status: 0, message: "Internal server error" });
  }
});

// GET all services
router.get("/dataGet", async (req, res) => {
  try {
    const data = await servicesComponentModel.find();
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
