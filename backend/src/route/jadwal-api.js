import express from "express";
import authMiddleware from "../middleware/auth-middleware.js";
import { deleteById, getAll, getById, getByIdUser, uploadJadwal } from "../controller/jadwal-controller.js";

const jadwalRoute = new express.Router();
jadwalRoute.post("/jadwal/", authMiddleware, uploadJadwal);
jadwalRoute.get("/jadwal/", getAll);
jadwalRoute.get("/jadwal/:id", getById);
jadwalRoute.get("/jadwal/user/:id", getByIdUser);
jadwalRoute.delete("/jadwal/:id",authMiddleware, deleteById);



export { jadwalRoute };
