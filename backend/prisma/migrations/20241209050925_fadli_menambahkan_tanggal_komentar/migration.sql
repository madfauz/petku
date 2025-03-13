/*
  Warnings:

  - You are about to alter the column `tanggal_komentar` on the `rekam_medis` table. The data in that column could be lost. The data in that column will be cast from `VarChar(225)` to `DateTime`.

*/
-- AlterTable
ALTER TABLE `rekam_medis` MODIFY `tanggal_komentar` DATETIME NOT NULL;
