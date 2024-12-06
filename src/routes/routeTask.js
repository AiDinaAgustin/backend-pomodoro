const express = require("express");
const router = express.Router();
const { auth } = require("../middlewares/auth/auth");

const { handleCreateTask, handleGetTasksByUserId } = require("../controllers/task/task");

router.post("/tasks", auth, handleCreateTask);
router.get("/tasks", auth, handleGetTasksByUserId);

module.exports = router;