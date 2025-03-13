import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";
import { CatatanPasien, rekamValidation } from "../validation/rekam-validation.js";
import { validate } from "../validation/validation.js";
import { v4 as uuid } from "uuid";

// const uploadRekam = async (request, authorization) => {
//   const rekam = validate(rekamValidation, request);

//   // const {id} = request.params;

//   const token = authorization.split(" ")[1];

//   const userRekam = await prismaClient.user.findFirstOrThrow({
//     where: {
//       token: token,
//     },
//   });

//   const dataCount = await prismaClient.rekam_medis.count({
//     where: {
//       id_temu: rekam.id_temu,
//     },
//   });

//   if ( dataCount === 2) {
//     throw new ResponseError(400, "Rekam not found or duplicated");
//   } else if (!userRekam) {
//     throw new ResponseError(404, "token invalid");
//   } 

//   const jadwalTemu = await prismaClient.jadwal_temu.findFirst({
//     where: {
//       id_temu: rekam.id_temu,
//       // id_pelanggan: userRekam.id_user,
//     },
//   });
//   if (!jadwalTemu) {
//     throw new ResponseError(404, "No schedule found");
//   }

//   // Pastikan id_user di tabel user sama dengan id_pelanggan yang ada di jadwal_temu
//   if (userRekam.id_user != jadwalTemu.id_pelanggan) {
//     throw new ResponseError(401, "Unauthorized: id_temu does not match with user.");
//   }

//   const rekamCreated = await prismaClient.rekam_medis.upsert({
//     where: {
//       id_temu: rekam.id_temu,
//     },
//     update: {
//       komentar: rekam.komentar,
//       rating: rekam.rating,
//     },create:{
//       id_temu: rekam.id_temu,
//       komentar: rekam.komentar,
//       rating: rekam.rating},
//   });

//   const user = await prismaClient.user.findFirst({
//     where: {
//       role: "dokter",
//       id_user: jadwalTemu.id_dokter
//     },include:{
//       dokter: true
//     }
//   });

//   return {
//     ...rekamCreated,
//     dokter: user
//   }
// }


const updateRekam = async (request, authorization) => {
  const rekam = validate(rekamValidation, request);

  // const {id} = request.params;

  const token = authorization.split(" ")[1];

  const userRekam = await prismaClient.user.findFirstOrThrow({
    where: {
      token: token,
    },
  });
  

  const dataCount = await prismaClient.rekam_medis.count({
    where: {
      id_temu: rekam.id_temu,
    },
  });

  if ( dataCount === 2) {
    throw new ResponseError(400, "Rekam not found or duplicated");
  } else if (!userRekam) {
    throw new ResponseError(404, "token invalid");
  } 

  const jadwalTemu = await prismaClient.jadwal_temu.findFirst({
    where: {
      id_temu: rekam.id_temu,
      // id_pelanggan: userRekam.id_user,
    },
  });

  if (!jadwalTemu) {
    throw new ResponseError(404, "No schedule found");
  }

  if(rekam.id_temu != jadwalTemu.id_temu){
    throw new ResponseError(400, "Rekam medis ID tidak sesuai dengan jadwal temu ID");
  }

  // Pastikan id_user di tabel user sama dengan id_pelanggan yang ada di jadwal_temu
  if (userRekam.id_user != jadwalTemu.id_pelanggan) {
    throw new ResponseError(401, "Unauthorized: id_temu tidak cocok dengan pengguna.");
  }

   // Ambil waktu saat ini dan konversi ke WIB
   const currentDateTime = new Date();
   const wibOffset = 7 * 60 * 60 * 1000; // Offset UTC+7 dalam milidetik
   const wibDate = new Date(currentDateTime.getTime() + wibOffset);
 
   // Format waktu menjadi string (YYYY-MM-DD HH:mm:ss)
   const tanggalKomentar = wibDate.toISOString().replace("T", " ").split(".")[0];
 
   const rekamCreated = await prismaClient.rekam_medis.upsert({
    where: { id_temu: rekam.id_temu },
    update: {
      komentar: rekam.komentar, // Perbarui komentar jika ada
      rating: rekam.rating,    // Perbarui rating jika ada
      tanggal_komentar: tanggalKomentar, // Tambahkan jadwal komentar saat ini
    },
    create: {
      id_temu: rekam.id_temu,  // Buat rekam medis baru jika belum ada
      komentar: rekam.komentar,
      rating: rekam.rating,
      tanggal_komentar: tanggalKomentar, // Tambahkan jadwal komentar saat ini
    },
  });


  const user = await prismaClient.user.findFirst({
    where: {
      role: "dokter",
      id_user: jadwalTemu.id_dokter
    },include:{
      dokter: true
    }
  });

  return {
    ...rekamCreated,
    dokter: user
  }
}

const updateCatatanPasien = async (request, authorization) => {
  const rekam = validate(CatatanPasien, request);

  // const {id} = request.params;

  const token = authorization.split(" ")[1];

  const userRekam = await prismaClient.user.findFirstOrThrow({
    where: {
      token: token,
    },
  });
  
  if (userRekam.role !== "dokter") {
    throw new ResponseError(403, "Hanya dokter yang diizinkan mengisi catatan pasien.");
  }

  const dataCount = await prismaClient.rekam_medis.count({
    where: {
      id_temu: rekam.id_temu,
    },
  });

  if ( dataCount === 2) {
    throw new ResponseError(400, "Rekam medis ditemukan duplikat");
  } else if (!userRekam) {
    throw new ResponseError(404, "token invalid");
  } 

  const jadwalTemu = await prismaClient.jadwal_temu.findFirst({
    where: {
      id_temu: rekam.id_temu,
      // id_pelanggan: userRekam.id_user,
    },
  });

  if (!jadwalTemu) {
    throw new ResponseError(404, "Jadwal temu tidak ditemukan");
  }

  if(rekam.id_temu != jadwalTemu.id_temu){
    throw new ResponseError(400, "Rekam medis ID tidak sesuai dengan jadwal temu ID");
  }

  // Pastikan id_user di tabel user sama dengan id_pelanggan yang ada di jadwal_temu
  if (userRekam.id_user != jadwalTemu.id_dokter) {
    throw new ResponseError(401, "Unauthorized: id_temu tidak cocok dengan dokter.");
  }

  const fadli = await prismaClient.rekam_medis.findMany({})

   const rekamCreated = await prismaClient.rekam_medis.upsert({
    where: { id_temu: rekam.id_temu },
    update: {
      catatan_pasien: rekam.catatan_pasien
    },
    create: {
      id_temu: rekam.id_temu,
      komentar: fadli.komentar,
      rating: fadli.rating,
      catatan_pasien: rekam.catatan_pasien,
      tanggal_komentar: fadli.tanggal_komentar
    },
  });


  const user = await prismaClient.user.findFirst({
    where: {
      role: "dokter",
      id_user: jadwalTemu.id_dokter
    },include:{
      dokter: true
    }
  });

  return {
    ...rekamCreated,
    dokter: user
  }
}


// const getByDokter = async (request) => {
//   const {id} = request;
//   const jadwal = await prismaClient.jadwal_temu.findMany({
//     where: {
//       id_dokter: id
//     },include: {
//       Rekam_medis: true
//     }
//   })

//  const rekam = await prismaClient.rekam_medis.findMany({
//     where: {
//       id_temu: id
//     }
//   })

//   const users = await prismaClient.user.findMany({
//     where: {
//       role: "dokter",
//       id_user: id
//     }
//   });

// // buat agar memberi index pada data
//   const result = jadwal.map((rekam) => {
//     return {
//       ...rekam,
//     user: users.find((user) => user.id_user === rekam.id_dokter) || null
//     };
//   });

//   return {
//     ...jadwal,
//     ...result,
//   }
// }

const getByDokter = async (request) => {
  const { id } = request;

  // Ambil dokter berdasarkan ID dokter
  const dokter = await prismaClient.dokter.findFirst({
    where: { id_dokter: id },
    include: {
      user: true, // Sertakan username dokter
    },
  });

  if (!dokter) {
    throw new Error("Dokter tidak ditemukan");
  }

  // Ambil rekam medis yang sesuai dengan ID dokter
  const rekamMedis = await prismaClient.rekam_medis.findMany({
    where: {
      jadwal_temu: {
        id_dokter: id,
      },
    },
    include: {
      jadwal_temu: {
        include: {
          hewan: true, // Sertakan data hewan
          pelanggan: {
            include: {
              user: true, // Sertakan username pelanggan
            },
          },
          praktek: true, // Sertakan data praktek
        },
      },
    },
  });

  if (rekamMedis.length === 0) {
    throw new Error("Tidak ada rekam medis untuk dokter ini");
  }

  // Format hasil rekam medis dengan informasi dokter, pelanggan, hewan, praktek, dan jadwal temu
  const rekamMedisResult = rekamMedis.map((rekamItem, index) => ({
    index: index + 1,
    id_temu: rekamItem.id_temu,
    komentar: rekamItem.komentar,
    rating: rekamItem.rating,
    tanggal_komentar: rekamItem.tanggal_komentar,
    catatan_pasien: rekamItem.catatan_pasien,
    dokter: {
      id_dokter: dokter.id_dokter,
      username: dokter.user?.username || null,
      nama_klinik: dokter.nama_klinik,
      kontak: dokter.kontak,
      alamat: dokter.alamat,
      url_photo: dokter.url_photo,
    },
    pelanggan: {
      id_pelanggan: rekamItem.jadwal_temu.pelanggan?.id_pelanggan,
      username: rekamItem.jadwal_temu.pelanggan?.user?.username || null,
      kontak: rekamItem.jadwal_temu.pelanggan?.kontak,
      alamat: rekamItem.jadwal_temu.pelanggan?.alamat,
      url_photo: rekamItem.jadwal_temu.pelanggan?.url_photo,
    },
    hewan: {
      id_hewan: rekamItem.jadwal_temu.hewan?.id_hewan,
      nama: rekamItem.jadwal_temu.hewan?.nama,
      jenis_hewan: rekamItem.jadwal_temu.hewan?.jenis_hewan,
    },
    praktek: {
      id_praktek: rekamItem.jadwal_temu.praktek?.id_praktek,
      spesialis: rekamItem.jadwal_temu.praktek?.spesialis,
      harga: rekamItem.jadwal_temu.praktek?.harga,
      harga_promo: rekamItem.jadwal_temu.praktek?.harga_promo,
    },
    jadwal_temu: {
      waktu_dipilih_pelanggan: rekamItem.jadwal_temu.waktu_dipilih_pelanggan,
      status: rekamItem.jadwal_temu.status,
      total_harga: rekamItem.jadwal_temu.total_harga,
    },
  }));

  return {
      dokter: {
        id_dokter: dokter.id_dokter,
        username: dokter.user?.username || null,
        nama_klinik: dokter.nama_klinik,
        kontak: dokter.kontak,
        alamat: dokter.alamat,
        url_photo: dokter.url_photo,
      },
      rekam_medis: rekamMedisResult,
  };
};

const getByIdPraktek = async (request) => {
  const { id } = request;

  // Ambil informasi praktek berdasarkan ID praktek
  const praktek = await prismaClient.praktek.findFirst({
    where: { id_praktek: id },
    include: {
      dokter: {
        include: {
          user: true, // Sertakan username dokter
        },
      },
    },
  });

  if (!praktek) {
    throw new Error("Praktek tidak ditemukan");
  }

  // Ambil rekam medis yang sesuai dengan ID praktek
  const rekamMedis = await prismaClient.rekam_medis.findMany({
    where: {
      jadwal_temu: {
        id_praktek: id,
      },
    },
    include: {
      jadwal_temu: {
        include: {
          hewan: true, // Sertakan data hewan
          pelanggan: {
            include: {
              user: true, // Sertakan username pelanggan
            },
          },
        },
      },
    },
  });

  if (rekamMedis.length === 0) {
    throw new Error("Tidak ada rekam medis untuk praktek ini");
  }

  // Format hasil rekam medis dengan informasi terkait
  const rekamMedisResult = rekamMedis.map((rekamItem, index) => ({
    index: index + 1,
    id_temu: rekamItem.id_temu,
    komentar: rekamItem.komentar,
    rating: rekamItem.rating,
    tanggal_komentar: rekamItem.tanggal_komentar,
    catatan_pasien: rekamItem.catatan_pasien,
    pelanggan: {
      id_pelanggan: rekamItem.jadwal_temu.pelanggan?.id_pelanggan,
      username: rekamItem.jadwal_temu.pelanggan?.user?.username || null,
      kontak: rekamItem.jadwal_temu.pelanggan?.kontak,
      alamat: rekamItem.jadwal_temu.pelanggan?.alamat,
      url_photo: rekamItem.jadwal_temu.pelanggan?.url_photo,
    },
    dokter: {
      id_dokter: praktek.dokter.id_dokter,
      username: praktek.dokter.user?.username || null,
      nama_klinik: praktek.dokter.nama_klinik,
      kontak: praktek.dokter.kontak,
      alamat: praktek.dokter.alamat,
      url_photo: praktek.dokter.url_photo,
    },
    hewan: {
      id_hewan: rekamItem.jadwal_temu.hewan?.id_hewan,
      nama: rekamItem.jadwal_temu.hewan?.nama,
      jenis_hewan: rekamItem.jadwal_temu.hewan?.jenis_hewan,
    },
    jadwal_temu: {
      waktu_dipilih_pelanggan: rekamItem.jadwal_temu.waktu_dipilih_pelanggan,
      status: rekamItem.jadwal_temu.status,
      total_harga: rekamItem.jadwal_temu.total_harga,
    },
  }));

  return {
      praktek: {
        id_praktek: praktek.id_praktek,
        id_dokter: praktek.id_dokter,
        spesialis: praktek.spesialis,
        jadwal_waktu: praktek.jadwal_waktu,
        promo: praktek.promo,
        harga: praktek.harga,
        harga_promo: praktek.harga_promo,
      },
      rekam_medis: rekamMedisResult,
  };
};



// const getByDokter = async (request) => {
//   const { id } = request;

//   // Ambil jadwal temu berdasarkan ID dokter
//   const jadwal = await prismaClient.jadwal_temu.findMany({
//     where: {
//       id_dokter: id,
//     },
//     include: {
//       hewan: {
//         include: {
//           pelanggan: {
//             include: {
//               user: true, // Ambil username pelanggan
//             },
//           },
//         },
//       },
//       pelanggan: {
//         include: {
//           user: true, // Ambil username pelanggan
//         },
//       },
//       praktek: true, // Sertakan praktek
//     },
//   });

//   // Ambil rekam medis yang sesuai dengan ID dokter
//   const rekamMedis = await prismaClient.rekam_medis.findMany({
//     where: {
//       jadwal_temu: {
//         id_dokter: id,
//       },
//     },
//     include: {
//       jadwal_temu: {
//         include: {
//           hewan: true,       // Ambil nama hewan
//           pelanggan: {
//             include: {
//               user: true, // Ambil username pelanggan
//             },
//           },
//         },
//       },
//     },
//   });

//   // Ambil informasi dokter berdasarkan ID dokter
//   const dokter = await prismaClient.dokter.findFirst({
//     where: {
//       id_dokter: id,
//     },
//     include: {
//       user: true, // Sertakan username dokter
//     },
//   });

//   // Mapping untuk data jadwal dengan pelanggan, hewan, dan praktek
//   const jadwalResult = jadwal.map((jadwalItem, index) => ({
//     index: index + 1,
//     id_temu: jadwalItem.id_temu,
//     waktu_dipilih_pelanggan: jadwalItem.waktu_dipilih_pelanggan,
//     status: jadwalItem.status,
//     total_harga: jadwalItem.total_harga,
//     pelanggan: {
//       id_pelanggan: jadwalItem.pelanggan?.id_pelanggan,
//       username: jadwalItem.pelanggan?.user?.username || null, // Tambahkan username pelanggan
//       kontak: jadwalItem.pelanggan?.kontak,
//       alamat: jadwalItem.pelanggan?.alamat,
//       url_photo: jadwalItem.pelanggan?.url_photo,
//     },
//     hewan: {
//       id_hewan: jadwalItem.hewan?.id_hewan,
//       nama: jadwalItem.hewan?.nama,
//       jenis_hewan: jadwalItem.hewan?.jenis_hewan,
//     },
//     praktek: {
//       id_praktek: jadwalItem.praktek?.id_praktek,
//       spesialis: jadwalItem.praktek?.spesialis,
//       harga: jadwalItem.praktek?.harga,
//       harga_promo: jadwalItem.praktek?.harga_promo,
//     },
//   }));

//   // Mapping rekam medis
//   const rekamMedisResult = rekamMedis.map((rekamItem, index) => ({
//     index: index + 1,
//     id_temu: rekamItem.id_temu,
//     komentar: rekamItem.komentar,
//     rating: rekamItem.rating,
//     tanggal_komentar: rekamItem.tanggal_komentar,
//     catatan_pasien: rekamItem.catatan_pasien,
//     pelanggan: {
//       id_pelanggan: rekamItem.jadwal_temu.pelanggan?.id_pelanggan,
//       username: rekamItem.jadwal_temu.pelanggan?.user?.username || null, // Username pelanggan
//     },
//     hewan: {
//       id_hewan: rekamItem.jadwal_temu.hewan?.id_hewan,
//       nama: rekamItem.jadwal_temu.hewan?.nama, // Nama hewan
//       jenis_hewan: rekamItem.jadwal_temu.hewan?.jenis_hewan,
//     },
//   }));

//   return {
//     dokter: {
//       id_dokter: dokter?.id_dokter,
//       username: dokter?.user?.username || null, // Tambahkan username dokter
//       nama_klinik: dokter?.nama_klinik,
//       kontak: dokter?.kontak,
//       alamat: dokter?.alamat,
//       url_photo: dokter?.url_photo,
//     },
//     rekam_medis: rekamMedisResult,
//     jadwal: jadwalResult,
//   };
// };


const getByIdPelanggan = async (request) => {
  const { id } = request;

  // Ambil informasi pelanggan berdasarkan ID
  const pelanggan = await prismaClient.pelanggan.findFirst({
    where: { id_pelanggan: id },
    include: {
      user: true, // Sertakan username pelanggan
    },
  });

  if (!pelanggan) {
    throw new Error("Pelanggan tidak ditemukan");
  }

  // Ambil rekam medis dan jadwal temu yang terkait dengan ID pelanggan
  const rekamMedis = await prismaClient.rekam_medis.findMany({
    where: {
      jadwal_temu: {
        id_pelanggan: id,
      },
    },
    include: {
      jadwal_temu: {
        include: {
          hewan: true, // Sertakan data hewan
          dokter: {
            include: {
              user: true, // Sertakan username dokter
            },
          },
          praktek: true, // Sertakan data praktek
        },
      },
    },
  });

  // Mapping hasil rekam medis dengan informasi terkait
  const rekamMedisResult = rekamMedis.map((rekamItem, index) => ({
    index: index + 1,
    id_temu: rekamItem.id_temu,
    komentar: rekamItem.komentar,
    rating: rekamItem.rating,
    tanggal_komentar: rekamItem.tanggal_komentar,
    catatan_pasien: rekamItem.catatan_pasien,
    pelanggan: {
      id_pelanggan: pelanggan.id_pelanggan,
      username: pelanggan.user?.username || null,
      kontak: pelanggan.kontak,
      alamat: pelanggan.alamat,
      url_photo: pelanggan.url_photo,
    },
    dokter: {
      id_dokter: rekamItem.jadwal_temu.dokter?.id_dokter,
      username: rekamItem.jadwal_temu.dokter?.user?.username || null,
      nama_klinik: rekamItem.jadwal_temu.dokter?.nama_klinik,
      kontak: rekamItem.jadwal_temu.dokter?.kontak,
      alamat: rekamItem.jadwal_temu.dokter?.alamat,
      url_photo: rekamItem.jadwal_temu.dokter?.url_photo,
    },
    hewan: {
      id_hewan: rekamItem.jadwal_temu.hewan?.id_hewan,
      nama: rekamItem.jadwal_temu.hewan?.nama,
      jenis_hewan: rekamItem.jadwal_temu.hewan?.jenis_hewan,
    },
    praktek: {
      id_praktek: rekamItem.jadwal_temu.praktek?.id_praktek,
      spesialis: rekamItem.jadwal_temu.praktek?.spesialis,
      harga: rekamItem.jadwal_temu.praktek?.harga,
      harga_promo: rekamItem.jadwal_temu.praktek?.harga_promo,
    },
    jadwal_temu: {
      waktu_dipilih_pelanggan: rekamItem.jadwal_temu.waktu_dipilih_pelanggan,
      status: rekamItem.jadwal_temu.status,
      total_harga: rekamItem.jadwal_temu.total_harga,
    },
  }));

  return {
    pelanggan: {
      id_pelanggan: pelanggan.id_pelanggan,
      username: pelanggan.user?.username || null,
      kontak: pelanggan.kontak,
      alamat: pelanggan.alamat,
      url_photo: pelanggan.url_photo,
    },
    rekam_medis: rekamMedisResult,
  };
};


// const getByIdPelanggan = async (request) => {
//   const {id} = request;
//   const jadwal = await prismaClient.jadwal_temu.findMany({
//     where: {
//       id_pelanggan: id
//     },include: {
//       Rekam_medis: true
//     }
//   })

//  const rekam = await prismaClient.rekam_medis.findMany({
//     where: {
//       id_temu: id
//     }
//   })

//   const users = await prismaClient.user.findMany({
//     where: {
//       role: "pelanggan",
//       id_user: id
//     }
//   });

// // buat agar memberi index pada data
//   const result = jadwal.map((rekam) => {
//     return {
//       ...rekam,
//     user: users.find((user) => user.id_user === rekam.id_pelanggan) || null
//     };
//   });

//   return {
//     ...jadwal,
//     ...result,
//   }
// }

// const getByIdPelanggan = async (request) => {
//   const { id } = request;

//   // Ambil jadwal temu berdasarkan ID pelanggan
//   const jadwal = await prismaClient.jadwal_temu.findMany({
//     where: {
//       id_pelanggan: id,
//     },
//     include: {
//       hewan: true,       // Sertakan hewan
//       dokter: {
//         include: {
//           user: true, // Ambil username dokter
//         },
//       },
//       praktek: true,     // Sertakan praktek
//     },
//   });

//   // Ambil rekam medis berdasarkan ID pelanggan
//   const rekamMedis = await prismaClient.rekam_medis.findMany({
//     where: {
//       jadwal_temu: {
//         id_pelanggan: id,
//       },
//     },
//     include: {
//       jadwal_temu: {
//         include: {
//           hewan: true,       // Ambil nama hewan
//           dokter: {
//             include: {
//               user: true, // Ambil username dokter
//             },
//           },
//         },
//       },
//     },
//   });

//   // Ambil informasi pelanggan berdasarkan ID
//   const pelanggan = await prismaClient.pelanggan.findFirst({
//     where: {
//       id_pelanggan: id,
//     },
//     include: {
//       user: true, // Sertakan username pelanggan
//     },
//   });

//   // Mapping untuk data jadwal
//   const jadwalResult = jadwal.map((jadwalItem, index) => ({
//     index: index + 1,
//     id_temu: jadwalItem.id_temu,
//     waktu_dipilih_pelanggan: jadwalItem.waktu_dipilih_pelanggan,
//     status: jadwalItem.status,
//     total_harga: jadwalItem.total_harga,
//     dokter: {
//       id_dokter: jadwalItem.dokter?.id_dokter,
//       username: jadwalItem.dokter?.user?.username || null, // Username dokter
//       nama_klinik: jadwalItem.dokter?.nama_klinik,
//       kontak: jadwalItem.dokter?.kontak,
//       alamat: jadwalItem.dokter?.alamat,
//       url_photo: jadwalItem.dokter?.url_photo,
//     },
//     hewan: {
//       id_hewan: jadwalItem.hewan?.id_hewan,
//       nama: jadwalItem.hewan?.nama,
//       jenis_hewan: jadwalItem.hewan?.jenis_hewan,
//     },
//     praktek: {
//       id_praktek: jadwalItem.praktek?.id_praktek,
//       spesialis: jadwalItem.praktek?.spesialis,
//       harga: jadwalItem.praktek?.harga,
//       harga_promo: jadwalItem.praktek?.harga_promo,
//     },
//   }));

//   // Mapping untuk data rekam medis
//   const rekamMedisResult = rekamMedis.map((rekamItem, index) => ({
//     index: index + 1,
//     id_temu: rekamItem.id_temu,
//     komentar: rekamItem.komentar,
//     rating: rekamItem.rating,
//     tanggal_komentar: rekamItem.tanggal_komentar,
//     catatan_pasien: rekamItem.catatan_pasien,
//     dokter: {
//       id_dokter: rekamItem.jadwal_temu.dokter?.id_dokter,
//       username: rekamItem.jadwal_temu.dokter?.user?.username || null, // Username dokter
//       nama_klinik: rekamItem.jadwal_temu.dokter?.nama_klinik,
//     },
//     hewan: {
//       id_hewan: rekamItem.jadwal_temu.hewan?.id_hewan,
//       nama: rekamItem.jadwal_temu.hewan?.nama,
//     },
//   }));

//   return {
//     pelanggan: {
//       id_pelanggan: pelanggan?.id_pelanggan,
//       username: pelanggan?.user?.username || null, // Username pelanggan
//       kontak: pelanggan?.kontak,
//       alamat: pelanggan?.alamat,
//       url_photo: pelanggan?.url_photo,
//     },
//     rekam_medis: rekamMedisResult,
//     jadwal: jadwalResult,
//   };
// };


const getAll = async () => {
  const rekam = await prismaClient.rekam_medis.findMany({
    include: {
      jadwal_temu: {
        include: {
          hewan: true,          // Ambil data hewan
          dokter: {
            include: {
              user: true,       // Ambil username dokter
            },
          },
          pelanggan: {
            include: {
              user: true,       // Ambil username pelanggan
            },
          },
          praktek: true, 
          metode_pembayaran: true       // Ambil data praktek
        },
      },
    },
  });

  const result = rekam.map((rekamItem, index) => {
    const jadwal = rekamItem.jadwal_temu;

    return {
      index: index + 1,
      id_temu: rekamItem.id_temu,
      rating: rekamItem.rating,
      komentar: rekamItem.komentar,
      catatan_pasien: rekamItem.catatan_pasien,
      tanggal_komentar: rekamItem.tanggal_komentar,
      pelanggan: jadwal.pelanggan
        ? {
            id_pelanggan: jadwal.pelanggan.id_pelanggan,
            username: jadwal.pelanggan.user?.username || null, // Username pelanggan
            kontak: jadwal.pelanggan.kontak,
            alamat: jadwal.pelanggan.alamat,
            url_photo: jadwal.pelanggan.url_photo,
          }
        : null,
      dokter: jadwal.dokter
        ? {
            id_dokter: jadwal.dokter.id_dokter,
            username: jadwal.dokter.user?.username || null, // Username dokter
            nama_klinik: jadwal.dokter.nama_klinik,
            kontak: jadwal.dokter.kontak,
            alamat: jadwal.dokter.alamat,
            url_photo: jadwal.dokter.url_photo,
          }
        : null,
      hewan: jadwal.hewan
        ? {
            id_hewan: jadwal.hewan.id_hewan,
            nama: jadwal.hewan.nama,
            jenis_hewan: jadwal.hewan.jenis_hewan,
          }
        : null,
      praktek: jadwal.praktek
        ? {
            id_praktek: jadwal.praktek.id_praktek,
            spesialis: jadwal.praktek.spesialis,
            harga: jadwal.praktek.harga,
            harga_promo: jadwal.praktek.harga_promo,
          }
        : null,
      jadwal_temu: {
        waktu_dipilih_pelanggan: jadwal.waktu_dipilih_pelanggan,
        status: jadwal.status,
        total_harga: jadwal.total_harga,
      },
      metode_pembayaran: jadwal.metode_pembayaran
    };
  });

  return result;
};

const deleteById= async (request, authorization) => {
  const {id} = request

  const token = authorization.split(" ")[1]

  const rekamUser = await prismaClient.user.findFirstOrThrow({
    where: {
      token: token
    }
  })

  const dataRekam = await prismaClient.rekam_medis.findFirst({
    where: {
      id_temu: id
    }
  })

  const dataCount = await prismaClient.rekam_medis.count({
    where: {
      id_temu: id
    }
  })

  const jadwalTemu = await prismaClient.jadwal_temu.findFirst({
    where: {
      id_temu: id,
      // id_pelanggan: userRekam.id_user,
    },
  });

  if (!rekamUser) {
    throw new ResponseError(404, "token invalid")
  } else if (dataCount === 0) {
    throw new ResponseError(404, "Rekam not found")
  } else if (rekamUser.id_user != jadwalTemu.id_pelanggan) {
    throw new ResponseError(401, "Unauthorized: id_temu does not match with user.")
  }

  const rekam = await prismaClient.rekam_medis.delete({
    where: {
      id_temu: id
    }
  })

  const jadwal = await prismaClient.jadwal_temu.delete({
    where: {
      id_temu: id
    }
  })


  return{
    ...rekam,
    ...jadwal
  } 
}

  export default{
    getByDokter, 
    getByIdPelanggan,
    getByIdPraktek,
    getAll,
    updateRekam,
    updateCatatanPasien,
    deleteById
  }