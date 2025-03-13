import express from "express";
import pelangganController from "../controller/pelanggan-controller.js";
import authMiddleware from "../middleware/auth-middleware.js";

const pelangganRoute = new express.Router();
pelangganRoute.get("/customers/:id", pelangganController.getbyId);
pelangganRoute.get("/customers/", pelangganController.getAll);
pelangganRoute.patch(
  "/customers/:id",
  authMiddleware,
  pelangganController.editById
);

export { pelangganRoute };
