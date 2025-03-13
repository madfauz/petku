import Joi from "joi";
const editData = Joi.object({
  username: Joi.string().max(255).optional(),
  kontak: Joi.string().max(255).optional(),
  pengalaman: Joi.number().max(255).optional(),
  alamat: Joi.string().max(255).optional(),
  nama_klinik: Joi.string().max(255).optional(),
  url_photo: Joi.string().max(255).optional(),
});

export { editData };
