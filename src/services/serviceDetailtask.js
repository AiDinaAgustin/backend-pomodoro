const prisma = require("../db");

const createDetailTask = async (taskId, detailTaskData) => {
    try {
        const detailTask = await prisma.detailTask.create({
            data: {
                taskId: taskId,
                title: detailTaskData.title,
                completed: detailTaskData.completed || false,
            },
        });
        return detailTask;
    } catch (error) {
        throw new Error(error.message);
    }
}

const getDetailTasksByTaskId = async (taskId) => {
    try {
        const detailTasks = await prisma.detailTask.findMany({
            where: { taskId: taskId },
        });
        return detailTasks;
    } catch (error) {
        throw new Error(error.message);
    }
}

const updateDetailTask = async (detailTaskId, detailTaskData) => {
    try {
        const updatedDetailTask = await prisma.detailTask.update({
            where: { id: detailTaskId },
            data: detailTaskData,
        });
        return updatedDetailTask;
    } catch (error) {
        throw new Error(error.message);
    }
}

const deleteDetailTask = async (detailTaskId) => {
    try {
        const deletedDetailTask = await prisma.detailTask.delete({
            where: { id: detailTaskId },
        });
        return deletedDetailTask;
    } catch (error) {
        throw new Error(error.message);
    }
}

module.exports = {
    createDetailTask,
    getDetailTasksByTaskId,
    updateDetailTask,
    deleteDetailTask
}