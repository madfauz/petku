import { prismaClient } from "../application/database.js";
import dokterService from "../service/dokter-service.js";

const getAll = async (req, res, next) => {
  try {
    const data = await dokterService.getAllService();
    res.status(200).json({
      data: data,
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
    const data = await dokterService.getByIdService(params);

    res.status(200).json({
      data,
    });
  } catch (e) {
    next(e);
  }
};

const editById = async (req, res, next) => {
  const { authorization } = req.headers;
  const params = req.params;
  try {
    const result = await dokterService.editByIdService(
      req.body,
      params,
      authorization,
      req.files
    );
    res.status(200).json({
      data: result,
      message: "Data berhasil diubah",
    });
  } catch (e) {
    next(e);
  }
};


const search = async (req, res, next) => {
  try {
    const request = {
      search_query : req.query.search_query,
      page: req.query.page,
      size: req.query.size,
    };

    const result = await dokterService.searchService(request);
    res.status(200).json({
      data: result.data,
      paging: result.paging,
    });
  } catch (error) {
    next(error);
  }
};



export default { getAll, getById, editById, search };
