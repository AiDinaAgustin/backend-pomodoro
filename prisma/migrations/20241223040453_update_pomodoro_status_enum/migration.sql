-- filepath: /d:/bigio/pomodoro-project/prisma/migrations/<timestamp>_update-pomodoro-status-enum/migration.sql

-- Drop the old column
ALTER TABLE "Pomodoro" DROP COLUMN "status";

-- Add the new enum type
CREATE TYPE "PomodoroStatus" AS ENUM ('ACTIVE', 'PAUSE', 'COMPLETED');

-- Add the new column with the enum type
ALTER TABLE "Pomodoro" ADD COLUMN "status" "PomodoroStatus" NOT NULL DEFAULT 'ACTIVE';