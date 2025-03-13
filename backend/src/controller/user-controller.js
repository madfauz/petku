import userService from "../service/user-service.js";
import { prismaClient } from "../application/database.js";
import jwt from "jsonwebtoken";

const register = async (req, res, next) => {
  try {
    const result = await userService.register(req.body);
    res.status(200).json({
      data: result,
      message: "Register success",
    });
  } catch (e) {
    next(e);
  }
};

const login = async (req, res, next) => {
  // console.log(req.sessionID);
  try {
    const { token } = await userService.login(req.body);

    // menghapus cookie
    res.clearCookie("token");
    // membuat cookie
    res.cookie("token", token, {
      httpOnly: false,
      maxAge: 24 * 60 * 60 * 1000, // 1 hari
    });

    // mengakses paylod dari token yang ter decode melalui req.user
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    return res.status(200).json({
      message: `Login success`,
      role: req.user.role,
      token,
    });
  } catch (e) {
    next(e);
  }
};

const logout = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const result = await userService.logout(authorization);
    // menghapus cookie "token"
    res.clearCookie("token");

    res.status(200).json({
      data: result,
      message: "Logout success",
    });
  } catch (e) {
    console.log(e.message);
  }
  next();
};

const getUser = async (req, res, next) => {
  let result;
  try {
    const user = await prismaClient.user.findFirst({
      where: {
        email: req.user.email,
      },
    });

    if (!user) throw new Error("User not found");

    if (user.role == "pelanggan") {
      result = await prismaClient.user.findFirst({
        where: { email: req.user.email },
        include: {
          pelanggan: true,
        },
      });
    } else if (user.role == "dokter") {
      result = await prismaClient.user.findFirst({
        where: { email: req.user.email },
        include: {
          dokter: true,
        },
      });
    }

    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

export default {
  register,
  login,
  getUser,
  logout,
};
