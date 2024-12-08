const prisma = require("../db");

const createTask = async (userId, pomodoroId, taskData) => {
    try {
        const task = await prisma.task.create({
            data: {
                userId: userId,
                pomodoroId: pomodoroId,
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

module.exports = {
    createTask,
    getTasksByUserId
}