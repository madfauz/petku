import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";
import { validate } from "../validation/validation.js";
import { editData } from "../validation/dokter-validation.js";
import path from "path";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";
import Fuse from "fuse.js";

const getAllService = async (request) => {
  const data = await prismaClient.dokter.findMany({
    where: {},
    include: {
      user: true,
      praktek: {
        select: {
          id_praktek: true,
          id_dokter: true,
          spesialis: true,
          jadwal_waktu: true,
          harga: true,
          harga_promo: true,
          promo: true,
        },
      },
    },
  });

// output lama 
  // const formatData = data.map((user, index) => {
  //   // format image
  //   const cek = user.url_photo.includes("https://");
  //   if (!cek) {
  //     user.url_photo = process.env.DOMAIN + user.url_photo;
  //   }

  //   return user
  //     // user
  // });
  // return formatData;

// output baru
const formatData = data.map((user, index) => {
  // Format image URL
  const cek = user.url_photo.includes("https://");
  if (!cek) {
    user.url_photo = process.env.DOMAIN + user.url_photo;
  }

  return {
    index: index, // Adding 1 to make index 1-based if needed
    ...user,       // Including the user data object
  };
});

return formatData;

}

const getByIdService = async (request) => {
  // ambil params dengan nama id
  const { id } = request;
  const data = await prismaClient.user.findFirst({
    where: {
      id_user: id,
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

  if (!data) {
    throw new ResponseError(404, "Data not found");
  }

  // format image
  const cek = data.dokter.url_photo.includes("https://");
  if (!cek) {
    data.dokter.url_photo = process.env.DOMAIN + data.dokter.url_photo;
  }

  return data;
};

const editByIdService = async (request, params, authorization, files) => {
  const dokter = validate(editData, request);

  const token = authorization.split(" ")[1];
  // ambil data user berdasarkan token
  const user = await prismaClient.user.findFirstOrThrow({
    where: {
      token: token,
    },
  });

  // ambil id berdasarkan params
  const { id } = params;

  const dataCount = await prismaClient.user.count({
    where: {
      id_user: id,
    },
  });

  const dataDoctor = await prismaClient.dokter.findFirst({
    where: {
      id_dokter: id,
    },
  });

  if (!user) {
    throw new ResponseError(404, "User not found");
  } else if (dataCount == 0) {
    throw new ResponseError(404, "Data not found");
  } else if (user.id_user != id) {
    throw new ResponseError(401, "Unauthorized");
  }

  const updateData = { user: {}, dokter: {} };

  // cek apakah ada gambar
  let image, urlImage, imageName;
  if (files) {
    image = files.image;
    const imageSize = image.data.length;
    const extImage = path.extname(image.name);
    const allowedType = [".png", ".jpg", ".jpeg"];
    imageName = image.md5 + uuidv4() + extImage;
    if (imageSize > 2000000) {
      throw new ResponseError(400, "Ukuran gambar tidak boleh lebih dari 2 MB");
    } else if (!allowedType.includes(extImage.toLowerCase())) {
      throw new ResponseError(400, "Tipe gambar tidak diizinkan");
    }
    urlImage = `images/doctor/${imageName}`;

    // untuk menghindari duplikat ataupun image yang sudah tidak dipakai, hapus image dengan nama sama di directory
    if (dataDoctor.url_photo.includes("images/")) {
      const previousImageName = dataDoctor.url_photo.split("/")[2];
      const filepath = `./src/public/images/doctor/${previousImageName}`;
      fs.unlinkSync(filepath);
    }

    // simpan image ke directory
    image.mv(`./src/public/images/doctor/${imageName}`, async (err) => {
      if (err) {
        throw new ResponseError(500, err.message);
      }
    });

    updateData.dokter.url_photo = urlImage;
  }

  if (dokter.username) {
    updateData.user.username = dokter.username;
  }
  if (dokter.kontak) {
    updateData.dokter.kontak = dokter.kontak;
  }
  if (dokter.pengalaman) {
    updateData.dokter.pengalaman = dokter.pengalaman;
  }
  if (dokter.alamat) {
    updateData.dokter.alamat = dokter.alamat;
  }
  if (dokter.nama_klinik) {
    updateData.dokter.nama_klinik = dokter.nama_klinik;
  }

  const result = prismaClient.user.update({
    where: {
      id_user: id,
    },
    data: {
      username: updateData.user.username,
      dokter: {
        update: {
          where: {
            id_dokter: id,
          },
          data: updateData.dokter,
        },
      },
    },
    include: {
      dokter: true,
    },
  });

  return result;
};

const searchService = async (request) => {
  const searchQuery = request.search_query ? request.search_query.trim() : null;

  // const pelanggan = await prismaClient.pelanggan.findMany({
  //   where: { 
  //     OR: [
  //       {id_pelanggan: { contains: searchQuery }},
  //       {kontak: { contains: searchQuery }},
  //       {alamat: { contains: searchQuery }},
  //       {url_photo: { contains: searchQuery }},
  //       {user:{
  //         OR: [
  //           {username: { contains: searchQuery }},
  //           {role: { contains: searchQuery }},
  //         ],
  //       }}
  //     ],
  //   },include: {
  //     user: true
  //   }  
  // })
  const dokter = await prismaClient.dokter.findMany({
    where: { 
      OR: [
       {id_dokter: { contains: searchQuery }},
       {kontak: { contains: searchQuery }},
       {alamat: { contains: searchQuery }},
       {nama_klinik: { contains: searchQuery }},
       {url_photo: { contains: searchQuery }},
       { praktek:{
        some: {spesialis: { contains: searchQuery } }
      }
      },
        {user:{
          OR: [
            {username: { contains: searchQuery }},
            {role: { contains: searchQuery }},
          ],
        }}
      ],
    },include: {
      user: true,
      praktek: true

    }
  })
  const praktek = await prismaClient.praktek.findMany({
    where: {
      OR: [
        { spesialis: { contains: searchQuery } },
        { id_praktek: { contains: searchQuery } },
        { jadwal_waktu: { contains: searchQuery } },
        {
          dokter: {
            OR: [
              { kontak: { contains: searchQuery } },
              { id_dokter: { contains: searchQuery } },
              { nama_klinik: { contains: searchQuery } },
              { alamat: { contains: searchQuery } },
              { url_photo: { contains: searchQuery } },
              { 
              },
            ],
          },
        },
      ],
    },
    include: {
      dokter: {
        include: {
          user: true,
        },
      },
    },
  });

  // const combinedData1 = [
  //   // ...hewan.map((hewan) => ({
  //   //   id_hewan: hewan.id_hewan,
  //   //   nama: hewan.nama,
  //   //   hewan: hewan.jenis_hewan,
  //   //   id_pemilik: hewan.id_pemilik, // Menambahkan nilai default untuk username dan email agar strukturnya konsisten
  //   // })),
  //   // ...user.map(user => ({
  //   //   username: user.username,
  //   //   role: user.role,
  //   // })),
  //   ...pelanggan.map((pelanggan) => ({
  //     id_pelanggan: pelanggan.id_pelanggan,
  //     kontak: pelanggan.kontak,
  //     alamat: pelanggan.alamat,
  //     url_photo: pelanggan.url_photo,
  //     username: pelanggan.user.username,
  //     role: pelanggan.user.role,
  //   })),


  //   ...dokter.map((dokter) => ({
  //     id_dokter: dokter.id_dokter,
  //     kontak: dokter.kontak,
  //     alamat: dokter.alamat,
  //     nama_klinik: dokter.nama_klinik,
  //     url_photo: dokter.url_photo,
  //     username: dokter.user.username,
  //     role: dokter.user.role,
  //     praktek: dokter.praktek.map((praktek) => ({
  //       id_praktek: praktek.id_praktek,
  //       id_dokter: praktek.id_dokter,
  //       spesialis: praktek.spesialis,
  //       jadwal_waktu: praktek.jadwal_waktu,
  //       harga: praktek.harga,
  //       harga_promo: praktek.harga_promo,
  //       promo: praktek.promo,
  //     })),
  //   })),
  //   // ...fadli.map((praktek) => ({
  //   //     id_praktek: praktek.id_praktek,
  //   //     id_dokter: praktek.id_dokter,
  //   //     spesialis: praktek.spesialis,
  //   //     jadwal_waktu: praktek.jadwal_waktu,
  //   //     harga: praktek.harga,
  //   //     harga_promo: praktek.harga_promo,
  //   //     promo: praktek.promo,
  //   // })),

  //   ...praktek.map((praktek) => ({
  //     id_dokter: praktek.dokter.id_dokter,
  //     spesialis: praktek.spesialis,
  //     jadwal_waktu: praktek.jadwal_waktu,
  //     id_praktek: praktek.id_praktek,
  //     nama_klinik: praktek.dokter.nama_klinik,
  //     alamat: praktek.dokter.alamat,
  //     kontak: praktek.dokter.kontak,
  //     url_photo: praktek.dokter.url_photo,
  //     username: praktek.dokter.user.username,
  //     role: praktek.dokter.user.role,
  //     harga: praktek.harga,
  //     harga_promo: praktek.harga_promo,
  //     promo: praktek.promo,
  //   })),
  // ];



  const combinedData = [

    // ...pelanggan.map((pelanggan) => ({
    //   id_pelanggan: pelanggan.id_pelanggan,
    //   kontak: pelanggan.kontak,
    //   alamat: pelanggan.alamat,
    //   url_photo: pelanggan.url_photo,
    //   username: pelanggan.user.username,
    //   role: pelanggan.user.role,
    // })),


    // Data dari dokter
    ...dokter.flatMap((dokter) => 
      dokter.praktek.map((praktek) => ({
        id_dokter: dokter.id_dokter,
        spesialis: JSON.stringify([praktek.spesialis]),
        jadwal_waktu: JSON.stringify(praktek.jadwal_waktu),
        id_praktek: praktek.id_praktek,
        nama_klinik: dokter.nama_klinik,
        alamat: dokter.alamat,
        kontak: dokter.kontak,
        url_photo: dokter.url_photo,
        username: dokter.user?.username || null,
        role: dokter.user?.role || null,
        harga: praktek.harga,
        harga_promo: praktek.harga_promo,
        promo: praktek.promo,
      }))
    ),


    // Data dari praktek langsung
    ...praktek.map((praktek) => ({
      id_dokter: praktek.dokter.id_dokter,
      spesialis: JSON.stringify([praktek.spesialis]),
      jadwal_waktu: JSON.stringify(praktek.jadwal_waktu),
      id_praktek: praktek.id_praktek,
      nama_klinik: praktek.dokter.nama_klinik,
      alamat: praktek.dokter.alamat,
      kontak: praktek.dokter.kontak,
      url_photo: praktek.dokter.url_photo,
      username: praktek.dokter.user?.username || null,
      role: praktek.dokter.user?.role || null,
      harga: praktek.harga,
      harga_promo: praktek.harga_promo,
      promo: praktek.promo,
    })),
  ];
  
  // yang sebelumnya
  // Jika data tidak ditemukan, lemparkan error
  // if (!combinedData.length) {
  //   throw new ResponseError(400, "Data tidak ditemukan");
  // }

  //  const uniqueData = Array.from(
  //   new Map(combinedData.map((item) => [item.id_praktek, item])).values()
  // );

  // // If no data found, throw an error
  // if (!uniqueData.length) {
  //   throw new ResponseError(400, "Data tidak ditemukan");
  // }


  // Filter data untuk memastikan tidak ada dokter yang muncul dua kali
  const uniqueData = combinedData.filter(
    (item, index, self) =>
      index === self.findIndex((t) => t.id_dokter === item.id_dokter)
  );

  const fuse = new Fuse(uniqueData, {
    keys: [
      "username",
      "id_pelanggan",
      "nama_klinik",
      "kontak",
      "alamat",
      "hewan",
      "nama",
      "spesialis",
      "role",
      "jadwal_waktu",
      "id_praktek",
      "id_hewan",
      "id_pemilik",
      "url_photo",
      "id_dokter",
    ],
    threshold: 0.4, // Toleransi kesalahan ketik
  });

  // Lakukan pencarian fuzzy menggunakan Fuse.js
  const fuseResults = fuse.search(searchQuery);

  // Jika Fuse menemukan hasil, kembalikan hasilnya; jika tidak, kembalikan data Prisma
  const resultData = fuseResults.length
    ? fuseResults.map((r) => r.item)
    : uniqueData;

  return {
    data: fuseResults,
    paging: {
      total: resultData.length,
      page: 1,
      size: resultData.length,
      totalPages: 1,
    },
  };
};

export default {
  getAllService,
  getByIdService,
  editByIdService,
  searchService,
};
