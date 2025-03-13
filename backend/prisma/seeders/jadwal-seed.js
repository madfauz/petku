import { PrismaClient } from "@prisma/client";
import { v4 as uuid } from "uuid";

const prisma = new PrismaClient();

// Fungsi untuk parsing waktu dari jadwal
const parseStartEndTime = (jadwal) => {
  try {
    const { date, time } = JSON.parse(jadwal); // Parse JSON string
    const [startTime, endTime] = time.split(" - "); // Ambil waktu mulai dan akhir
    const [startHour, startMinute] = startTime.split("."); // Pisahkan jam dan menit untuk waktu mulai
    const [endHour, endMinute] = endTime.split("."); // Pisahkan jam dan menit untuk waktu akhir

    return {
      startDateTime: new Date(`${date} ${startHour}:${startMinute}:00`),
      endDateTime: new Date(`${date} ${endHour}:${endMinute}:00`),
    };
  } catch (error) {
    console.error("Error parsing waktu_dipilih_pelanggan:", error);
    return null; // Jika parsing gagal, kembalikan null
  }
};

// Fungsi untuk menentukan status berdasarkan waktu
const determineStatus = (startDateTime, endDateTime, currentDateTime) => {
  if (currentDateTime < startDateTime) {
    return "Menunggu";
  } else if (currentDateTime >= startDateTime && currentDateTime <= endDateTime) {
    return "Berlangsung";
  } else if (currentDateTime > endDateTime) {
    return "Selesai";
  } else {
    return "Waktu tidak valid";
  }
};

export default async function jadwal() {
  try {
    // Ambil semua pelanggan
    const pelanggans = await prisma.pelanggan.findMany();

    // Ambil semua dokter dan prakteknya
    const prakteks = await prisma.praktek.findMany({
      include: {
        dokter: true, // Dokter terkait
      },
    });

    // Ambil semua hewan
    const hewanList = await prisma.hewan.findMany({
      include: {
        pelanggan: true, // Pelanggan terkait
      },
    });

    // Ambil semua metode pembayaran
    const metode = await prisma.metode_pembayaran.findMany();

    if (
      pelanggans.length === 0 ||
      prakteks.length === 0 ||
      hewanList.length === 0 ||
      metode.length === 0
    ) {
      console.log("Tidak cukup data untuk membuat jadwal.");
      return;
    }

    const currentDateTime = new Date(); // Waktu sekarang

    // Iterasi untuk setiap praktek
    for (const praktek of prakteks) {
      // Pastikan spesialisasi di-parse sebagai array jika dalam bentuk JSON string
      const spesialisasiList = Array.isArray(praktek.spesialis)
        ? praktek.spesialis
        : JSON.parse(praktek.spesialis);

      // Cek apakah jenis hewan dari hewan yang dimiliki pelanggan sesuai dengan spesialisasi dokter
      const hewanCocok = hewanList.filter((hewan) =>
        spesialisasiList.some((spesialis) => spesialis.toLowerCase() === hewan.jenis_hewan.toLowerCase())
      );

      if (hewanCocok.length === 0) {
        console.log(`Tidak ada hewan yang cocok untuk spesialis ${spesialisasiList}`);
        continue; // Lewati jika tidak ada hewan yang cocok
      }

      const hewan = hewanCocok[0]; // Pilih satu hewan yang sesuai
      const pelanggan = pelanggans.find(
        (p) => p.id_pelanggan === hewan.id_pemilik
      );

      if (!pelanggan) {
        console.log(`Tidak ada pelanggan untuk hewan ${hewan.nama}`);
        continue;
      }

      const waktuDipilih = JSON.stringify({
        date: "Selasa, 19 November 2024",
        time: "13.40 - 19.00",
      });

      const parsedTime = parseStartEndTime(waktuDipilih);

      if (!parsedTime) {
        console.error("Gagal memproses waktu_dipilih_pelanggan.");
        continue;
      }

      const status = determineStatus(
        parsedTime.startDateTime,
        parsedTime.endDateTime,
        currentDateTime
      );

      // Buat jadwal temu
      await prisma.jadwal_temu.create({
        data: {
          id_temu: uuid(),
          id_praktek: praktek.id_praktek,
          id_hewan: hewan.id_hewan,
          id_pelanggan: pelanggan.id_pelanggan,
          id_dokter: praktek.id_dokter,
          id_metode_pembayaran: metode[0].id_metode_pembayaran, // Ambil metode pertama
          total_harga: praktek.harga,
          status,
          waktu_dipilih_pelanggan: waktuDipilih,
        },
      });
    }

    console.log("Jadwal telah berhasil di-seed.");
  } catch (error) {
    console.error("Error saat men-seed jadwal:", error);
  } finally {
    await prisma.$disconnect();
  }
}
