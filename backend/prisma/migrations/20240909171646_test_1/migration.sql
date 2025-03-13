-- CreateTable
CREATE TABLE `user` (
    `id_user` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `username` VARCHAR(255) NOT NULL,
    `token` VARCHAR(255) NULL,
    `role` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `user_email_key`(`email`),
    PRIMARY KEY (`id_user`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `hewan` (
    `id_hewan` VARCHAR(255) NOT NULL,
    `id_pemilik` VARCHAR(255) NOT NULL,
    `nama` VARCHAR(255) NOT NULL,
    `jenis_hewan` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id_hewan`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `praktek` (
    `id_praktek` VARCHAR(255) NOT NULL,
    `id_dokter` VARCHAR(255) NOT NULL,
    `harga` INTEGER NOT NULL,
    `harga_promo` INTEGER NULL,
    `spesialis` VARCHAR(255) NOT NULL,
    `jadwal_waktu` VARCHAR(255) NOT NULL,
    `pelanggan_dilayani` INTEGER NULL DEFAULT 0,
    `promo` BOOLEAN NOT NULL DEFAULT false,
    `rating` INTEGER NULL DEFAULT 0,

    PRIMARY KEY (`id_praktek`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `metode_pembayaran` (
    `id_metode_pembayaran` VARCHAR(255) NOT NULL,
    `nama` VARCHAR(255) NOT NULL,
    `pajak` INTEGER NOT NULL,

    PRIMARY KEY (`id_metode_pembayaran`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `jadwal_temu` (
    `id_temu` VARCHAR(255) NOT NULL,
    `id_praktek` VARCHAR(255) NOT NULL,
    `id_hewan` VARCHAR(255) NOT NULL,
    `id_dokter` VARCHAR(255) NOT NULL,
    `id_pelanggan` VARCHAR(255) NOT NULL,
    `id_metode_pembayaran` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id_temu`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pelanggan` (
    `id_pelanggan` VARCHAR(255) NOT NULL,
    `kontak` VARCHAR(255) NOT NULL,
    `alamat` VARCHAR(255) NULL,
    `url_photo` VARCHAR(255) NULL DEFAULT 'https://static.vecteezy.com/system/resources/thumbnails/008/442/086/small_2x/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg',

    UNIQUE INDEX `pelanggan_id_pelanggan_key`(`id_pelanggan`),
    PRIMARY KEY (`id_pelanggan`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `dokter` (
    `id_dokter` VARCHAR(255) NOT NULL,
    `kontak` VARCHAR(255) NOT NULL,
    `pengalaman` INTEGER NOT NULL,
    `alamat` VARCHAR(255) NOT NULL,
    `nama_klinik` VARCHAR(255) NOT NULL,
    `url_photo` VARCHAR(191) NULL DEFAULT 'https://png.pngtree.com/png-vector/20190507/ourmid/pngtree-vector-doctor-icon-png-image_1024938.jpg',

    UNIQUE INDEX `dokter_id_dokter_key`(`id_dokter`),
    PRIMARY KEY (`id_dokter`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Rekam_medis` (
    `id_temu` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `Rekam_medis_id_temu_key`(`id_temu`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `hewan` ADD CONSTRAINT `hewan_id_pemilik_fkey` FOREIGN KEY (`id_pemilik`) REFERENCES `pelanggan`(`id_pelanggan`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `praktek` ADD CONSTRAINT `praktek_id_dokter_fkey` FOREIGN KEY (`id_dokter`) REFERENCES `dokter`(`id_dokter`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `jadwal_temu` ADD CONSTRAINT `jadwal_temu_id_praktek_fkey` FOREIGN KEY (`id_praktek`) REFERENCES `praktek`(`id_praktek`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `jadwal_temu` ADD CONSTRAINT `jadwal_temu_id_hewan_fkey` FOREIGN KEY (`id_hewan`) REFERENCES `hewan`(`id_hewan`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `jadwal_temu` ADD CONSTRAINT `jadwal_temu_id_dokter_fkey` FOREIGN KEY (`id_dokter`) REFERENCES `dokter`(`id_dokter`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `jadwal_temu` ADD CONSTRAINT `jadwal_temu_id_pelanggan_fkey` FOREIGN KEY (`id_pelanggan`) REFERENCES `pelanggan`(`id_pelanggan`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `jadwal_temu` ADD CONSTRAINT `jadwal_temu_id_metode_pembayaran_fkey` FOREIGN KEY (`id_metode_pembayaran`) REFERENCES `metode_pembayaran`(`id_metode_pembayaran`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pelanggan` ADD CONSTRAINT `pelanggan_id_pelanggan_fkey` FOREIGN KEY (`id_pelanggan`) REFERENCES `user`(`id_user`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `dokter` ADD CONSTRAINT `dokter_id_dokter_fkey` FOREIGN KEY (`id_dokter`) REFERENCES `user`(`id_user`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Rekam_medis` ADD CONSTRAINT `Rekam_medis_id_temu_fkey` FOREIGN KEY (`id_temu`) REFERENCES `jadwal_temu`(`id_temu`) ON DELETE RESTRICT ON UPDATE CASCADE;
