import Joi from "joi";

const updatePelangganValidation = Joi.object({
  username: Joi.string().max(225).optional(),
  kontak: Joi.string().max(225).optional(),
  alamat: Joi.string().max(225).optional(),
  url_photo: Joi.string().max(225).optional(),
});

export { updatePelangganValidation };
