import express from "express";
import authMiddleware from "../middleware/auth-middleware.js";
import rekamController from "../controller/rekam-controller.js";

const rekamRoute = new express.Router();
rekamRoute.post("/rekam", authMiddleware, rekamController.updateRekam);
rekamRoute.post("/rekam/dokter", authMiddleware, rekamController.updateCatatanPasien);
rekamRoute.get("/rekam/dokter/:id", rekamController.getByIdDokter);
rekamRoute.get("/rekam/pelanggan/:id", rekamController.getByIdPelanggan);
rekamRoute.get("/rekam/praktek/:id", rekamController.getByIdPraktek);
rekamRoute.get("/rekam", rekamController.getAll);
rekamRoute.delete("/rekam/:id", authMiddleware, rekamController.deleteById);


export { rekamRoute };
