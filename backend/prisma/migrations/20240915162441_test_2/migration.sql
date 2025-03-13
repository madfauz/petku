/*
  Warnings:

  - You are about to drop the column `rating` on the `praktek` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `dokter` MODIFY `kontak` VARCHAR(255) NULL,
    MODIFY `pengalaman` INTEGER NULL,
    MODIFY `alamat` VARCHAR(255) NULL,
    MODIFY `nama_klinik` VARCHAR(255) NULL;

-- AlterTable
ALTER TABLE `pelanggan` MODIFY `kontak` VARCHAR(255) NULL;

-- AlterTable
ALTER TABLE `praktek` DROP COLUMN `rating`;

-- AlterTable
ALTER TABLE `rekam_medis` ADD COLUMN `komentar` VARCHAR(255) NULL,
    ADD COLUMN `rating` INTEGER NULL;
