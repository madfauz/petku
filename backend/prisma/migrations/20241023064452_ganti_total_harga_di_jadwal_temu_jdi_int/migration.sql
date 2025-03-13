/*
  Warnings:

  - You are about to alter the column `total_harga` on the `jadwal_temu` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `Int`.

*/
-- AlterTable
ALTER TABLE `jadwal_temu` MODIFY `total_harga` INTEGER NULL;
