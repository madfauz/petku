import Joi from "joi";


const jadwalValidation = Joi.object({
    id_praktek: Joi.string().max(255).optional(),
    id_metode_pembayaran: Joi.string().max(255).optional(),
    id_hewan: Joi.string().max(225).optional(),
    id_pelanggan: Joi.string().max(225).optional(),
    waktu_dipilih_pelanggan : Joi.string().optional(),
  });

  export {
    jadwalValidation
  }
  