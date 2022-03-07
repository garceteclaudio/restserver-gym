const {Router} = require("express");
const {usuariosGet, usuariosPost, usuariosDelete, usuariosPut, usuariosGetQueryParams} = require("../controllers/usuarios");
const { check } = require("express-validator");


const {validarCampos} = require("../middleware/validar-campos");
const { esRoleValido, emailExiste, existeUsuarioPorID } = require("../helpers/db-validators");

const router = Router();

router.get('/', usuariosGet);

router.get('/get/', usuariosGetQueryParams);

router.put('/:id', [
    check("id", "No es un ID valido").isMongoId(),
    check("id").custom( existeUsuarioPorID ),
    check("rol").custom( esRoleValido ),
    validarCampos,
], usuariosPut);

router.post('/', [
    // check("correo", "El correo no es valido").isEmail(),
    check("nombre", "El nombre es obligatorio").not().isEmail(),
    check("password", "La password debe tener mas de 6 caracteres").isLength({min:6}),
    check("rol", "No es un rol valido").isIn("ADMIN_ROLE", "USER_ROLE"),
    // validar contra DB
    check("rol").custom( esRoleValido ),
    check("correo").custom( emailExiste ),
    validarCampos,
],  usuariosPost);

//Se recibe el ID como segmento del URL
router.delete('/:id', [
    check("id", "No es un ID valido").isMongoId(),
    check("id").custom( existeUsuarioPorID ),
    validarCampos,
], usuariosDelete);

module.exports = router;