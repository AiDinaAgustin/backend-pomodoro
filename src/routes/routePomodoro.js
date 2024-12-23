const express = require("express");
const router = express.Router();
const { auth } = require("../middlewares/auth/auth");

const {
    handleCreatePomodoro,
    handleUpdatePomodoroStatus,
    handleGetPomodorosByUserId,
    handleDeletePomodoro,
    handleUpdatePomodoroStatusBasedOnTasks
} = require("../controllers/pomodoro/pomodoro");

router.get("/pomodoros", auth, handleGetPomodorosByUserId);
router.post("/pomodoros", auth, handleCreatePomodoro);
router.put("/pomodoros/:pomodoroId", auth, handleUpdatePomodoroStatus);
router.delete("/pomodoros/:pomodoroId", auth, handleDeletePomodoro);
router.put("/pomodoros/:pomodoroId/completion", auth, handleUpdatePomodoroStatusBasedOnTasks);

module.exports = router;