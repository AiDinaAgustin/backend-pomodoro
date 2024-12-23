-- AlterTable
ALTER TABLE "Pomodoro" ADD COLUMN     "pauseTime" TIMESTAMP(3),
ALTER COLUMN "status" DROP DEFAULT;
