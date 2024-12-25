// filepath: /D:/bigio/pomodoro-project/src/services/servicePomodoro.js
const prisma = require("../db");

const createPomodoro = async (userId, pomodoroData) => {
    try {
        const data = {
            type: pomodoroData.type,
            duration: pomodoroData.duration,
            status: pomodoroData.status,
            startTime: pomodoroData.startTime,
            endTime: pomodoroData.endTime,
            user: {
                connect: { id: userId }
            }
        };

        if (pomodoroData.taskIds && pomodoroData.taskIds.length > 0) {
            data.tasks = {
                connect: pomodoroData.taskIds.map(taskId => ({ id: taskId }))
            };
        }

        const pomodoro = await prisma.pomodoro.create({
            data: data,
        });
        return pomodoro;
    } catch (error) {
        throw new Error(error.message);
    }
}

const getPomodoroById = async (pomodoroId) => {
    try {
        const pomodoro = await prisma.pomodoro.findUnique({
            where: { id: pomodoroId },
            include: { tasks: true }, // Pastikan tasks dimuat
        });
        return pomodoro;
    } catch (error) {
        throw new Error(error.message);
    }
}

const updatePomodoroStatus = async (pomodoroId, status) => {
    try {
        const pomodoro = await getPomodoroById(pomodoroId);
        if (!pomodoro) {
            throw new Error("Pomodoro not found");
        }

        let updatedData = { status: status };

        if (status === 'PAUSE') {
            updatedData.pauseTime = new Date();
        } else if (status === 'ACTIVE' && pomodoro.pauseTime) {
            const pauseDuration = new Date() - new Date(pomodoro.pauseTime);
            updatedData.endTime = new Date(new Date(pomodoro.endTime).getTime() + pauseDuration);
            updatedData.pauseTime = null;
        }

        const updatedPomodoro = await prisma.pomodoro.update({
            where: { id: pomodoroId },
            data: updatedData,
        });
        return updatedPomodoro;
    } catch (error) {
        throw new Error(error.message);
    }
}

const getPomodorosByUserId = async (userId) => {
    try {
        const pomodoros = await prisma.pomodoro.findMany({
            where: { userId: userId },
            include: {
                tasks: true
            }
        });
        return pomodoros;
    } catch (error) {
        throw new Error(error.message);
    }
}

const deletePomodoro = async (pomodoroId) => {
    try {
        const deletedPomodoro = await prisma.pomodoro.delete({
            where: { id: pomodoroId },
        });
        return deletedPomodoro;
    } catch (error) {
        throw new Error(error.message);
    }
}

const updatePomodoroStatusBasedOnTasks = async (pomodoroId) => {
    try {
        const pomodoro = await getPomodoroById(pomodoroId);
        if (!pomodoro) {
            throw new Error("Pomodoro not found");
        }

        if (!pomodoro.tasks || pomodoro.tasks.length === 0) {
            throw new Error("No tasks associated with this Pomodoro");
        }

        // Fetch tasks to check their completion status
        const tasks = await prisma.task.findMany({
            where: { id: { in: pomodoro.tasks.map(task => task.id) } }
        });

        const allTasksCompleted = tasks.every(task => task.completed);

        if (allTasksCompleted) {
            const updatedPomodoro = await prisma.pomodoro.update({
                where: { id: pomodoroId },
                data: { status: 'COMPLETED' },
            });
            return updatedPomodoro;
        }

        return pomodoro;
    } catch (error) {
        throw new Error(error.message);
    }
};


module.exports = {
    createPomodoro,
    getPomodoroById,
    updatePomodoroStatus,
    getPomodorosByUserId,
    deletePomodoro,
    updatePomodoroStatusBasedOnTasks
}