const prisma = require("../db");

const createPomodoro = async (userId, pomodoroData) => {
    try {
        const pomodoro = await prisma.pomodoro.create({
            data: {
                type: pomodoroData.type,
                duration: pomodoroData.duration,
                status: pomodoroData.status,
                startTime: pomodoroData.startTime,
                endTime: pomodoroData.endTime,
                user: {
                    connect: { id: userId }
                },
                tasks: {
                    connect: pomodoroData.taskIds.map(taskId => ({ id: taskId }))
                }
            },
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
        });
        return pomodoro;
    } catch (error) {
        throw new Error(error.message);
    }
}

const updatePomodoroStatus = async (pomodoroId, status) => {
    try {
        const updatedPomodoro = await prisma.pomodoro.update({
            where: { id: pomodoroId },
            data: { status: status },
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

module.exports = {
    createPomodoro,
    getPomodoroById,
    updatePomodoroStatus,
    getPomodorosByUserId,
    deletePomodoro
}