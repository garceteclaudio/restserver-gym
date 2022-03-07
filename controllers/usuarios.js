const {response, request} = require("express");
const bcrypt = require("bcryptjs");

const Usuario = require("../models/usuario");


const usuariosGet =  async(req = request, res = response) => {

  const { limite = 5, desde = 0 } = req.query;
  const query = { estado: true };

  // const usuarios = await Usuario.find(query)
  //   .skip(Number(desde))
  //   .limit(Number(limite));
  // const total = await Usuario.countDocuments(query);

  // Se ejecutan al mismo tiempo
  const [total, usuarios] = await Promise.all([
    Usuario.countDocuments(query),
    Usuario.find(query)
    .skip(Number(desde))
    .limit(Number(limite))
  ]);

  res.status(201).json({
    total,
    usuarios
  })
}

const usuariosGetQueryParams =  (req = request, res = response) => {

  // const query = req.query;

  // Desestructuracion
  // http://localhost:8080/api/usuarios?q=hola&apellido=Garcetex  
  const {q, apellido} = req.query;


  res.status(201).json({
      name: "Claudio",
      student: true,
      q,
      apellido
  })

}

const usuariosPost =  async (req, res = response) => {

  const {nombre, correo, password, rol} = req.body;
  const usuario = new Usuario({nombre, correo, password, rol});

  // Verificar si el correo existe cambio a constant emailExiste
  // const existeEmail = await Usuario.findOne({correo});
  // if(existeEmail){
  //   return res.status(400).json({
  //     msg: "El correo ya esta registrado"
  //   });
  // }

  // Encriptar la password
  const salt = bcrypt.genSaltSync(10);
  usuario.password = bcrypt.hashSync( password, salt);

  // Guardar en BD

  await usuario.save();

  res.json({
      msg: "Post - controlador",
      usuario
  })
}

const usuariosDelete = async (req, res = response) => {

  const {id} = req.params;

  // ya se hizo la validacion de q existe en carpeta routes
  //Fisicamente lo borramos
  // const usuario = await Usuario.findByIdAndDelete(id);
  const usuario = await Usuario.findByIdAndUpdate(id, { estado: false });

  res.json({
      msg: "Delete",
      usuario
  })
}

const usuariosPut =  async (req, res = response) => {

  // const id = req.params.id;
  const {id} = req.params;
  const {_id ,password, google, ...resto} = req.body;

  // TODO validar contra BD

  if (password) {
    // Encriptar la password
    const salt = bcrypt.genSaltSync(10);
    resto.password = bcrypt.hashSync( password, salt);   
  }

  const usuario = await Usuario.findByIdAndUpdate(id, resto);

  res.json({
      msg: "Put - controlador",
      usuario
  })
}

module.exports = {
    usuariosGet,
    usuariosGetQueryParams,
    usuariosPost,
    usuariosDelete,
    usuariosPut
}