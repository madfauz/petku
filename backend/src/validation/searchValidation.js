import Joi from "joi";

const searchDokterValidation = Joi.object({
    username: Joi.string().max(100).optional(),
    kontak: Joi.string().max(100).optional(),
    pengalaman: Joi.number().max(100).positive().optional(),
    alamat: Joi.string().max(100).optional(),
    nama_klinik: Joi.string().max(100).optional(),
})

export{ 
    searchDokterValidation 
}