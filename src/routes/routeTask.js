const express = require("express");
const router = express.Router();
const { auth } = require("../middlewares/auth/auth");

const { handleCreateTask, handleUpdateTask, handleGetTasksByUserId, handleUpdateTaskCompletion, handleDeleteTask } = require("../controllers/task/task");

router.post("/tasks", auth, handleCreateTask);
router.put("/tasks/:taskId", auth, handleUpdateTask);
router.get("/tasks", auth, handleGetTasksByUserId);
router.put("/tasks/:taskId/completion", auth, handleUpdateTaskCompletion);
router.delete("/tasks/:taskId", auth, handleDeleteTask);



module.exports = router;