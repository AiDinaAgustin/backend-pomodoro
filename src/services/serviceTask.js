const prisma = require("../db");

const createTask = async (userId, taskData) => {
    try {
        const task = await prisma.task.create({
            data: {
                userId: userId,
                title: taskData.title,
                description: taskData.description,
                completed: taskData.completed || false,
            },
        });
        return task;
    } catch (error) {
        throw new Error(error.message);
    }
}

const updateTask = async (taskId, taskData) => {
    try {
        const updatedTask = await prisma.task.update({
            where: { id: taskId },
            data: {
                title: taskData.title,
                description: taskData.description,
                completed: taskData.completed,
            },
        });
        return updatedTask;
    } catch (error) {
        throw new Error(error.message);
    }
}

const getTasksByUserId = async (userId) => {
    try {
        const tasks = await prisma.task.findMany({
            where: { userId: userId },
        });
        return tasks;
    } catch (error) {
        throw new Error(error.message);
    }
}

const updateTaskCompletion = async (taskId) => {
    try {
        const detailTasks = await prisma.detailTask.findMany({
            where: { taskId: taskId },
        });

        const allCompleted = detailTasks.every(detailTask => detailTask.completed);

        const updatedTask = await prisma.task.update({
            where: { id: taskId },
            data: { completed: allCompleted },
        });

        return updatedTask;
    } catch (error) {
        throw new Error(error.message);
    }
}

module.exports = {
    createTask,
    updateTask,
    getTasksByUserId,
    updateTaskCompletion
}