/*
  Warnings:

  - Added the required column `tanggal_komentar` to the `Rekam_medis` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `rekam_medis` ADD COLUMN `tanggal_komentar` VARCHAR(225) NOT NULL;
