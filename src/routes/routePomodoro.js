const express = require("express");
const router = express.Router();
const { auth } = require("../middlewares/auth/auth");

const {
    handleCreatePomodoro,
    handleUpdatePomodoroStatus
} = require("../controllers/pomodoro/pomodoro");

router.post("/pomodoros", auth, handleCreatePomodoro);
router.put("/pomodoros/:pomodoroId", auth, handleUpdatePomodoroStatus);

module.exports = router;