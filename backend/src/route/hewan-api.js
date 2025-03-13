import express from "express";
import hewanCntlr from "../controller/hewan-controller.js";
import authMiddleware from "../middleware/auth-middleware.js";

const hewanRoute = new express.Router();
hewanRoute.post("/animal/", authMiddleware, hewanCntlr.uploadHewan);
hewanRoute.get("/animal", hewanCntlr.getAll);
hewanRoute.get("/animal/jenis/:id", hewanCntlr.getByJenis);
hewanRoute.get("/animal/:id", hewanCntlr.getbyId);
hewanRoute.patch("/animal/:id", authMiddleware, hewanCntlr.editById);
hewanRoute.delete("/animal/:id", authMiddleware, hewanCntlr.deleteById);
hewanRoute.get("/animal/user/:id", hewanCntlr.getbyIdUser);

export { hewanRoute };
