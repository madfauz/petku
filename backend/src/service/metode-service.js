import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";
import { metodeValidation } from "../validation/metode-validation.js";
import { validate } from "../validation/validation.js";
import { v4 as uuid } from "uuid";

const metodeRegist = async (request) =>{
    const metode = validate(metodeValidation, request);

    const idMetode = uuid().toString();
    metode.id_metode_pembayaran = idMetode

    const dataCount = await prismaClient.metode_pembayaran.count({
        where: {
          id_metode_pembayaran: metode.id_metode_pembayaran,
        },
      });
      if (dataCount === 1) {
        throw new ResponseError(400, "Sudah dibayar");
      }
    return await prismaClient.metode_pembayaran.create({
        data: {
            id_metode_pembayaran: metode.id_metode_pembayaran,
            nama: metode.nama,
            pajak: metode.pajak
        }
    })
}

const getAll = async (request) => {
    return await prismaClient.metode_pembayaran.findMany({
        where: {},
    include:{
        Jadwal_temu: true
    }
    });
}

export default{
    metodeRegist,
    getAll
}