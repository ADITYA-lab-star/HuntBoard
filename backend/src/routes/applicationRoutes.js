import express from "express";
import Application from "../Application.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

// Get all applications for authenticated user
router.get("/", protect, async (req, res) => {
  try {
    const applications = await Application.find({ userId: req.user.id });
    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create a new application
router.post("/", protect, async (req, res) => {
  try {
    if (Array.isArray(req.body)) {
      const applications = await Promise.all(
        req.body.map((data) => {
          const application = new Application({
            ...data,
            userId: req.user.id,
          });
          return application.save();
        })
      );
      res.status(201).json(applications);
    } else {
      const application = new Application({
        ...req.body,
        userId: req.user.id,
      });
      await application.save();
      res.status(201).json(application);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete an application
router.delete("/:id", protect, async (req, res) => {
  try {
    const { id } = req.params;
    const application = await Application.findById(id);

    // Check if application exists
    if (!application) {
      return res.status(404).json({ error: "Application not found" });
    }

    // Check if user owns the application
    if (application.userId.toString() !== req.user.id) {
      return res.status(403).json({
        error: "Not authorized to delete this application",
      });
    }

    await Application.findByIdAndDelete(id);
    res.status(200).json({ message: "Application deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update an application
router.patch("/:id", protect, async (req, res) => {
  try {
    const { id } = req.params;
    const application = await Application.findById(id);

    // Check if application exists
    if (!application) {
      return res.status(404).json({ error: "Application not found" });
    }

    // Check if user owns the application
    if (application.userId.toString() !== req.user.id) {
      return res.status(403).json({
        error: "Not authorized to update this application",
      });
    }

    const updatedApplication = await Application.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    );

    res.status(200).json(updatedApplication);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
