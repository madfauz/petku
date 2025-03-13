import Joi from "joi";

const registerValidation = Joi.object({
  email: Joi.string().max(255).email().required(),
  username: Joi.string().max(255).required(),
  password: Joi.string().max(255).required(),
  confirm_password: Joi.string().max(255).required(),
  role: Joi.string().max(20).optional().default("pelanggan"),
});

const loginValidation = Joi.object({
  email: Joi.string().max(255).email().required(),
  password: Joi.string().max(255).required(),
});

export { registerValidation, loginValidation };
