import express from "express";
import { userRoute } from "../route/user-api.js";
import { dokterRoute } from "../route/dokter-api.js";
import { pelangganRoute } from "../route/pelanggan-api.js";
import { praktekRoute } from "../route/praktek-api.js";
import { hewanRoute } from "../route/hewan-api.js";
import { transaksiRoute } from "../route/transaksi-api.js";
import { errorMiddleware } from "../middleware/error-middleware.js";
import bodyParser from "body-parser";
import FileUpload from "express-fileupload";
import path from "path";
import cookieParser from "cookie-parser";
import cors from "cors";
import { rekamRoute } from "../route/rekam-api.js";
import { jadwalRoute } from "../route/jadwal-api.js";
import { metodeRoute } from "../route/metode-api.js";

export const web = express();

web.use(cors({ origin: "http://localhost:3000", credentials: true }));
web.use(express.json());
web.use(cookieParser());
web.use(FileUpload());
web.use(bodyParser.json());
web.use(bodyParser.urlencoded({ extended: true }));

// membuat folder public menjadi static
const __dirname = path.resolve();
web.use(express.static(path.join(__dirname, "./src/public")));
// app.use(express.static(path.join(__dirname, "./client/build")));
// app.get("*", function (_, res) {
//   res.sendFile(
//     path.join(__dirname, "./client/build/index.html"),
//     function (err) {
//       res.status(500).send(err);
//     }
//   );
// });

web.use(userRoute);
web.use(dokterRoute);
web.use(pelangganRoute);
web.use(praktekRoute);
web.use(hewanRoute);
web.use(metodeRoute);
web.use(jadwalRoute);
web.use(rekamRoute);
web.use(transaksiRoute);

web.use(errorMiddleware);
