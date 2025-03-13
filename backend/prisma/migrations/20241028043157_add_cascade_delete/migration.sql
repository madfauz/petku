-- DropForeignKey
ALTER TABLE `jadwal_temu` DROP FOREIGN KEY `jadwal_temu_id_dokter_fkey`;

-- DropForeignKey
ALTER TABLE `jadwal_temu` DROP FOREIGN KEY `jadwal_temu_id_hewan_fkey`;

-- DropForeignKey
ALTER TABLE `jadwal_temu` DROP FOREIGN KEY `jadwal_temu_id_metode_pembayaran_fkey`;

-- DropForeignKey
ALTER TABLE `jadwal_temu` DROP FOREIGN KEY `jadwal_temu_id_pelanggan_fkey`;

-- DropForeignKey
ALTER TABLE `jadwal_temu` DROP FOREIGN KEY `jadwal_temu_id_praktek_fkey`;

-- AddForeignKey
ALTER TABLE `jadwal_temu` ADD CONSTRAINT `jadwal_temu_id_praktek_fkey` FOREIGN KEY (`id_praktek`) REFERENCES `praktek`(`id_praktek`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `jadwal_temu` ADD CONSTRAINT `jadwal_temu_id_hewan_fkey` FOREIGN KEY (`id_hewan`) REFERENCES `hewan`(`id_hewan`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `jadwal_temu` ADD CONSTRAINT `jadwal_temu_id_dokter_fkey` FOREIGN KEY (`id_dokter`) REFERENCES `dokter`(`id_dokter`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `jadwal_temu` ADD CONSTRAINT `jadwal_temu_id_pelanggan_fkey` FOREIGN KEY (`id_pelanggan`) REFERENCES `pelanggan`(`id_pelanggan`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `jadwal_temu` ADD CONSTRAINT `jadwal_temu_id_metode_pembayaran_fkey` FOREIGN KEY (`id_metode_pembayaran`) REFERENCES `metode_pembayaran`(`id_metode_pembayaran`) ON DELETE CASCADE ON UPDATE CASCADE;
