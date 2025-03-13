import Joi from "joi";

const hewanValidation = Joi.object({
  //   id_hewan: Joi.string().max(255).required(),
  id_pemilik: Joi.string().max(255).optional(),
  nama: Joi.string().max(255).required(),
  jenis_hewan: Joi.string().max(255).required(),
});

const getValudation = Joi.string().max(255).required();

const updateValidation = Joi.object({
  nama: Joi.string().max(255).required(),
  jenis_hewan: Joi.string().max(255).required(),
});

export { hewanValidation, updateValidation, getValudation };
