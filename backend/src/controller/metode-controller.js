import  metodeService  from "../service/metode-service.js";

const uploadMetode = async (req, res, next) => {
    const body = req.body;

    try {
        const data = await metodeService.metodeRegist(body);
        res.status(200).json(data);
        
    } catch (error) {
        next(error);
    }
}

const getAllCntrl = async (req, res, next) => {
    try {
        const data = await metodeService.getAll();
        res.status(200).json({
            data: data,
            message: "Data berhasil ditampilkan"
        });
    } catch (error) {
        next(error);
    }
}

export default{
    uploadMetode, 
    getAllCntrl
}