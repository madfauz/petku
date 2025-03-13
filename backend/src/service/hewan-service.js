import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";
import { validate } from "../validation/validation.js";
import { v4 as uuid } from "uuid";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import {
  hewanValidation,
  getValudation,
  updateValidation,
} from "../validation/hewan-validation.js";

const registerHewan = async (request, authorization, params) => {
  const hewan = validate(hewanValidation, request);

  const { id } = params;
  const token = authorization.split(" ")[1];

  const userHewan = await prismaClient.user.findFirstOrThrow({
    where: {
      token: token,
    },
  });

  const dataCount = await prismaClient.hewan.count({
    where: {
      id_hewan: hewan.id_hewan,
    },
  });

  if (dataCount === 1) {
    throw new ResponseError(400, "id animal already exists");
  } else if (!userHewan) {
    throw new ResponseError(404, "token invalid");
  } else if (!userHewan.id_user) {
    throw new ResponseError(401, "unauthorized");
  }

  const idPemilik = userHewan.id_user
  const idHewan = uuid().toString();
  hewan.id_hewan = idHewan;

  return prismaClient.hewan.create({
    data: {
      id_hewan: hewan.id_hewan,
      id_pemilik: idPemilik,
      nama: hewan.nama,
      jenis_hewan: hewan.jenis_hewan,
    },
    // select: { 
    //     id_hewan: true,
    //     id_pemilik: true,
    //     nama: true,
    //     jenis_hewan: true
    // }
    include: {
      pelanggan: true,
    },
  });
};

const getAll = async (request) => {
  const hewan1 = await prismaClient.hewan.findMany({
    where: {},
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

  const users = await prismaClient.user.findMany({
    where: {
      role: "pelanggan",
    },
  });

  const hewan = hewan1.map((hewan) => {
    return {
      ...hewan,
      nama_pelanggan:
        users.find((user) => user.id_user === hewan.id_pemilik) || null,
    };
  });

const result = hewan1.map((hewanItem, index) => {
  const nama_pelanggan = users.find((user) => user.id_user === hewanItem.id_pemilik) || null;

  return {
    index,
    ...hewanItem,
    nama_pelanggan,
  };
});

  return result;
};

  // return {
  //   ...hewan1,
  //   ...hewan,
  // };
// };

const getByJenis = async (request) => {
  // request = validate(getValudation, request)
  const { id } = request;

  const hewan = await prismaClient.hewan.findMany({
    where: {
      jenis_hewan: id,
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

  const users = await prismaClient.user.findMany({
    where: {
      role: "pelanggan",
    },
  });

  const result = hewan.map((hewan) => {
    return {
      ...hewan,
      user: users.find((user) => user.id_user === hewan.id_pemilik) || null,
    };
  });

  if (!result) {
    throw new ResponseError(404, "customer and animal not found");
  }

  return result;
};

const getbyId = async (request) => {
  const { id } = request;

  const hewan2 = await prismaClient.hewan.findFirst({
    where: {
      id_hewan: id,
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

  const user = await prismaClient.user.findFirst({
    where: {
      OR: [{ id_user: hewan2.id_pemilik }],
    },
    // select:{
    //   id_user: true,
    //   email: true,
    //   username: true,
    //   token: true,
    //   role: true
    // }
  });

  const result = {
    ...hewan2,
    user: user,
  };
  return result;
};

const getbyIdUser = async (request) => {
  const { id } = request;

  const fadli = await prismaClient.pelanggan.findFirst({
    where: {
      id_pelanggan: id,
    },
    include: {
      hewan: {
        select: {
          id_hewan: true,
          id_pemilik: true,
          nama: true,
          jenis_hewan: true,
        },
      },
    },
  });

  const user = await prismaClient.user.findFirst({
    where: {
      id_user: fadli.id_pelanggan,
    },
  });

  const result = {
    ...fadli,
    user: user,
  };
  return result;
};

const editById = async (request, params, authorization) => {
  const hewan = validate(updateValidation, request);
  const { id } = params;

  const token = authorization.split(" ")[1];

  const userHewan = await prismaClient.user.findFirstOrThrow({
    where: {
      token: token,
    },
  });

  const dataHewan = await prismaClient.hewan.findFirst({
    where: {
      id_hewan: id,
    },
  });

  const dataCount = await prismaClient.hewan.count({
    where: {
      id_hewan: id,
      id_pemilik: hewan.id_pemilik,
    },
  });
  if (!userHewan) {
    throw new ResponseError(404, "token invalid");
  } else if (dataCount === 0) {
    throw new ResponseError(404, "animal or customer not found");
  } else if (userHewan.id_user != dataHewan.id_pemilik) {
    throw new ResponseError(401, "Unauthorized");
  }
  // || dataHewan.id_hewan != id
  const hewan2 = await prismaClient.hewan.update({
    where: {
      id_hewan: id,
    },
    data: {
      nama: hewan.nama,
      jenis_hewan: hewan.jenis_hewan,
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

  const user = await prismaClient.user.findFirst({
    where: {
      id_user: hewan2.id_pemilik,
    },
  });

  const result = {
    ...hewan2,
    user: user,
  };

  return result;
};


const deleteById = async (params, authorization) => {
  const { id } = params;
  const token = authorization.split(" ")[1];

  // Verify user token
  const userHewan = await prismaClient.user.findFirstOrThrow({
    where: { token: token },
  });

  // Find Hewan data by ID
  const dataHewan = await prismaClient.hewan.findFirst({
    where: { id_hewan: id }, 
    include: { jadwal_temu: true }
  });

  // Validate if Hewan is not found
  if (!dataHewan) {
    throw new ResponseError(404, "Hewan tidak ditemukan");
  }

  // Validate if the user is not the owner of the Hewan
  if (userHewan.id_user !== dataHewan.id_pemilik) {
    throw new ResponseError(401, "Tidak diizinkan");
  }

  // Use a transaction to delete related data and the hewan record
  const result = await prismaClient.$transaction(async (prisma) => {
    // Delete related jadwal_temu records for this hewan
    await prisma.jadwal_temu.deleteMany({
      where: {
        id_hewan: id,
      },
    });

    // Delete hewan record
    return await prisma.hewan.delete({
      where: {
        id_hewan: id,
      },
    });
  });

  return result;
};




export default {
  registerHewan,
  getAll,
  getByJenis,
  getbyId,
  editById,
  deleteById,
  getbyIdUser,
};
