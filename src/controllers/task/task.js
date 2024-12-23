const { createTask, updateTask, getTasksByUserId, updateTaskCompletion } = require("../../services/serviceTask");

const handleCreateTask = async (req, res) => {
    try {
        const userId = req.user.userToken;
        const taskData = req.body;

        const newTask = await createTask(userId, taskData);
        
        res.status(201).json({ data: newTask });
        return;
    } catch (error) {
        res.status(500).json({ message: error.message });
        return;
    }
}

const handleUpdateTask = async (req, res) => {
    try {
        const { taskId } = req.params;
        const taskData = req.body;

        const updatedTask = await updateTask(parseInt(taskId), taskData);
        
        res.status(200).json({ data: updatedTask });
        return;
    } catch (error) {
        res.status(500).json({ message: error.message });
        return;
    }
}

const handleGetTasksByUserId = async (req, res) => {
    try {
        const userId = req.user.userToken;
        const tasks = await getTasksByUserId(userId);
        res.status(200).json({ data: tasks });
        return;
    } catch (error) {
        res.status(500).json({ message: error.message });
        return;
    }
}

const handleUpdateTaskCompletion = async (req, res) => {
    try {
        const { taskId } = req.params;

        const updatedTask = await updateTaskCompletion(parseInt(taskId));
        
        res.status(200).json({ data: updatedTask });
        return;
    } catch (error) {
        res.status(500).json({ message: error.message });
        return;
    }
}

module.exports = {
    handleCreateTask,
    handleUpdateTask,
    handleGetTasksByUserId,
    handleUpdateTaskCompletion
}