/*
  Warnings:

  - You are about to drop the column `pomodoroId` on the `Task` table. All the data in the column will be lost.
  - Added the required column `taskId` to the `Pomodoro` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_pomodoroId_fkey";

-- AlterTable
ALTER TABLE "Pomodoro" ADD COLUMN     "taskId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Task" DROP COLUMN "pomodoroId";

-- AddForeignKey
ALTER TABLE "Pomodoro" ADD CONSTRAINT "Pomodoro_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
