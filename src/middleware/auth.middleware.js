import jwt from "jsonwebtoken"
import { codigo_secreto } from "./../config/config"

export const verificaAuth = async (req, res, next) => {
    let token = null;
    if(req.headers.authorization){
        // Bearer abc.def.xyz
        token = req.headers.authorization.split(" ")[1];
    }

    if(!token){
        res.status(403).send({
            mensaje: 'No se proporcionó el token de seguridad',
            error: true
        })
    }

    // Verificar si el token es correcto
    jwt.verify(token, codigo_secreto, (error, decoded) =>{
        if(error){
            res.status(500).send({
                mensaje: "Error de Autenticación",
                error: true
            })
        }

        next();
    })

}