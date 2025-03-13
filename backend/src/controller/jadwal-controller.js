import jadwalService  from "../service/jadwal-temu.js";

const uploadJadwal = async (req, res, next) => {

  const { authorization } = req.headers
  const body = req.body
    try {
      // Ambil jenis_hewan dari request body
      // Panggil service dengan jenis_hewan yang diambil dari request body
      const data = await jadwalService.createJadwalTemu( body, authorization);
  
      // Kirimkan hasil kembali ke client
      res.status(200).json({
        data: data,
        message: "Data berhasil ditambahkan",
      });
    } catch (error) {
      // Handle error
      next(error);
    }
  };

  const getAll = async (req, res, next) => {
    try {
      const data = await jadwalService.getAll();
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  };

  const getById = async (req, res, next) => {
    const params = req.params;
    try {
      const data = await jadwalService.getById(params);
      res.status(200).json({
        data: data
      });
    } catch (error) {
      next(error);
    }
  };
  const getByIdUser = async (req, res, next) => {
    const params = req.params;
    try {
      const data = await jadwalService.getByIdUser(params);
      res.status(200).json({
        data: data
      });
    } catch (error) {
      next(error);
    }
  };

  const deleteById = async (req, res, next) => {
    const params = req.params;
    const { authorization } = req.headers
    try {
      const data = await jadwalService.deleteById(params, authorization);
      res.status(200).json({
        data: data,
        message: "Jadwal sudah terhapus",
      });
    } catch (error) {
      next(error);
    }
  };

  export {
    uploadJadwal,
    getAll,
    getById,
    getByIdUser,
    deleteById
  }
  