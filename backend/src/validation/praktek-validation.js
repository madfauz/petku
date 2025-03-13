import Joi from "joi";

const addData = Joi.object({
  harga: Joi.number().required(),
  harga_promo: Joi.number().optional(),
  spesialis: Joi.string().max(255).required(),
  jadwal_waktu: Joi.array().max(255).required(),
  promo: Joi.boolean().optional(),
});
const editData = Joi.object({
  id_praktek: Joi.string().max(255).optional(),
  harga: Joi.number().optional(),
  harga_promo: Joi.number().optional(),
  spesialis: Joi.string().max(255).optional(),
  jadwal_waktu: Joi.array().max(255).optional(),
  promo: Joi.boolean().optional().default(false),
});

export { addData, editData };
