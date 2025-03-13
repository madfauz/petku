import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";
import { v4 as uuid } from "uuid";
import { validate } from "../validation/validation.js";
import { jadwalValidation } from "../validation/jadwal-validation.js";
import cron from "node-cron";

const updateJadwalStatus = async () => {
  const parseStartEndTime2 = (jadwal) => {
    try {
      const { date, time } = JSON.parse(jadwal);
      if (!date || !time) throw new Error("Invalid date or time");

      const [startTime, endTime] = time.split(" - ");
      if (!startTime || !endTime) throw new Error("Invalid time range");

      const [startHour, startMinute] = startTime.split(".");
      const [endHour, endMinute] = endTime.split(".");
      if (!startHour || !startMinute || !endHour || !endMinute) {
        throw new Error("Invalid time format");
      }

      const formattedDate = date.replace(/^\w+, /, "").trim();
      const [day, monthName, year] = formattedDate.split(" ");
      const monthMap = {
        januari: "01",
        februari: "02",
        maret: "03",
        april: "04",
        mei: "05",
        juni: "06",
        juli: "07",
        agustus: "08",
        september: "09",
        oktober: "10",
        november: "11",
        desember: "12",
      };

      const month = monthMap[monthName.toLowerCase()];
      if (!month) throw new Error("Invalid month name");

      const formattedDateString = `${year}-${month}-${day}`;
      const dateObject = new Date(formattedDateString);

      if (isNaN(dateObject.getTime())) {
        throw new Error("Invalid date format");
      }

      return {
        startDateTime: new Date(
          dateObject.getFullYear(),
          dateObject.getMonth(),
          dateObject.getDate(),
          parseInt(startHour, 10),
          parseInt(startMinute, 10)
        ),
        endDateTime: new Date(
          dateObject.getFullYear(),
          dateObject.getMonth(),
          dateObject.getDate(),
          parseInt(endHour, 10),
          parseInt(endMinute, 10)
        ),
      };
    } catch (error) {
      console.error("Error parsing waktu_dipilih_pelanggan:", error.message);
      return null;
    }
  };

  const determineStatus2 = (startDateTime, endDateTime, currentDateTime) => {
    if (currentDateTime < startDateTime) {
      return "Menunggu";
    } else if (
      currentDateTime >= startDateTime &&
      currentDateTime <= endDateTime
    ) {
      return "Berlangsung";
    } else if (currentDateTime > endDateTime) {
      return "Selesai";
    }
    return "Waktu tidak valid";
  };

  const currentDateTime = new Date();

  try {
    const jadwalTemu = await prismaClient.jadwal_temu.findMany();

    for (const jadwal of jadwalTemu) {
      if (!jadwal.waktu_dipilih_pelanggan) {
        console.warn(
          `Jadwal temu ID ${jadwal.id_temu} tidak memiliki waktu dipilih pelanggan.`
        );
        continue;
      }

      const timeData = parseStartEndTime2(jadwal.waktu_dipilih_pelanggan);

      if (timeData) {
        const { startDateTime, endDateTime } = timeData;
        const status = determineStatus2(
          startDateTime,
          endDateTime,
          currentDateTime
        );

        // Update status hanya jika berbeda
        if (jadwal.status !== status) {
          await prismaClient.jadwal_temu.update({
            where: { id_temu: jadwal.id_temu },
            data: { status },
          });
          console.log(
            `Status jadwal temu ID ${jadwal.id_temu} diperbarui menjadi: ${status}`
          );
        }

        // Buat rekam medis jika status Berlangsung atau Selesai
        if (status === "Berlangsung" || status === "Selesai") {
          const existingRekamMedis = await prismaClient.rekam_medis.findFirst({
            where: { id_temu: jadwal.id_temu },
          });

          if (!existingRekamMedis) {
            await prismaClient.rekam_medis.create({
              data: {
                id_temu: jadwal.id_temu,
                komentar: null,
                rating: null,
                tanggal_komentar: null, // Tambahkan jika diperlukan
              },
            });
            console.log(
              `Rekam medis dibuat untuk jadwal temu ID: ${jadwal.id_temu}`
            );
          }
        }
      }
    }
    console.log("Jadwal status updated successfully");
  } catch (error) {
    console.error("Error updating jadwal status:", error.message);
  }
};

// Schedule to run every minute
cron.schedule("* * * * *", updateJadwalStatus);

const createJadwalTemu = async (request, authorization) => {
  const parseStartEndTime2 = (jadwal) => {
    try {
      const { date, time } = JSON.parse(jadwal); // Parse JSON string
      if (!date || !time) throw new Error("Invalid date or time");

      const [startTime, endTime] = time.split(" - ");
      if (!startTime || !endTime) throw new Error("Invalid time range");

      // Pisahkan jam dan menit dari waktu
      const [startHour, startMinute] = startTime.split(".");
      const [endHour, endMinute] = endTime.split(".");
      if (!startHour || !startMinute || !endHour || !endMinute) {
        throw new Error("Invalid time format");
      }

      // Format tanggal menjadi format Date (hapus nama hari dan sesuaikan format)
      const formattedDate = date.replace(/^\w+, /, "").trim(); // Hapus nama hari seperti "Senin, "
      const [day, monthName, year] = formattedDate.split(" ");
      const monthMap = {
        januari: "01",
        februari: "02",
        maret: "03",
        april: "04",
        mei: "05",
        juni: "06",
        juli: "07",
        agustus: "08",
        september: "09",
        oktober: "10",
        november: "11",
        desember: "12",
      };

      // Cek bulan
      const month = monthMap[monthName.toLowerCase()];
      if (!month) throw new Error("Invalid month name");

      // Format tanggal menjadi YYYY-MM-DD
      const formattedDateString = `${year}-${month}-${day}`;
      const dateObject = new Date(formattedDateString);

      if (isNaN(dateObject.getTime())) {
        throw new Error("Invalid date format");
      }

      // Gabungkan tanggal dengan waktu
      return {
        startDateTime: new Date(
          dateObject.getFullYear(),
          dateObject.getMonth(),
          dateObject.getDate(),
          parseInt(startHour, 10),
          parseInt(startMinute, 10)
        ),
        endDateTime: new Date(
          dateObject.getFullYear(),
          dateObject.getMonth(),
          dateObject.getDate(),
          parseInt(endHour, 10),
          parseInt(endMinute, 10)
        ),
      };
    } catch (error) {
      console.error("Error parsing waktu_dipilih_pelanggan:", error.message);
      return null; // Jika parsing gagal, kembalikan null
    }
  };

  const determineStatus2 = (startDateTime, endDateTime, currentDateTime) => {
    if (currentDateTime < startDateTime) {
      return "Menunggu";
    } else if (
      currentDateTime >= startDateTime &&
      currentDateTime <= endDateTime
    ) {
      return "Berlangsung";
    } else if (currentDateTime > endDateTime) {
      return "Selesai";
    }
    return "Waktu tidak valid";
  };

  const jadwal = validate(jadwalValidation, request);

  const token = authorization.split(" ")[1];

  const userJadwal = await prismaClient.user.findFirstOrThrow({
    where: { token },
  });

  const jadwalCount = await prismaClient.jadwal_temu.count({
    where: { id_temu: jadwal.id_temu },
  });

  // const hewan = await prismaClient.hewan.findFirst({
  //   where: { id_pemilik: userJadwal.id_user },
  // });

  // Validasi token dan id_pelanggan
  if (!userJadwal) {
    throw new ResponseError(404, "Token tidak valid");
  }

  // if (!hewan) {
  //   throw new ResponseError(401, "Hewan tidak ditemukan");
  // }

  // Temukan pelanggan berdasarkan id_pelanggan
  const hewan2 = await prismaClient.hewan.findUnique({
    where: {
      id_hewan: jadwal.id_hewan,
      id_pemilik: userJadwal.id_user,
    },
    include: {
      pelanggan: true,
    },
  });

  // Validasi keberadaan hewan dan kecocokan dengan pemilik
  if (!hewan2) {
    throw new ResponseError(
      400,
      "Hewan tidak ditemukan atau tidak sesuai dengan pemilik."
    );
  }

  // Periksa apakah pelanggan ditemukan dan apakah pelanggan memiliki hewan
  //  if (!hewan) {
  //   throw new ResponseError(404, "Pelanggan tidak ditemukan");
  // }

  if (!hewan2.id_hewan || hewan2.id_hewan.length === 0) {
    throw new ResponseError(404, "Hewan tidak ditemukan untuk pelanggan ini");
  }

  const metodePembayaran = await prismaClient.metode_pembayaran.findFirst({
    where: { id_metode_pembayaran: jadwal.id_metode_pembayaran },
  });

  if (
    !jadwal.id_metode_pembayaran ||
    (typeof jadwal.id_metode_pembayaran === "object" &&
      Object.keys(jadwal.id_metode_pembayaran).length === 0)
  ) {
    throw new ResponseError(400, "Metode pembayaran harus diisi");
  }

  if (
    !jadwal.id_metode_pembayaran ||
    (typeof jadwal.id_metode_pembayaran === "string" &&
      jadwal.id_metode_pembayaran.trim() === "")
  ) {
    throw new ResponseError(400, "Metode pembayaran harus diisi");
  }

  if (
    jadwal.id_metode_pembayaran === null ||
    jadwal.id_metode_pembayaran === undefined
  ) {
    throw new ResponseError(404, "Metode pembayaran harus diisi");
  }

  const praktek = await prismaClient.praktek.findFirst({
    where: { id_praktek: jadwal.id_praktek },
  });

  if (!praktek || !praktek.spesialis) {
    throw new ResponseError(400, "Praktek atau spesialis tidak ditemukan.");
  }

  let spesialisPraktek = [];
  if (typeof praktek.spesialis === "string") {
    try {
      spesialisPraktek = JSON.parse(praktek.spesialis);
    } catch (e) {
      throw new ResponseError(500, "Gagal memproses spesialis praktek");
    }
  } else if (Array.isArray(praktek.spesialis)) {
    spesialisPraktek = praktek.spesialis;
  } else {
    spesialisPraktek = [praktek.spesialis];
  }

  spesialisPraktek = spesialisPraktek.map((sp) => sp.toLowerCase().trim());
  const jenisHewan = hewan2.jenis_hewan.toLowerCase().trim();

  // Cek apakah jenis hewan sesuai dengan spesialis praktek
  if (!spesialisPraktek.includes(jenisHewan)) {
    throw new ResponseError(
      400,
      `Jenis hewan '${
        hewan2.jenis_hewan
      }' tidak sesuai dengan spesialis praktek yang dipilih. Spesialis praktek yang tersedia: ${spesialisPraktek.join(
        ", "
      )}.`
    );
  }

  // ------- waktu yang dipilih-------
  const parsedTime = parseStartEndTime2(jadwal.waktu_dipilih_pelanggan);
  if (!parsedTime) {
    throw new ResponseError(400, "Waktu yang dipilih pelanggan tidak valid");
  }

  const currentDateTime = new Date();
  const status = determineStatus2(
    parsedTime.startDateTime,
    parsedTime.endDateTime,
    currentDateTime
  );

  // Pastikan metode pembayaran dan praktek ditemukan
  if (!metodePembayaran || !praktek) {
    throw new ResponseError(400, "Data yang diperlukan tidak lengkap.");
  }

  const total_harga =
    praktek.promo !== null
      ? praktek.harga_promo + metodePembayaran.pajak
      : praktek.harga + metodePembayaran.pajak;

  const jadwalTemu = await prismaClient.jadwal_temu.create({
    data: {
      id_temu: uuid(),
      id_dokter: praktek.id_dokter,
      id_pelanggan: hewan2.id_pemilik,
      id_hewan: hewan2.id_hewan,
      id_metode_pembayaran: metodePembayaran.id_metode_pembayaran,
      id_praktek: praktek.id_praktek,
      waktu_dipilih_pelanggan: jadwal.waktu_dipilih_pelanggan,
      total_harga,
      status,
    },
    include: {
      hewan: true,
      dokter: true,
      praktek: true,
      metode_pembayaran: true,
    },
  });

  // await prismaClient.rekam_medis.create({
  //   data: {
  //     id_temu: jadwalTemu.id_temu,
  //   },
  // });

  return jadwalTemu;
};

// const getAll = async (request) => {
//   const jadwalTemu = await prismaClient.jadwal_temu.findMany({
//     where: {},
//     include: {
//       pelanggan: {
//         select: {
//           id_pelanggan: true,
//           kontak: true,
//           alamat: true,
//           url_photo: true

//         }
//       },
//       hewan: {
//           select: {
//             id_hewan: true,
//             nama: true,
//             jenis_hewan: true
//           }
//       },
//       dokter: {
//         select: {
//           id_dokter: true,
//           nama_klinik: true,
//           url_photo: true
//         }
//       },
//       praktek: {
//         select: {
//           id_praktek: true,
//           spesialis: true
//         }
//       },
//       metode_pembayaran: {
//         select: {
//           id_metode_pembayaran: true,
//           nama: true,
//           pajak: true
//         }
//       },
//       Rekam_medis: {
//         select: {
//           komentar: true,
//           rating: true
//         }
//       }
//     }
//   })

//   const users = await prismaClient.user.findMany({
//     where: {
//       role: "pelanggan"
//     }
//   })
//   const users2 = await prismaClient.user.findMany({
//     where: {
//       role: "dokter"
//     }
//   })

//   const result = jadwalTemu.map((jadwal, index) => {
//     const nama_pelanggan = users.find((user) => user.id_user === jadwal.id_pelanggan) || null;
//     const nama_dokter = users2.find((user) => user.id_user === jadwal.id_dokter) || null;

//     return {
//       index,
//       ...jadwal,
//       nama_pelanggan,
//       nama_dokter,
//     };
//   });

//     return result;
// }

// berfungsi ini
// const getAll = async (request) => {

//   const parseStartEndTime2 = (jadwal) => {
//     try {
//       const { date, time } = JSON.parse(jadwal); // Parse JSON string
//       if (!date || !time) throw new Error("Invalid date or time");

//       const [startTime, endTime] = time.split(" - ");
//       if (!startTime || !endTime) throw new Error("Invalid time range");

//       // Pisahkan jam dan menit dari waktu
//       const [startHour, startMinute] = startTime.split(".");
//       const [endHour, endMinute] = endTime.split(".");
//       if (!startHour || !startMinute || !endHour || !endMinute) {
//         throw new Error("Invalid time format");
//       }

//       // Format tanggal menjadi format Date (hapus nama hari dan sesuaikan format)
//       const formattedDate = date.replace(/^\w+, /, "").trim(); // Hapus nama hari seperti "Senin, "
//       const [day, monthName, year] = formattedDate.split(" ");
//       const monthMap = {
//         "januari": "01",
//         "februari": "02",
//         "maret": "03",
//         "april": "04",
//         "mei": "05",
//         "juni": "06",
//         "juli": "07",
//         "agustus": "08",
//         "september": "09",
//         "oktober": "10",
//         "november": "11",
//         "desember": "12"
//       };

//       // Cek bulan
//       const month = monthMap[monthName.toLowerCase()];
//       if (!month) throw new Error("Invalid month name");

//       // Format tanggal menjadi YYYY-MM-DD
//       const formattedDateString = `${year}-${month}-${day}`;
//       const dateObject = new Date(formattedDateString);

//       if (isNaN(dateObject.getTime())) {
//         throw new Error("Invalid date format");
//       }

//       // Gabungkan tanggal dengan waktu
//       return {
//         startDateTime: new Date(
//           dateObject.getFullYear(),
//           dateObject.getMonth(),
//           dateObject.getDate(),
//           parseInt(startHour, 10),
//           parseInt(startMinute, 10)
//         ),
//         endDateTime: new Date(
//           dateObject.getFullYear(),
//           dateObject.getMonth(),
//           dateObject.getDate(),
//           parseInt(endHour, 10),
//           parseInt(endMinute, 10)
//         ),
//       };
//     } catch (error) {
//       console.error("Error parsing waktu_dipilih_pelanggan:", error.message);
//       return null; // Jika parsing gagal, kembalikan null
//     }
//   };

//   // Fungsi untuk menentukan status berdasarkan waktu
//   const determineStatus2 = (startDateTime, endDateTime, currentDateTime) => {
//     if (currentDateTime < startDateTime) {
//       return "Menunggu";
//     } else if (currentDateTime >= startDateTime && currentDateTime <= endDateTime) {
//       return "Berlangsung";
//     } else if (currentDateTime > endDateTime) {
//       return "Selesai";
//     }
//     return "Waktu tidak valid";
//   };
//   const jadwalTemu = await prismaClient.jadwal_temu.findMany({
//     where: {},
//     include: {
//       pelanggan: {
//         select: {
//           id_pelanggan: true,
//           kontak: true,
//           alamat: true,
//           url_photo: true,
//         },
//       },
//       hewan: {
//         select: {
//           id_hewan: true,
//           nama: true,
//           jenis_hewan: true,
//         },
//       },
//       dokter: {
//         select: {
//           id_dokter: true,
//           nama_klinik: true,
//           url_photo: true,
//         },
//       },
//       praktek: {
//         select: {
//           id_praktek: true,
//           spesialis: true,
//         },
//       },
//       metode_pembayaran: {
//         select: {
//           id_metode_pembayaran: true,
//           nama: true,
//           pajak: true,
//         },
//       },
//       Rekam_medis: {
//         select: {
//           komentar: true,
//           rating: true,
//         },
//       },
//     },
//   });

//   const users = await prismaClient.user.findMany({
//     where: {
//       role: "pelanggan",
//     },
//     select: {
//       id_user: true,
//       email: true,
//       username: true,
//       role: true,
//     },
//   });

//   const users2 = await prismaClient.user.findMany({
//     where: {
//       role: "dokter",
//     },
//     select: {
//       id_user: true,
//       email: true,
//       username: true,
//       role: true,
//     },
//   });

//   // Transform data jadwalTemu
//   const currentDateTime = new Date();

//   const result = jadwalTemu.map((jadwal, index) => {
//     // Parse waktu pelanggan
//     const timeData = parseStartEndTime2(jadwal.waktu_dipilih_pelanggan);

//     // Hitung status berdasarkan waktu yang dipilih
//     const statusMessage = timeData
//       ? determineStatus2(timeData.startDateTime, timeData.endDateTime, currentDateTime)
//       : "Waktu tidak valid";

//     // Cari nama pelanggan dan dokter
//     const nama_pelanggan = users.find((user) => user.id_user === jadwal.id_pelanggan) || null;
//     const nama_dokter = users2.find((user) => user.id_user === jadwal.id_dokter) || null;

//     return {
//       index,
//       ...jadwal,
//       status: statusMessage,  // Tambahkan status yang sudah dihitung
//       nama_pelanggan,
//       nama_dokter,
//     };
//   });

//   return result;
// };

// const getById = async (request) => {
//   const { id } = request;
//   const jadwalTemu = await prismaClient.jadwal_temu.findFirst({
//     where: {
//       id_temu: id,
//     },
//     include: {
//       pelanggan: true,
//       hewan: true,
//       dokter: true,
//       praktek: true,
//       metode_pembayaran: true,
//       Rekam_medis: true,
//     },
//   });

//   // Jika jadwalTemu tidak ditemukan
//   if (!jadwalTemu) {
//     throw new Error("Jadwal temu tidak ditemukan");
//   }

//   // Fungsi untuk memparsing waktu dari waktu_dipilih_pelanggan
//   const parseStartEndTime = (jadwal) => {
//     try {
//       const { date, time } = JSON.parse(jadwal); // Parse JSON string
//       const [startTime, endTime] = time.split(" - "); // Ambil waktu mulai dan akhir
//       const [startHour, startMinute] = startTime.split("."); // Pisahkan jam dan menit untuk startTime
//       const [endHour, endMinute] = endTime.split("."); // Pisahkan jam dan menit untuk endTime

//       // Gabungkan tanggal dengan waktu mulai dan akhir ke dalam format Date
//       return {
//         startDateTime: new Date(`${date} ${startHour}:${startMinute}:00`),
//         endDateTime: new Date(`${date} ${endHour}:${endMinute}:00`),
//       };
//     } catch (error) {
//       console.error("Error parsing waktu_dipilih_pelanggan:", error);
//       return null; // Jika parsing gagal, kembalikan null
//     }
//   };

//   // Parse waktu mulai dan akhir dari waktu_dipilih_pelanggan
//   const timeData = parseStartEndTime(jadwalTemu.waktu_dipilih_pelanggan);

//   if (!timeData) {
//     throw new Error("Waktu yang dipilih pelanggan tidak valid");
//   }

//   const { startDateTime, endDateTime } = timeData;
//   const currentDateTime = new Date();

//   // Tentukan status berdasarkan waktu
//   let statusMessage;
//   if (currentDateTime < startDateTime) {
//     statusMessage = "Jadwal praktek belum dimulai";
//   } else if (currentDateTime >= startDateTime && currentDateTime <= endDateTime) {
//     statusMessage = "Praktek sedang berlangsung";
//   } else {
//     statusMessage = "Jadwal praktek sudah selesai";
//   }

//   // Gabungkan hasil dengan statusMessage
//   const result = {
//     ...jadwalTemu,
//     statusMessage,
//   };

//   return result;
// };

const getAll = async (request) => {
  const parseStartEndTime2 = (jadwal) => {
    try {
      const { date, time } = JSON.parse(jadwal); // Parse JSON string
      if (!date || !time) throw new Error("Invalid date or time");

      const [startTime, endTime] = time.split(" - ");
      if (!startTime || !endTime) throw new Error("Invalid time range");

      // Pisahkan jam dan menit dari waktu
      const [startHour, startMinute] = startTime.split(".");
      const [endHour, endMinute] = endTime.split(".");
      if (!startHour || !startMinute || !endHour || !endMinute) {
        throw new Error("Invalid time format");
      }

      // Format tanggal menjadi format Date (hapus nama hari dan sesuaikan format)
      const formattedDate = date.replace(/^\w+, /, "").trim(); // Hapus nama hari seperti "Senin, "
      const [day, monthName, year] = formattedDate.split(" ");
      const monthMap = {
        januari: "01",
        februari: "02",
        maret: "03",
        april: "04",
        mei: "05",
        juni: "06",
        juli: "07",
        agustus: "08",
        september: "09",
        oktober: "10",
        november: "11",
        desember: "12",
      };

      // Cek bulan
      const month = monthMap[monthName.toLowerCase()];
      if (!month) throw new Error("Invalid month name");

      // Format tanggal menjadi YYYY-MM-DD
      const formattedDateString = `${year}-${month}-${day}`;
      const dateObject = new Date(formattedDateString);

      if (isNaN(dateObject.getTime())) {
        throw new Error("Invalid date format");
      }

      // Gabungkan tanggal dengan waktu
      return {
        startDateTime: new Date(
          dateObject.getFullYear(),
          dateObject.getMonth(),
          dateObject.getDate(),
          parseInt(startHour, 10),
          parseInt(startMinute, 10)
        ),
        endDateTime: new Date(
          dateObject.getFullYear(),
          dateObject.getMonth(),
          dateObject.getDate(),
          parseInt(endHour, 10),
          parseInt(endMinute, 10)
        ),
      };
    } catch (error) {
      console.error("Error parsing waktu_dipilih_pelanggan:", error.message);
      return null; // Jika parsing gagal, kembalikan null
    }
  };

  // Fungsi untuk menentukan status berdasarkan waktu
  const determineStatus2 = async (
    jadwalId,
    startDateTime,
    endDateTime,
    currentDateTime
  ) => {
    let status;

    if (currentDateTime < startDateTime) {
      status = "Menunggu";
    } else if (
      currentDateTime >= startDateTime &&
      currentDateTime <= endDateTime
    ) {
      status = "Berlangsung";
    } else if (currentDateTime > endDateTime) {
      status = "Selesai";
    } else {
      status = "Waktu tidak valid";
    }

    // Update status di database
    try {
      await prismaClient.jadwal_temu.update({
        where: {
          id_temu: jadwalId,
        },
        data: {
          status: status,
          // updated_at: new Date(), // Optional: Record update time
        },
      });
    } catch (error) {
      console.error(
        `Failed to update status for jadwalId ${jadwalId}:`,
        error.message
      );
    }

    return status;
  };

  const jadwalTemu = await prismaClient.jadwal_temu.findMany({
    where: {},
    include: {
      pelanggan: {
        select: {
          id_pelanggan: true,
          kontak: true,
          alamat: true,
          url_photo: true,
        },
      },
      hewan: {
        select: {
          id_hewan: true,
          nama: true,
          jenis_hewan: true,
        },
      },
      dokter: {
        select: {
          id_dokter: true,
          nama_klinik: true,
          url_photo: true,
        },
      },
      praktek: {
        select: {
          id_praktek: true,
          spesialis: true,
        },
      },
      metode_pembayaran: {
        select: {
          id_metode_pembayaran: true,
          nama: true,
          pajak: true,
        },
      },
      Rekam_medis: {
        select: {
          komentar: true,
          rating: true,
        },
      },
    },
  });

  const users = await prismaClient.user.findMany({
    where: {
      role: "pelanggan",
    },
    select: {
      id_user: true,
      email: true,
      username: true,
      role: true,
    },
  });

  const users2 = await prismaClient.user.findMany({
    where: {
      role: "dokter",
    },
    select: {
      id_user: true,
      email: true,
      username: true,
      role: true,
    },
  });

  // Transform data jadwalTemu
  const currentDateTime = new Date();

  const result = await Promise.all(
    jadwalTemu.map(async (jadwal, index) => {
      // Parse waktu pelanggan
      const timeData = parseStartEndTime2(jadwal.waktu_dipilih_pelanggan);

      let statusMessage = "Waktu tidak valid";
      if (timeData) {
        statusMessage = await determineStatus2(
          jadwal.id_temu,
          timeData.startDateTime,
          timeData.endDateTime,
          currentDateTime
        );
      }
      // Cari nama pelanggan dan dokter
      const nama_pelanggan =
        users.find((user) => user.id_user === jadwal.id_pelanggan) || null;
      const nama_dokter =
        users2.find((user) => user.id_user === jadwal.id_dokter) || null;

      return {
        index,
        ...jadwal,
        status: statusMessage, // Tambahkan status yang sudah dihitung
        nama_pelanggan,
        nama_dokter,
      };
    })
  );

  return result;
};

const getById = async (request) => {
  const parseStartEndTime2 = (jadwal) => {
    try {
      const { date, time } = JSON.parse(jadwal); // Parse JSON string
      if (!date || !time) throw new Error("Invalid date or time");

      const [startTime, endTime] = time.split(" - ");
      if (!startTime || !endTime) throw new Error("Invalid time range");

      // Pisahkan jam dan menit dari waktu
      const [startHour, startMinute] = startTime.split(".");
      const [endHour, endMinute] = endTime.split(".");
      if (!startHour || !startMinute || !endHour || !endMinute) {
        throw new Error("Invalid time format");
      }

      // Format tanggal menjadi format Date (hapus nama hari dan sesuaikan format)
      const formattedDate = date.replace(/^\w+, /, "").trim(); // Hapus nama hari seperti "Senin, "
      const [day, monthName, year] = formattedDate.split(" ");
      const monthMap = {
        januari: "01",
        februari: "02",
        maret: "03",
        april: "04",
        mei: "05",
        juni: "06",
        juli: "07",
        agustus: "08",
        september: "09",
        oktober: "10",
        november: "11",
        desember: "12",
      };

      // Cek bulan
      const month = monthMap[monthName.toLowerCase()];
      if (!month) throw new Error("Invalid month name");

      // Format tanggal menjadi YYYY-MM-DD
      const formattedDateString = `${year}-${month}-${day}`;
      const dateObject = new Date(formattedDateString);

      if (isNaN(dateObject.getTime())) {
        throw new Error("Invalid date format");
      }

      // Gabungkan tanggal dengan waktu
      return {
        startDateTime: new Date(
          dateObject.getFullYear(),
          dateObject.getMonth(),
          dateObject.getDate(),
          parseInt(startHour, 10),
          parseInt(startMinute, 10)
        ),
        endDateTime: new Date(
          dateObject.getFullYear(),
          dateObject.getMonth(),
          dateObject.getDate(),
          parseInt(endHour, 10),
          parseInt(endMinute, 10)
        ),
      };
    } catch (error) {
      console.error("Error parsing waktu_dipilih_pelanggan:", error.message);
      return null; // Jika parsing gagal, kembalikan null
    }
  };

  // Fungsi untuk menentukan status berdasarkan waktu
  const determineStatus2 = (startDateTime, endDateTime, currentDateTime) => {
    if (currentDateTime < startDateTime) {
      return "Menunggu";
    } else if (
      currentDateTime >= startDateTime &&
      currentDateTime <= endDateTime
    ) {
      return "Berlangsung";
    } else if (currentDateTime > endDateTime) {
      return "Selesai";
    }
    return "Waktu tidak valid";
  };

  const { id } = request;

  // Ambil jadwal temu berdasarkan ID
  const jadwalTemu = await prismaClient.jadwal_temu.findFirst({
    where: {
      id_temu: id,
    },
    include: {
      pelanggan: true, // Relasi ke pelanggan
      hewan: true, // Relasi ke hewan
      dokter: true, // Relasi ke dokter
      praktek: true, // Relasi ke praktek
      metode_pembayaran: true, // Relasi ke metode_pembayaran
      Rekam_medis: true, // Relasi ke Rekam_medis
    },
  });

  // Jika jadwalTemu tidak ditemukan
  if (!jadwalTemu) {
    throw new Error("Jadwal temu tidak ditemukan");
  }

  // Parsing waktu dan menentukan status
  const timeData = parseStartEndTime2(jadwalTemu.waktu_dipilih_pelanggan);
  let statusMessage = "Waktu tidak valid";

  if (timeData) {
    const { startDateTime, endDateTime } = timeData;
    const currentDateTime = new Date();
    // Hitung status berdasarkan waktu sekarang
    statusMessage = determineStatus2(
      startDateTime,
      endDateTime,
      currentDateTime
    );
  }

  // Ambil semua data user pelanggan
  const usersPelanggan = await prismaClient.user.findMany({
    where: {
      role: "pelanggan",
    },
    select: {
      id_user: true,
      email: true,
      username: true,
      role: true,
    },
  });

  // Ambil semua data user dokter
  const usersDokter = await prismaClient.user.findMany({
    where: {
      role: "dokter",
    },
    select: {
      id_user: true,
      email: true,
      username: true,
      role: true,
    },
  });

  // Cari nama pelanggan dan dokter
  const nama_pelanggan =
    usersPelanggan.find(
      (user) => user.id_user === jadwalTemu.pelanggan.id_pelanggan
    ) || null;

  const nama_dokter =
    usersDokter.find((user) => user.id_user === jadwalTemu.dokter.id_dokter) ||
    null;

  // Tambahkan statusMessage ke hasil
  return {
    ...jadwalTemu,
    status: statusMessage, // Status yang selalu ter-update
    nama_pelanggan: nama_pelanggan
      ? nama_pelanggan.username
      : "Tidak diketahui",
    nama_dokter: nama_dokter ? nama_dokter.username : "Tidak diketahui",
  };
};

const getByIdUser = async (request) => {
  const { id } = request;

  // Ambil data user beserta data Pelanggan dan Dokter terkait
  const user = await prismaClient.user.findUnique({
    where: { id_user: id },
    include: { pelanggan: true, dokter: true },
  });

  if (!user) {
    throw new Error("User tidak ditemukan");
  }

  let jadwalTemu = [];

  // Cek apakah user adalah Pelanggan
  if (user.pelanggan) {
    jadwalTemu = await prismaClient.jadwal_temu.findMany({
      where: { id_pelanggan: user.pelanggan.id_pelanggan },
      include: {
        pelanggan: true,
        hewan: true,
        dokter: true,
        praktek: true,
        metode_pembayaran: true,
        Rekam_medis: true,
      },
    });
  }
  // Cek apakah user adalah Dokter
  else if (user.dokter) {
    jadwalTemu = await prismaClient.jadwal_temu.findMany({
      where: { id_dokter: user.dokter.id_dokter },
      include: {
        pelanggan: true,
        hewan: true,
        dokter: true,
        praktek: true,
        metode_pembayaran: true,
        Rekam_medis: true,
      },
    });
  }

  // Ambil data semua pelanggan dan dokter
  const usersPelanggan = await prismaClient.user.findMany({
    where: { role: "pelanggan" },
    select: {
      id_user: true,
      email: true,
      username: true,
      role: true,
    },
  });

  const usersDokter = await prismaClient.user.findMany({
    where: { role: "dokter" },
    select: {
      id_user: true,
      email: true,
      username: true,
      role: true,
    },
  });

  // Map jadwalTemu dan tambahkan data tambahan
  const indexedJadwalData = jadwalTemu.map((jadwal, index) => {
    const pelanggan = usersPelanggan.find(
      (user) => user.id_user === jadwal.id_pelanggan
    );
    const dokter = usersDokter.find(
      (user) => user.id_user === jadwal.id_dokter
    );

    return {
      index,
      ...jadwal,
      pelanggan: pelanggan || {
        id_user: null,
        email: "Tidak diketahui",
        username: "Tidak diketahui",
        role: "pelanggan",
      },
      dokter: dokter || {
        id_user: null,
        email: "Tidak diketahui",
        username: "Tidak diketahui",
        role: "dokter",
      },
    };
  });

  return indexedJadwalData;
};

const deleteById = async (params, authorization) => {
  const { id } = params;

  const token = authorization.split(" ")[1];

  const jadwalUser = await prismaClient.user.findFirstOrThrow({
    where: {
      token: token,
    },
  });

  const dataJadwal = await prismaClient.jadwal_temu.findFirst({
    where: {
      id_temu: id,
    },
  });

  const dataCount = await prismaClient.jadwal_temu.count({
    where: {
      id_temu: id,
    },
  });

  if (!jadwalUser) {
    throw new ResponseError(404, "token invalid");
  } else if (dataCount === 0) {
    throw new ResponseError(404, "Jadwal not found");
  } else if (jadwalUser.id_user != dataJadwal.id_pelanggan) {
    throw new ResponseError(401, "Unauthorized");
  }

  return await prismaClient.jadwal_temu.delete({
    where: {
      id_temu: id,
    },
  });
};

export default {
  createJadwalTemu,
  getAll,
  getById,
  getByIdUser,
  deleteById,
};
