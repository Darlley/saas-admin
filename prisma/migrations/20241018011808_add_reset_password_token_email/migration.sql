/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `ResetPasswordToken` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ResetPasswordToken_email_key" ON "ResetPasswordToken"("email");
