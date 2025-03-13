-- DropForeignKey
ALTER TABLE `dokter` DROP FOREIGN KEY `dokter_id_dokter_fkey`;

-- DropForeignKey
ALTER TABLE `hewan` DROP FOREIGN KEY `hewan_id_pemilik_fkey`;

-- DropForeignKey
ALTER TABLE `pelanggan` DROP FOREIGN KEY `pelanggan_id_pelanggan_fkey`;

-- DropForeignKey
ALTER TABLE `praktek` DROP FOREIGN KEY `praktek_id_dokter_fkey`;

-- DropForeignKey
ALTER TABLE `rekam_medis` DROP FOREIGN KEY `Rekam_medis_id_temu_fkey`;

-- AddForeignKey
ALTER TABLE `hewan` ADD CONSTRAINT `hewan_id_pemilik_fkey` FOREIGN KEY (`id_pemilik`) REFERENCES `pelanggan`(`id_pelanggan`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `praktek` ADD CONSTRAINT `praktek_id_dokter_fkey` FOREIGN KEY (`id_dokter`) REFERENCES `dokter`(`id_dokter`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pelanggan` ADD CONSTRAINT `pelanggan_id_pelanggan_fkey` FOREIGN KEY (`id_pelanggan`) REFERENCES `user`(`id_user`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `dokter` ADD CONSTRAINT `dokter_id_dokter_fkey` FOREIGN KEY (`id_dokter`) REFERENCES `user`(`id_user`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Rekam_medis` ADD CONSTRAINT `Rekam_medis_id_temu_fkey` FOREIGN KEY (`id_temu`) REFERENCES `jadwal_temu`(`id_temu`) ON DELETE CASCADE ON UPDATE CASCADE;
