const {response, request} = require("express");

const usuariosGet =  (req, res = response) => {
  res.status(201).json({
      name: "Claudio",
      student: true,
      age: 31
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

const usuariosPost =  (req, res = response) => {

  const body = req.body;

  res.json({
      msg: "Post - controlador",
      body
  })
}

const usuariosDelete =  (req, res = response) => {
  res.json({
      msg: "Delete - controlador",
  })
}

const usuariosPut =  (req, res = response) => {

  const id = req.params.id;
  // const {id} = req.params;

  res.json({
      msg: "Put - controlador",
      id
  })
}

module.exports = {
    usuariosGet,
    usuariosGetQueryParams,
    usuariosPost,
    usuariosDelete,
    usuariosPut
}