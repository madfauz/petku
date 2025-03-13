import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";
import { validate } from "../validation/validation.js";
import { updatePelangganValidation } from "../validation/pelanggan-validation.js";
import jwt from "jsonwebtoken";
import path from "path";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";

const getbyId = async (request) => {
  const { id } = request;
  const user = await prismaClient.user.findFirst({
    where: {
      id_user: id,
    },
    include: {
      pelanggan: {
        select: {
          kontak: true,
          alamat: true,
          url_photo: true,
        },
      },
    },
  });
  if (!user) {
    throw new ResponseError(404, "User not found");
  }

  const cek = user.pelanggan.url_photo.includes("https://");
  if (!cek) {
    user.pelanggan.url_photo = process.env.DOMAIN + user.dokter.url_photo;
  }

  return user;
};

const getAll = async (request) => {
  const users = await prismaClient.pelanggan.findMany({
    where: {},
    include: {
      user: true,
      jadwal_temu: true,
      hewan: true,
    },
  });

  if (!users) {
    throw new ResponseError(404, "User not found");
  }

  const formatData = users.map((user, index) => {
    // format image
    const cek = user.url_photo.includes("https://");
    if (!cek) {
      user.url_photo = process.env.DOMAIN + user.url_photo;
    }
    return {
      index,
      ...user
    }
  });

  return formatData;
};

const editByIdService = async (request, params, authorization, files) => {
  const pelanggan = validate(updatePelangganValidation, request);
  const { id } = params;

  const token = authorization.split(" ")[1];

  const user = await prismaClient.user.findFirstOrThrow({
    where: {
      token: token,
    },
  });

  const dataCount = await prismaClient.user.count({
    where: {
      id_user: id,
    },
  });

  const dataPelanggan = await prismaClient.pelanggan.findFirst({
    where: {
      id_pelanggan: id,
    },
  });

  if (!user) {
    throw new ResponseError(404, "User not found");
  } else if (dataCount === 0) {
    throw new ResponseError(404, "Customers not found");
  } else if (user.id_user != dataPelanggan.id_pelanggan) {
    throw new ResponseError(401, "Unauthorized");
  }

  const updateData = { user: {}, pelanggan: {} };

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
    urlImage = `images/customer/${imageName}`;

    // untuk menghindari duplikat ataupun image yang sudah tidak dipakai, hapus image dengan nama sama di directory
    if (dataPelanggan.url_photo.includes("images/")) {
      const previousImageName = dataPelanggan.url_photo.split("/")[2];
      const filepath = `./src/public/images/customer/${previousImageName}`;
      fs.unlinkSync(filepath);
    }

    // simpan image ke directory
    image.mv(`./src/public/images/customer/${imageName}`, async (err) => {
      if (err) {
        throw new ResponseError(500, err.message);
      }
    });

    updateData.pelanggan.url_photo = urlImage;
  }

  if (pelanggan.username) {
    updateData.user.username = pelanggan.username;
  }
  if (pelanggan.kontak) {
    updateData.pelanggan.kontak = pelanggan.kontak;
  }
  if (pelanggan.alamat) {
    updateData.pelanggan.alamat = pelanggan.alamat;
  }

  const result = prismaClient.user.update({
    where: {
      id_user: id,
    },
    data: {
      username: updateData.user.username,
      // data: updateData,
      pelanggan: {
        update: {
          where: {
            id_pelanggan: id,
          },
          data: updateData.pelanggan,
        },
      },
    },
    include: {
      pelanggan: true,
    },
  });
  return result;
};

export default {
  getbyId,
  getAll,
  editByIdService,
};
