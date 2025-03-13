import { prismaClient } from "../application/database.js";
import praktekService from "../service/praktek-service.js";
import jwt from "jsonwebtoken";

const getAll = async (req, res, next) => {
  try {
    const data = await praktekService.getAllService();
    res.status(200).json({
      data: data,
      message: "Data berhasil ditampilkan"
    });
  } catch (e) {
    next(e);
  }
};

const getById = async (req, res, next) => {
  try {
    // mengambil params dengan nama id dari url
    const params = req.params;
    // mengirim params ke service untuk di proses
    const data = await praktekService.getByIdService(params);

    res.status(200).json({
      data,
    });
  } catch (e) {
    next(e);
  }
};

const addById = async (req, res, next) => {
  // ambil bearer token dari headers
  const { authorization } = req.headers;
  // const params = req.params;
  try {
    const result = await praktekService.addByIdService(req.body, authorization);
    res.status(200).json({
      data: result,
      message: "Data berhasil ditambahkan",
    });
  } catch (e) {
    next(e);
  }
};

const editById = async (req, res, next) => {
  const { authorization } = req.headers;
  const params = req.params;
  try {
    // ambil bearer token dari headers
    // ambil id dari params
    const result = await praktekService.editByIdService(req.body, params, authorization);
    res.status(200).json({
      data: result,
      message: "Data berhasil diubah",
    });
  } catch (e) {
    next(e);
  }
};

const deleteById = async (req, res, next) => {
  // ambil bearer token dari headers
  const { authorization } = req.headers;
  // ambil id dari params
  const params = req.params;
  try {
    const result = await praktekService.deleteByIdService(
      params,
      authorization
    );
    res.status(200).json({
      data: result,
      message: "Data berhasil dihapus",
    });
  } catch (e) {
    next(e);
  }
};

export default { getAll, getById, addById, editById, deleteById };
