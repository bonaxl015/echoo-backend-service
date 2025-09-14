-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "resetToken" VARCHAR(255),
ADD COLUMN     "resetTokenExpiry" TIMESTAMP(3);
