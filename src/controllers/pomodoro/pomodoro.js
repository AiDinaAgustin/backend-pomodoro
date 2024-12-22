const { 
    createPomodoro,
    getPomodoroById,
    updatePomodoroStatus,
    getPomodorosByUserId,
    deletePomodoro
} = require("../../services/servicePomodoro");

const handleCreatePomodoro = async (req, res) => {
    try {
        const userId = req.user.userToken;
        const pomodoro = req.body;

        if (!pomodoro.taskIds || !Array.isArray(pomodoro.taskIds) || pomodoro.taskIds.length === 0) {
            return res.status(400).json({ message: "Task IDs are required and should be an array" });
        }

        switch (pomodoro.type) {
            case 'POMODORO':
                pomodoro.duration = 25;
                break;
            case 'SHORT_BREAK':
                pomodoro.duration = 5;
                break;
            case 'LONG_BREAK':
                pomodoro.duration = 15;
                break;
            default:
                return res.status(400).json({ message: "Invalid pomodoro type" });
        }

        const startTime = new Date();
        const endTime = new Date(startTime.getTime() + pomodoro.duration * 60000);
        pomodoro.startTime = startTime;
        pomodoro.endTime = endTime;

        const newPomodoro = await createPomodoro(userId, pomodoro);
        
        res.status(201).json({ data: newPomodoro });
        return;
    } catch (error) {
        res.status(500).json({ message: error.message });
        return;
    }
}

const handleUpdatePomodoroStatus = async (req, res) => {
    try {
        const { pomodoroId } = req.params;

        const pomodoro = await getPomodoroById(parseInt(pomodoroId));
        if (!pomodoro) {
            return res.status(404).json({ message: "Pomodoro not found" });
        }

        const newStatus = pomodoro.status === 'active' ? 'pause' : 'active';

        const updatedPomodoro = await updatePomodoroStatus(parseInt(pomodoroId), newStatus);

        res.status(200).json({ data: updatedPomodoro });
        return;
    } catch (error) {
        res.status(500).json({ message: error.message });
        return;
    }
}

const handleGetPomodorosByUserId = async (req, res) => {
    try {
        const userId = req.user.userToken;
        const pomodoros = await getPomodorosByUserId(userId);
        res.status(200).json({ data: pomodoros });
        return;
    } catch (error) {
        res.status(500).json({ message: error.message });
        return;
    }
}

const handleDeletePomodoro = async (req, res) => {
    try {
        const { pomodoroId } = req.params;

        const pomodoro = await getPomodoroById(parseInt(pomodoroId));
        if (!pomodoro) {
            return res.status(404).json({ message: "Pomodoro not found" });
        }

        await deletePomodoro(parseInt(pomodoroId));

        res.status(200).json({ message: "Pomodoro deleted successfully" });
        return;
    } catch (error) {
        res.status(500).json({ message: error.message });
        return;
    }
}

module.exports = {
    handleCreatePomodoro,
    handleUpdatePomodoroStatus,
    handleGetPomodorosByUserId,
    handleDeletePomodoro
}