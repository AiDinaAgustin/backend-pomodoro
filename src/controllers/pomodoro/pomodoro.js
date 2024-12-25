const { 
    createPomodoro,
    getPomodoroById,
    updatePomodoroStatus,
    getPomodorosByUserId,
    deletePomodoro,
    updatePomodoroStatusBasedOnTasks
} = require("../../services/servicePomodoro");


const handleCreatePomodoro = async (req, res) => {
    try {
        const userId = req.user.userToken;
        const pomodoro = req.body;

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

        if (!['ACTIVE', 'PAUSE', 'COMPLETED'].includes(pomodoro.status)) {
            return res.status(400).json({ message: "Invalid pomodoro status" });
        }

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

        const newStatus = pomodoro.status === 'ACTIVE' ? 'PAUSE' : 'ACTIVE';

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


const handleUpdatePomodoroStatusBasedOnTasks = async (req, res) => {
    try {
        const { pomodoroId } = req.params;

        const updatedPomodoro = await updatePomodoroStatusBasedOnTasks(parseInt(pomodoroId));
        
        res.status(200).json({ data: updatedPomodoro });
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
    handleDeletePomodoro,
    handleUpdatePomodoroStatusBasedOnTasks
}