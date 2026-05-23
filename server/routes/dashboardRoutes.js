const express = require("express");

const Task = require("../models/Task");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();


// DASHBOARD STATS
router.get(
  "/stats",
  authMiddleware,

  async (req, res) => {

    try {

      const totalTasks = await Task.countDocuments();

      const completedTasks = await Task.countDocuments({
        status: "Completed",
      });

      const pendingTasks = await Task.countDocuments({
        status: "Pending",
      });

      const overdueTasks = await Task.countDocuments({
        dueDate: { $lt: new Date() },
        status: { $ne: "Completed" }
      });

      res.json({
        totalTasks,
        completedTasks,
        pendingTasks,
        overdueTasks,
      });

    } catch (error) {

      res.status(500).json({
        message: error.message,
      });

    }
  }
);

module.exports = router;