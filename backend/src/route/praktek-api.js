import express from "express";
import praktekController from "../controller/praktek-controller.js";
import authMiddleware from "../middleware/auth-middleware.js";

const praktekRoute = new express.Router();

praktekRoute.get("/practices", praktekController.getAll);
praktekRoute.get("/practices/:id", praktekController.getById);
praktekRoute.post("/practices", authMiddleware, praktekController.addById);
praktekRoute.patch(
  "/practices/:id",
  authMiddleware,
  praktekController.editById
);
praktekRoute.delete(
  "/practices/:id",
  authMiddleware,
  praktekController.deleteById
);

export { praktekRoute };
