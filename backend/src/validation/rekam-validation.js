import Joi from "joi";

const rekamValidation = Joi.object({
    id_temu: Joi.string().max(225).required(),
    komentar: Joi.string().max(225).default(null).optional(),
    rating: Joi.number().integer().min(1).max(5).default(null).optional(),
    tanggal_komentar: Joi.string().default(null).optional()
});
const CatatanPasien = Joi.object({
    id_temu: Joi.string().max(225).required(),
    catatan_pasien: Joi.string().default(null).optional(),
});

export { rekamValidation, CatatanPasien};