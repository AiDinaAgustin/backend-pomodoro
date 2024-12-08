const { 
    createDetailTask, 
    getDetailTasksByTaskId, 
    updateDetailTask, 
    deleteDetailTask 
} = require("../../services/serviceDetailtask");

const handleCreateDetailTask = async (req, res) => {
    try {
        const { taskId } = req.params;
        const detailTaskData = req.body;

        const newDetailTask = await createDetailTask(parseInt(taskId), detailTaskData);
        
        res.status(201).json({ data: newDetailTask });
        return;
    } catch (error) {
        res.status(500).json({ message: error.message });
        return;
    }
}

const handleGetDetailTasksByTaskId = async (req, res) => {
    try {
        const { taskId } = req.params;
        const detailTasks = await getDetailTasksByTaskId(parseInt(taskId));
        res.status(200).json({ data: detailTasks });
        return;
    } catch (error) {
        res.status(500).json({ message: error.message });
        return;
    }
}

const handleUpdateDetailTask = async (req, res) => {
    try {
        const { detailTaskId } = req.params;
        const detailTaskData = req.body;

        const updatedDetailTask = await updateDetailTask(parseInt(detailTaskId), detailTaskData);
        
        res.status(200).json({ data: updatedDetailTask });
        return;
    } catch (error) {
        res.status(500).json({ message: error.message });
        return;
    }
}

const handleDeleteDetailTask = async (req, res) => {
    try {
        const { detailTaskId } = req.params;

        await deleteDetailTask(parseInt(detailTaskId));
        
        res.status(200).json({ message: "DetailTask deleted successfully" });
        return;
    } catch (error) {
        res.status(500).json({ message: error.message });
        return;
    }
}

module.exports = {
    handleCreateDetailTask,
    handleGetDetailTasksByTaskId,
    handleUpdateDetailTask,
    handleDeleteDetailTask
}