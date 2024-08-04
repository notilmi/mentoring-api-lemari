-- CreateEnum
CREATE TYPE "TipePakaian" AS ENUM ('FORMAL', 'NONFORMAL');

-- CreateTable
CREATE TABLE "Pakaian" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "TipePakaian" NOT NULL,
    "jumlah" INTEGER NOT NULL,
    "warna" TEXT NOT NULL,

    CONSTRAINT "Pakaian_pkey" PRIMARY KEY ("id")
);
