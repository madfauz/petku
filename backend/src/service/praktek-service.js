import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";
import { validate } from "../validation/validation.js";
import { v4 as uuid } from "uuid";
import { addData, editData } from "../validation/praktek-validation.js";

const getAllService = async (request) => {
  const praktekData = await prismaClient.praktek.findMany({
    include: {
      dokter: {
        select: {
          kontak: true,
          pengalaman: true,
          alamat: true,
          nama_klinik: true,
          url_photo: true,
        },
      },
    },
  });

  // format jadwal_waktu
  praktekData.map((praktek) => {
    const jadwal_waktu = praktek.jadwal_waktu;
    const parse_jadwal_waktu = JSON.parse(jadwal_waktu);
    praktek.jadwal_waktu = parse_jadwal_waktu;
  });

  // format spesialis
  praktekData.map((praktek) => {
    const spesialis = praktek.spesialis;
    const parse_spesialis = JSON.parse(spesialis);
    praktek.spesialis = parse_spesialis;
  });

  const userData = await prismaClient.user.findMany({
    where: {
      role: "dokter",
    },
  });

  praktekData.map((praktek) => {
    userData.filter((user) => {
      if (user.id_user == praktek.id_dokter) {
        praktek.dokter.username = user.username;
      }
    });
  });

//kalau pake index tambahin titik 3 diawal ...praktekData 
  // return [
  //   ...praktekData

  // ]
  const indexedPraktekData = praktekData.map((praktek, index) => ({
    index,
    ...praktek,
  }));
  return indexedPraktekData;
};


const getByIdService = async (request) => {
  // ambil params dengan nama id
  const { id } = request;
  const praktekData = await prismaClient.praktek.findMany({
    where: {
      OR: [
        {
          id_praktek: id,
        },
        {
          id_dokter: id,
        },
      ],
    },
    include: {
      dokter: {
        select: {
          kontak: true,
          pengalaman: true,
          alamat: true,
          nama_klinik: true,
          url_photo: true,
        },
      },
    },
  });

  // format jadwal_waktu
  praktekData.map((praktek) => {
    const jadwal_waktu = praktek.jadwal_waktu;
    const parse_jadwal_waktu = JSON.parse(jadwal_waktu);
    praktek.jadwal_waktu = parse_jadwal_waktu;
  });


  // format spesialis
  praktekData.map((praktek) => {
    const spesialis = praktek.spesialis;
    const parse_spesialis = JSON.parse(spesialis);
    praktek.spesialis = parse_spesialis;
  });

  const userData = await prismaClient.user.findMany({
    where: {
      role: "dokter",
    },
  });

  praktekData.map((praktek) => {
    userData.filter((user) => {
      if (user.id_user == praktek.id_dokter) {
        praktek.dokter.username = user.username;
      }
    });
  });

  return praktekData;
};

const addByIdService = async (request, authorization) => {
  const result = validate(addData, request);

  const token = authorization.split(" ")[1];
  // ambil data user berdasarkan token
  const user = await prismaClient.user.findFirstOrThrow({
    where: {
      token: token,
    },
  });

  const dataCount = await prismaClient.user.count({
    where: {
      id_user: user.id_user,
      role: "dokter",
    },
  });


  
  const existSpesialisDokter = await prismaClient.praktek.findMany({
    where: {
      spesialis: result.spesialis
    }, select: {
      spesialis: true
    }
  })

  if (!user) {
    throw new ResponseError(404, "Unauthorized");
  }

  if (dataCount == 0) {
    throw new ResponseError(404, "Data not found");
  }
  if(existSpesialisDokter.length > 0){
    throw new ResponseError(400, "Spesialis tidak boleh sama");
  }


  if (result.harga < 30000) {
    throw new ResponseError(400, "Harga harus diatas Rp 30.000");
  }
  if (result.harga > 500000) {
    throw new ResponseError(400, "Harga harus dibawah Rp 500.000");
  }
  if (result.promo && result.harga_promo == 0) {
    throw new ResponseError(400, "Harga Promo harus diisi lebih dari 0");
  }
  if (result.promo === true) {
    if(result.harga_promo >= result.harga){
      throw new ResponseError(400, "Harga Promo harus lebih kecil dari Harga biasa");
    }
    if (!result.harga_promo ) {
      throw new ResponseError(400, "Harga Promo harus diisi");
    }
  }
  if (result.spesialis.length <= 2) {
    throw new ResponseError(400, "Spesialis harus lebih dari 2 karakter");
  } 
  // else {
  //   // format spesialis
  //   const spesialis = result.spesialis;
  //   const spesialisSplit = spesialis.split(",");
  //   const spesialisTrim = spesialisSplit.map((item) => item.trim());
  //   result.spesialis = JSON.stringify(spesialisTrim);
  // }

 // Format spesialis yang baru dimasukkan
 const newSpesialisArray = result.spesialis.split(",").map((item) => item.trim());

 // Pengecekan duplikasi internal dalam array spesialis yang akan diinput
 const uniqueNewSpesialisArray = [...new Set(newSpesialisArray)];
 if (uniqueNewSpesialisArray.length !== newSpesialisArray.length) {
   throw new ResponseError(400, "Spesialis yang diinput tidak boleh memiliki nama yang sama");
 }

 // Ambil semua spesialis dari tabel praktek dan simpan dalam array
 const existingPraktekSpesialis = await prismaClient.praktek.findMany({
   select: {
     spesialis: true,
   },
 });

 // Menggabungkan semua spesialis yang sudah ada dalam satu array untuk pengecekan
 const existingSpesialisArray = existingPraktekSpesialis
   .flatMap((item) => JSON.parse(item.spesialis)) // Parse JSON spesialis yang sudah ada
   .flat();

 // Cek apakah ada spesialis yang sama antara input baru dan data yang sudah ada di database
 const duplicateSpesialis = newSpesialisArray.find((newSpesialis) => 
   existingSpesialisArray.includes(newSpesialis)
 );

 if (duplicateSpesialis) {
   throw new ResponseError(400, `Spesialis '${duplicateSpesialis}' sudah terdaftar, tidak boleh sama dengan yang sudah ada`);
 }

 // Simpan spesialis dalam format JSON jika tidak ada duplikasi
 result.spesialis = JSON.stringify(newSpesialisArray);






// waktu yang lama
  // format jadwal_waktu
  // const jadwal = result.jadwal_waktu;
  // const jadwalSplit = jadwal.split(",");
  // const jadwalTrim = jadwalSplit.map((item) => item.trim());
  // result.jadwal_waktu = JSON.stringify(jadwalTrim);



  //fadli (jadwal_waktu awal)
  // const jadwal = result.jadwal_waktu;
  // const processedData = jadwal.map((entry) => {
  //   const { day, time } = entry;

  //   // Pisahkan waktu dengan koma
  //   const timeArray = time.split(",").map((t) => t.trim());

  //   // Konversi waktu menjadi objek Date (hanya jam dan menit)
  //   const parsedTimes = timeArray.map((t) => {
  //     const [hours, minutes] = t.split(":").map(Number);
  //     return { hours, minutes };
  //   });

  //   // Mengembalikan data yang sudah diproses
  //   return {
  //     day,
  //     times: parsedTimes,
  //   };
  // });

  // fadli (jadwal_waktu coba yang baru)
  // const jadwal = result.jadwal_waktu;
  
  // const processedData = jadwal.map((entry) => {
  //   const { day, times } = entry;
  
  //   // Pastikan times sudah dalam bentuk array objek start-end
  //   const formattedTimes = times.map((time) => ({
  //     start: time.start,
  //     end: time.end
  //   }));
  
  //   return {
  //     day,
  //     times: formattedTimes,
  //   };
  // });
  

  //   console.log(processedData);

  //     result.jadwal_waktu = JSON.stringify(processedData);


  // Pastikan jadwal_waktu dalam bentuk array
  if (!Array.isArray(result.jadwal_waktu)) {
    throw new ResponseError(400, "Format jadwal_waktu tidak valid");
  }

  // Memproses jadwal_waktu
    const jadwal = result.jadwal_waktu;
    const processedData = jadwal.map((entry) => {
      const { day, times } = entry;

      // Memformat times sebagai objek start-end
      const formattedTimes = times.map((time) => ({
        start: time.start,
        end: time.end,
      }));

      return {
        day,
        times: formattedTimes,
      };
    });

    // Mengambil semua jadwal yang sudah ada di tabel praktek
    const allPraktekSchedules = await prismaClient.praktek.findMany({
      select: {
        jadwal_waktu: true,
      },
    });

    // Memeriksa apakah ada duplikasi pada `day` saja
    const isDuplicateDay = allPraktekSchedules.some((existingSchedule) => {
      const existingJadwal = JSON.parse(existingSchedule.jadwal_waktu);

      return existingJadwal.some((existingEntry) =>
        processedData.some((newEntry) => newEntry.day === existingEntry.day)
      );
    });

    if (isDuplicateDay) {
      throw new ResponseError(400, "Hari yang sama tidak boleh terdaftar di jadwal yang sudah ada sebelumnya");
    }

    result.jadwal_waktu = JSON.stringify(processedData);

      const userCreated = await prismaClient.praktek.create({
        data: {
          id_praktek: uuid().toString(),
          id_dokter: user.id_user,
          ...result,
        },
      });

      return userCreated;
    };

const editByIdService = async (request, params, authorization) => {
  const praktek = validate(editData, request);

  const { id } = params;

  
  const token = authorization.split(" ")[1];
  // ambil data user berdasarkan token
  const user = await prismaClient.user.findFirstOrThrow({
    where: {
      token: token,
    },
  });

  // ambil id_praktek dari params
  

  // cek apakah ada praktek dengan id yang diberikan
  const dataCount = await prismaClient.praktek.count({
    where: {
      id_praktek: id,
    },
  });

  // fadli
  // ambil data praktek
  const dataPraktek = await prismaClient.praktek.findFirst({
    where: {
      id_praktek: id,
    },
  });

  if (!user) {
    throw new ResponseError(404, "User not found");
  } else if (dataCount == 0) {
    throw new ResponseError(404, "Data not found ");
  } else if (user.id_user != dataPraktek.id_dokter) {
    throw new ResponseError(401, "Unauthorized");
  }

  const updateData = {};

  // tidak boleh sama
  if (praktek.harga) {
    if (praktek.harga < 30000) {
      throw new ResponseError(400, "Harga harus diatas Rp 30.000");
    }
    if (praktek.harga > 500000) {
      throw new ResponseError(400, "Harga harus dibawah Rp 500.000");
    }
    updateData.harga = praktek.harga;
  }

  // cek apakah nilai promo berubah
  if (praktek.promo !== null) {
    updateData.promo = praktek.promo;
  }


  // harga_promo harus kosong apabila promo false
  if (!praktek.promo) {
    if (praktek.harga_promo != 0) {
      throw new ResponseError(400, "Harga Promo harus kosong");
    }

    updateData.harga_promo = 0;
  }

  if (praktek.promo === true) {
    if(praktek.harga_promo >= praktek.harga){
      throw new ResponseError(400, "Harga Promo harus lebih kecil dari Harga biasa");
    }
    if (!praktek.harga_promo ) {
      throw new ResponseError(400, "Harga Promo harus diisi");
    }
    updateData.harga_promo = praktek.harga_promo;
  }


  // Pastikan spesialis yang ingin di-update tidak sama dengan yang sudah ada
  if (praktek.spesialis) {
    // Parse spesialis yang ingin diupdate menjadi array dan trim setiap item
    const newSpesialisArray = praktek.spesialis.split(",").map((item) => item.trim());

    // Ambil semua praktek untuk dokter ini, kecuali praktek yang sedang di-edit
    const existingPraktek = await prismaClient.praktek.findMany({
      where: {
        id_dokter: user.id_user,
        NOT: {
          id_praktek: id, // Pastikan pengecekan tidak termasuk data praktek yang sedang diedit
        },
      },
    });

    // Ambil semua spesialis yang ada di database, lakukan JSON.parse untuk setiap spesialis
    const existingSpesialisArray = existingPraktek
      .map((item) => JSON.parse(item.spesialis)) // Parse JSON yang ada di database
      .flat(); // Flatten array untuk mendapatkan semua spesialis dalam satu array

    // Cek apakah ada spesialis yang baru sama dengan yang sudah ada
    for (const newSpesialis of newSpesialisArray) {
      if (existingSpesialisArray.includes(newSpesialis)) {
        throw new ResponseError(400, `Spesialis '${newSpesialis}' sudah terdaftar, tidak boleh sama dengan yang sudah ada`);
      }
    }

    // Jika valid, simpan spesialis baru
    updateData.spesialis = JSON.stringify(newSpesialisArray); // Simpan dalam format JSON
  }

 
// format yang lama
    // Format dan simpan spesialis ke updateData jika valid
    // if (typeof praktek.spesialis !== "string" || praktek.spesialis.length <= 2) {
    //   throw new ResponseError(400, "Spesialis harus lebih dari 2 karakter");
    // } else {
    //   const spesialisSplit = praktek.spesialis.split(",");
    //   const spesialisTrim = spesialisSplit.map((item) => item.trim());
    //   updateData.spesialis = JSON.stringify(spesialisTrim);
    // }
  
  
 // Memproses jadwal_waktu
 const jadwal = praktek.jadwal_waktu;
 const processedData = jadwal.map((entry) => {
   const { day, times } = entry;

   // Memformat times sebagai objek start-end
   const formattedTimes = times.map((time) => ({
     start: time.start,
     end: time.end,
   }));

   return {
     day,
     times: formattedTimes,
   };
 });

 // Mengambil semua jadwal yang sudah ada di tabel praktek
 const allPraktekSchedules = await prismaClient.praktek.findMany({
   where: {
     id_praktek: id,
     NOT:{
      id_praktek: id
   },
   },
   select: {
     jadwal_waktu: true,
   }, 
 });

 // Memeriksa apakah ada duplikasi pada `day` saja
 const isDuplicateDay = allPraktekSchedules.some((existingSchedule) => {
   const existingJadwal = JSON.parse(existingSchedule.jadwal_waktu);

   return existingJadwal.some((existingEntry) =>
     processedData.some((newEntry) => newEntry.day === existingEntry.day)
   );
 });

 if (isDuplicateDay) {
   throw new ResponseError(400, "Hari yang sama tidak boleh terdaftar di jadwal yang sudah ada sebelumnya");
 }

 updateData.jadwal_waktu = JSON.stringify(processedData);

// format yang lama
  // if (praktek.jadwal_waktu) {
  //    // fadli (jadwal_waktu coba yang baru)
  // const jadwal = praktek.jadwal_waktu;
  
  // const processedData = jadwal.map((entry) => {
  //   const { day, times } = entry;
  
  //   // Pastikan times sudah dalam bentuk array objek start-end
  //   const formattedTimes = times.map((time) => ({
  //     start: time.start,
  //     end: time.end
  //   }));
  
  //   return {
  //     day,
  //     times: formattedTimes,
  //   };
  // });
  // updateData.jadwal_waktu = JSON.stringify(processedData);
  // }




  const result = prismaClient.praktek.update({
    where: {
      id_praktek: id
    },
    data: updateData,
  });

  return result;
};

const deleteByIdService = async (params, authorization) => {
  const token = authorization.split(" ")[1];
  // ambil data user berdasarkan token
  const user = await prismaClient.user.findFirstOrThrow({
    where: {
      token: token,
    },
  });

  const { id } = params;

  // cek apakah ada praktek dengan id yang diberikan
  const dataCount = await prismaClient.praktek.count({
    where: {
      id_praktek: id,
    },
  });

  // ambil data praktek
  const dataPraktek = await prismaClient.praktek.findFirst({
    where: {
      id_praktek: id,
    },
  });

  if (!user) {
    throw new ResponseError(404, "User not found");
  } else if (dataCount == 0) {
    throw new ResponseError(404, "Data not found ");
  } else if (user.id_user != dataPraktek.id_dokter) {
    throw new ResponseError(401, "Unauthorized");
  }

  const result = await prismaClient.praktek.delete({
    where: {
      id_praktek: id,
    },
  });

  return result;
};

export default {
  getAllService,
  getByIdService,
  addByIdService,
  editByIdService,
  deleteByIdService,
};
