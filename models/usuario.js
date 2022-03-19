const { Schema, model } = require("mongoose");

const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: [true, "El nombre es obligatorio"]
    },
    correo: {
        type: String,
        required: [true, "El correo es obligatorio"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "El password es obligatorio"],
        unique: true
    },
    imagen: {
        type: String
    },
    rol: {
        type: String,
        required: true,
        emun: ["ADMIN_ROLE", "USER_ROLE", "VENTAS_ROLE", "TEST_ROLE"]
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    },
});

// Sobrescribir method "toJSON"
UsuarioSchema.methods.toJSON = function(){
    const {__v, password, _id, ...usuario} = this.toObject();
    usuario.uid = _id;
    return usuario;
}


module.exports = model("Usuario", UsuarioSchema);