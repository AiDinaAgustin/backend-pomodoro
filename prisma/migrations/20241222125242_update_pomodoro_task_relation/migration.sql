/*
  Warnings:

  - You are about to drop the column `taskId` on the `Pomodoro` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Pomodoro" DROP CONSTRAINT "Pomodoro_taskId_fkey";

-- AlterTable
ALTER TABLE "Pomodoro" DROP COLUMN "taskId";

-- CreateTable
CREATE TABLE "_PomodoroTasks" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_PomodoroTasks_AB_unique" ON "_PomodoroTasks"("A", "B");

-- CreateIndex
CREATE INDEX "_PomodoroTasks_B_index" ON "_PomodoroTasks"("B");

-- AddForeignKey
ALTER TABLE "_PomodoroTasks" ADD CONSTRAINT "_PomodoroTasks_A_fkey" FOREIGN KEY ("A") REFERENCES "Pomodoro"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PomodoroTasks" ADD CONSTRAINT "_PomodoroTasks_B_fkey" FOREIGN KEY ("B") REFERENCES "Task"("id") ON DELETE CASCADE ON UPDATE CASCADE;
