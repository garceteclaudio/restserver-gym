const { request, response } = require("express");
const res = require("express/lib/response");
const jwt = require("jsonwebtoken");

const Usuario = require("../models/usuario");

const validarJWT = async ( req = request, resp = response, next) => {

    const token = req.header("x-token");

    if (!token) {
        return res.status(401).json({
            msg: "No hay token en la peticion"
        })
    }

    console.log(token);

    try {
        // const payload = jwt.verify( token , process.env.SECRETORPRIVATEKEY);
        //{ uid: '62256966d125dab690f96823', iat: 1646977642, exp: 1646992042 }
        // console.log(payload);
        const {uid} = jwt.verify( token , process.env.SECRETORPRIVATEKEY);

        // leer el el usuario q corresponde al uid
        const usuario = await Usuario.findById(uid);

        console.log(`${usuario}`);

        //
        if (!usuario) {
            return resp.status(401).json({
                msg: "Usuario no existente en BD"
            })
        }

        //verificar si el uid tiene estado true
        if (!usuario.estado) {
            return resp.status(401).json({
                msg: "Token no valido - usuario con estado: false"
            })
        }

        req.usuario = usuario;

        next();
    } catch (error) {
        
        console.log(`${error}`);
        
        res.status(401).json({
            msg: "Token no valido"
        })
    }

}



module.exports = {
    validarJWT
}