const {response} = require("express");
const bcryptjs = require("bcryptjs");

const Usuario = require("../models/usuario");

const { generarJWT } = require("../helpers/generar-jwt");

const login =  async(req, res = response) => {

    const {correo, password} = req.body;

    try {
        // VERIFICAR SI EL EMAIL EXISTE
        const usuario = await Usuario.findOne({correo});
        if (!usuario) {
            return res.status(400).json({
                msg: "Usuario / Password no son correctos - correo"
            })
        }

        // SI EL USER ESTA ACTIVO
        if (usuario.estado === false) {
            return res.status(400).json({
                msg: "Usuario / Password no son correctos - estado === false"
            })
        }
        // VERIFICAR LA PASSWORD
        const validPassword = bcryptjs.compareSync(password, usuario.password);
        if (!validPassword) {
            return res.status(400).json({
                msg: "Usuario / Password no son correctos - password"
            })  
        }

        // GENERAR EL JWT
        const token = await generarJWT( usuario.id );

        res.json({
            usuario,
            token
        })      
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: "Hable con el administrador"
        })
    }



}

module.exports = {
    login
}