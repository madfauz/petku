import express from "express";
import dokterController from "../controller/dokter-controller.js";
import authMiddleware from "../middleware/auth-middleware.js";

const dokterRoute = new express.Router();

dokterRoute.get("/doctors/search", dokterController.search);
dokterRoute.get("/doctors", dokterController.getAll);
dokterRoute.get("/doctors/:id", dokterController.getById);
dokterRoute.patch("/doctors/:id", authMiddleware, dokterController.editById);

export { dokterRoute };
