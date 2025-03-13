import hewanService from "../service/hewan-service.js";

const uploadHewan = async (req, res, next) => {
  // const params = req.params;
  const body = req.body;
  const { authorization } = req.headers;
  const params = req.params;
  try {
    const data = await hewanService.registerHewan(body, authorization, params);
    res.status(200).json({
      data: data,
      message: "Data berhasil ditambahkan",
    });
  } catch (error) {
    next(error);
  }
};

const getAll = async (req, res, next) => {
  try {
    const data = await hewanService.getAll();
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const getByJenis = async (req, res, next) => {
  try {
    // Ambil jenis_hewan dari request body
    const id = req.params;

    // Panggil service dengan jenis_hewan yang diambil dari request body
    const data = await hewanService.getByJenis(id);

    // Kirimkan hasil kembali ke client
    res.status(200).json(data);
  } catch (error) {
    // Handle error
    next(error);
  }
};

const getbyId = async (req, res, next) => {
  const params = req.params;
  try {
    const data = await hewanService.getbyId(params);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};
const getbyIdUser = async (req, res, next) => {
  const params = req.params;
  try {
    const data = await hewanService.getbyIdUser(params);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const editById = async (req, res, next) => {
  const params = req.params;
  const body = req.body;
  const { authorization } = req.headers;
  try {
    const data = await hewanService.editById(body, params, authorization);
    res.status(200).json({
      data: data,
      message: "Data berhasil diubah",
    });
  } catch (error) {
    next(error);
  }
};

const deleteById = async (req, res, next) => {
  const params = req.params;
  const { authorization } = req.headers;
  try {
    const data = await hewanService.deleteById(params, authorization);
    res.status(200).json({
      data: data,
      message: "Hewan sudah terhapus",
    });
  } catch (error) {
    next(error);
  }
};

export default {
  uploadHewan,
  getAll,
  getByJenis,
  getbyId,
  editById,
  deleteById,
  getbyIdUser,
};
