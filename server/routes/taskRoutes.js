const express = require("express");

const Task = require("../models/Task");

const authMiddleware = require("../middleware/authMiddleware");

const roleMiddleware = require("../middleware/roleMiddleware");

const router = express.Router();


// CREATE TASK (ADMIN ONLY)
router.post(
  "/",
  authMiddleware,
  roleMiddleware("admin"),

  async (req, res) => {

    try {

      const {
        title,
        description,
        assignedTo,
        project,
        dueDate
      } = req.body;

      const task = await Task.create({
        title,
        description,
        assignedTo,
        project,
        dueDate,
      });

      res.status(201).json(task);

    } catch (error) {

      res.status(500).json({
        message: error.message,
      });

    }
  }
);


// GET ALL TASKS
router.get(
  "/",
  authMiddleware,

  async (req, res) => {

    try {

      const tasks = await Task.find()
      .populate("assignedTo", "name email")
      .populate("project", "title");

      res.json(tasks);

    } catch (error) {

      res.status(500).json({
        message: error.message,
      });

    }
  }
);


// UPDATE TASK STATUS
router.put(
  "/:id",
  authMiddleware,

  async (req, res) => {

    try {

      const { status } = req.body;

      const updatedTask = await Task.findByIdAndUpdate(
        req.params.id,
        { status },
        { new: true }
      );

      res.json(updatedTask);

    } catch (error) {

      res.status(500).json({
        message: error.message,
      });

    }
  }
);

module.exports = router;