/*
  Warnings:

  - Changed the type of `type` on the `Pomodoro` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "PomodoroType" AS ENUM ('POMODORO', 'SHORT_BREAK', 'LONG_BREAK');

-- AlterTable
ALTER TABLE "Pomodoro" DROP COLUMN "type",
ADD COLUMN     "type" "PomodoroType" NOT NULL;
