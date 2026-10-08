const express = require("express");
const prisma = require("../prisma");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, async (req, res) => {
  try {
    const { title, description, priority, dueDate } = req.body;

    const task = await prisma.task.create({
      data: {
        title,
        description,
        priority,
        dueDate: dueDate ? new Date(dueDate) : null,
        userId: req.user.userId,
      },
    });

    res.status(201).json({
      message: "Task created successfully",
      task,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to create task",
    });
  }
});

router.get("/", authMiddleware, async (req, res) => {
  try {
    const tasks = await prisma.task.findMany({
      where: {
        userId: req.user.userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.json({
      tasks,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to get tasks",
    });
  }
});
router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const task = await prisma.task.findFirst({
      where: {
        id: Number(req.params.id),
        userId: req.user.userId,
      },
    });

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    res.json({
      task,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to get task",
    });
  }
});
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const { title, description, priority, dueDate, completed } = req.body;

    const task = await prisma.task.findFirst({
      where: {
        id: Number(req.params.id),
        userId: req.user.userId,
      },
    });

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    const updatedTask = await prisma.task.update({
      where: {
        id: task.id,
      },
      data: {
        title,
        description,
        priority,
        dueDate: dueDate ? new Date(dueDate) : null,
        completed,
      },
    });

    res.json({
      message: "Task updated successfully",
      task: updatedTask,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to update task",
    });
  }
});
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const task = await prisma.task.findFirst({
      where: {
        id: Number(req.params.id),
        userId: req.user.userId,
      },
    });

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    await prisma.task.delete({
      where: {
        id: task.id,
      },
    });

    res.json({
      message: "Task deleted successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to delete task",
    });
  }
});
module.exports = router;
