const {Router} = require("express");
const {usuariosGet, usuariosPost, usuariosDelete, usuariosPut, usuariosGetQueryParams} = require("../controllers/usuarios");

const router = Router();

router.get('/', usuariosGet);

router.get('/get/', usuariosGetQueryParams);

router.put('/:id', usuariosPut);

router.post('/',  usuariosPost);

router.delete('/', usuariosDelete);

module.exports = router;