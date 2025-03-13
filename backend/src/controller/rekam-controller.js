import  rekamService  from "../service/rekam-service.js";

const updateRekam = async (req, res, next) => {
  const { authorization } = req.headers;
  const body = req.body;
  // const params = req.params;
  try {
    const data = await rekamService.updateRekam(body, authorization);
    res.status(200).json({
      data: data,
      message: "Data berhasil ditambahkan",
    });
  } catch (error) {
    next(error)
  }
};

const updateCatatanPasien = async (req, res, next) => {
  const { authorization } = req.headers;
  const body = req.body;
  // const params = req.params;
  try {
    const data = await rekamService.updateCatatanPasien(body, authorization);
    res.status(200).json({
      data: data,
      message: "Data berhasil ditambahkan",
    });
  } catch (error) {
    next(error)
  }
};

const getByIdDokter = async (req, res, next) => {
  try {
    const params = req.params;
    const data = await rekamService.getByDokter(params);
    res.status(200).json({
      data: data
    });
  } catch (error) {
    next(error)
  }
}
const getByIdPelanggan = async (req, res, next) => {
  try {
    const params = req.params;
    const data = await rekamService.getByIdPelanggan(params);
    res.status(200).json({
      data: data
    });
  } catch (error) {
    next(error)
  }
}
const getByIdPraktek = async (req, res, next) => {
  try {
    const params = req.params;
    const data = await rekamService.getByIdPraktek(params);
    res.status(200).json({
      data: data
    });
  } catch (error) {
    next(error)
  }
}

const getAll = async (req, res, next) => {
  try {
    const data = await rekamService.getAll();
    res.status(200).json({
      data: data,
      message: "Data berhasil ditampilkan"

  });
  } catch (error) {
    next(error)
  }
}

const deleteById = async (req, res, next) => {
  const params = req.params;
  const { authorization } = req.headers;
  try {
    const data = await rekamService.deleteById(params, authorization);
    res.status(200).json({
      data: data,
      message: "Data sudah terhapus"
    });
  } catch (error) {
    next(error)
  }
}


export default{ 
  updateRekam,
  updateCatatanPasien,
  getByIdDokter,
  getByIdPelanggan,
  getByIdPraktek,
  getAll, 
  deleteById
}