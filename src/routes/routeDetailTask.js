const express = require("express");
const router = express.Router();
const { auth } = require("../middlewares/auth/auth");

const { 
    handleCreateDetailTask, 
    handleGetDetailTasksByTaskId, 
    handleUpdateDetailTask, 
    handleDeleteDetailTask 
} = require("../controllers/detail-task/detailTask");

router.post("/detailTasks/:taskId", auth, handleCreateDetailTask);
router.get("/detailTasks/:taskId", auth, handleGetDetailTasksByTaskId);
router.put("/detailTasks/:detailTaskId", auth, handleUpdateDetailTask);
router.delete("/detailTasks/:detailTaskId", auth, handleDeleteDetailTask);

module.exports = router;