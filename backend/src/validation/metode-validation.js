import Joi from "joi";

const metodeValidation = Joi.object({
    id_metode_pembayaran: Joi.string().max(225).optional(),
    nama: Joi.string().max(225).required(),
    pajak: Joi.number().required()
})

export {
    metodeValidation
}