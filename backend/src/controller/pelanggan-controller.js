import pelangganService from "../service/pelanggan-service.js";

const getbyId = async (req, res, next) => {
  try {
    const params = req.params;
    const data = await pelangganService.getbyId(params);

    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const getAll = async (req, res, next) => {
  try {
    const data = await pelangganService.getAll();
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const editById = async (req, res, next) => {
  const params = req.params;
  const body = req.body;
  const { authorization } = req.headers;
  const files = req.files;

  try {
    const data = await pelangganService.editByIdService(
      body,
      params,
      authorization,
      files
    );
    res.status(200).json({
      data: data,
      message: "Data berhasil diubah",
    });
  } catch (error) {
    next(error);
  }
};

// JWT_SECRET
// const editById = async (req, res, next) => {
//   const params = req.params;
//   const body = req.body;
//   const authorization = req.headers.authorization;
//   try {
//     const data = await pelangganService.editByIdService(body, params, authorization);
//     res.status(200).json({
//       data: data,
//       message: "Data berhasil diubah"
//     });
//   } catch (error) {
//     next(error);
//   }
// };

export default {
  getbyId,
  getAll,
  editById,
};
