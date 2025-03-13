import express from "express";
import metodeCntrl from "../controller/metode-controller.js";

const metodeRoute = new express.Router();
metodeRoute.post("/payment",metodeCntrl. uploadMetode)
metodeRoute.get("/payment", metodeCntrl.getAllCntrl)

export { metodeRoute }