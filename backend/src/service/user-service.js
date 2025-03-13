import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";
import { validate } from "../validation/validation.js";
import { v4 as uuid } from "uuid";
import jwt from "jsonwebtoken";
import {
  registerValidation,
  loginValidation,
} from "../validation/user-validation.js";
import bcrypt from "bcrypt";

const register = async (request) => {
  const user = validate(registerValidation, request);

  // cek jumlah user dengan email tertentu
  const totalUser = await prismaClient.user.count({
    where: {
      email: user.email,
    },
  });

  if (totalUser === 1) {
    throw new ResponseError(400, "Email already exists");
  } else if (user.password.length < 5) {
    throw new ResponseError(400, "Password too short");
  } else if (user.password.length > 25) {
    throw new ResponseError(400, "Password too long");
  } else if (user.confirm_password !== user.password) {
    throw new ResponseError(400, "Password not match");
  }

  // hashing password
  user.password = await bcrypt.hash(user.password, 12);

  user.confirm_password = undefined;

  const idUser = uuid().toString();

  user.id_user = idUser;
  // send record baru ke table user
  const userCreated = await prismaClient.user.create({
    data: user,
    select: {
      email: true,
    },
  });

  if (user.role === "dokter") {
    await prismaClient.dokter.create({
      data: {
        id_dokter: idUser,
      },
    });
  } else if (user.role === "pelanggan") {
    await prismaClient.pelanggan.create({
      data: {
        id_pelanggan: idUser,
      },
    });
  }

  return userCreated;
};

const login = async (request) => {
  const user = validate(loginValidation, request);

  const checkUser = await prismaClient.user.findFirst({
    where: {
      email: user.email,
    },
  });

  try {
    if (!checkUser) {
      throw new ResponseError(401, "Email not found");
    }
    const checkPassword = await bcrypt.compare(
      user.password,
      checkUser.password
    );
    if (!checkPassword) {
      throw new ResponseError(401, "Password not match");
    }

    const payload = {
      username: checkUser.username,
      email: checkUser.email,
      role: checkUser.role,
    };

    // membuat token dengan jwt
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // masukan token ke user
    await prismaClient.user.update({
      where: {
        id_user: checkUser.id_user,
      },
      data: {
        token: token,
      },
    });

    return { token };
  } catch (error) {
    throw new ResponseError(500, error.message);
  }
};

const logout = async (request) => {
  const authorization = request;
  const token = authorization.split(" ")[1];
  const user = await prismaClient.user.findFirstOrThrow({
    where: {
      token: token,
    },
  });

  if (!user) {
    throw new ResponseError(401, "User not found");
  }

  // update token user logout menjadi null
  await prismaClient.user.update({
    where: {
      id_user: user.id_user,
    },
    data: {
      token: null,
    },
  });
  return user.email;
};

export default {
  register,
  login,
  logout,
};
