import { PrismaClient } from '@prisma/client';
import { v4 as uuid } from 'uuid';

const prisma = new PrismaClient();

// export default async function rekam() {
//   try {
//     const id_temu = await prisma.jadwal_temu.findMany();

//     // Pastikan ada data di jadwal_temu
//     if (!id_temu || id_temu.length === 0) {
//       console.log("Tidak ada data di jadwal_temu.");
//       return;
//     }

//     const minLength = id_temu.length;

//     for (let i = 0; i < minLength; i++) {
//       // Ambil waktu saat ini
//       const currentDateTime = new Date();

//       // Konversi ke WIB (UTC+7)
//       const wibOffset = 7 * 60 * 60 * 1000; // 7 jam dalam milidetik
//       const wibDate = new Date(currentDateTime.getTime() + wibOffset);

//       // Format waktu sebagai string (YYYY-MM-DD HH:mm:ss)
//       const tanggalKomentar = wibDate.toISOString().replace("T", " ").split(".")[0];

//       // Buat rekam medis baru
//       await prisma.rekam_medis.create({
//         data: {
//           id_temu: id_temu[i].id_temu,
//           komentar: "pelayanannya terbaik",
//           rating: 5,
//           tanggal_komentar: tanggalKomentar, // Tambahkan tanggal_komentar dalam WIB
//           catatan_pasien: "sakit mau mati", 
//         },
//       });
//     }

//     console.log("Rekam medis seeded with tanggal_komentar in WIB");
//   } catch (error) {
//     console.error("Error seeding rekam medis:", error.message);
//   } finally {
//     await prisma.$disconnect();
//   }
// }

// rekam()
//   .catch((e) => {
//     console.error(e);
//     process.exit(1);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });


export default async function rekam() {
  try {
    const id_temu = await prisma.jadwal_temu.findMany();

    // Pastikan ada data di jadwal_temu
    if (!id_temu || id_temu.length === 0) {
      console.log("Tidak ada data di jadwal_temu.");
      return;
    }

    // Data manual untuk variasi rating, komentar, dan catatan_pasien
    const dataVariasi = [
      { komentar: "Pelayanan sangat ramah", rating: 5, catatan_pasien: "Sehat kembali setelah pengobatan." },
      { komentar: "Dokter cukup membantu", rating: 4, catatan_pasien: "Sedikit demam, tetapi membaik." },
      { komentar: "Proses cukup lama", rating: 3, catatan_pasien: "Memerlukan perawatan lebih lanjut." },
      { komentar: "Hewan sangat ditangani dengan baik", rating: 5, catatan_pasien: "Berhasil pulih sepenuhnya." },
      { komentar: "Dokter terlalu sibuk", rating: 2, catatan_pasien: "Masih memerlukan konsultasi ulang." },
      { komentar: "Fasilitas sangat memadai", rating: 5, catatan_pasien: "Sangat puas dengan pelayanan." },
      { komentar: "Perlu lebih banyak dokter", rating: 3, catatan_pasien: "Kondisi stabil, namun perlu observasi." },
    ];

    for (let i = 0; i < id_temu.length; i++) {
      // Ambil waktu saat ini
      const currentDateTime = new Date();

      // Konversi ke WIB (UTC+7)
      const wibOffset = 7 * 60 * 60 * 1000; // 7 jam dalam milidetik
      const wibDate = new Date(currentDateTime.getTime() + wibOffset);

      // Format waktu sebagai string (YYYY-MM-DD HH:mm:ss)
      const tanggalKomentar = wibDate.toISOString().replace("T", " ").split(".")[0];

      // Ambil data variasi secara siklikal
      const data = dataVariasi[i % dataVariasi.length];

      // Buat rekam medis baru
      await prisma.rekam_medis.create({
        data: {
          id_temu: id_temu[i].id_temu,
          komentar: data.komentar,
          rating: data.rating,
          tanggal_komentar: tanggalKomentar, // Tambahkan tanggal_komentar dalam WIB
          catatan_pasien: data.catatan_pasien,
        },
      });

      console.log(`Rekam medis dibuat untuk id_temu: ${id_temu[i].id_temu}`);
    }

    console.log("Rekam medis seeded with manual data and tanggal_komentar in WIB");
  } catch (error) {
    console.error("Error seeding rekam medis:", error.message);
  } finally {
    await prisma.$disconnect();
  }
}

rekam()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
