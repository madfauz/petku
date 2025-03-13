import express from "express";
import transaksiController from "../controller/transaksi-controller.js";

const transaksiRoute = new express.Router();

transaksiRoute.post("/transaction", transaksiController.createTransaction);

export { transaksiRoute };
