const { Router } = require("express");

//Gran conjunto de validaciones para utilizar antes de disparar la ruta del controlador
//Si falla algo del mdw entonces no se ejecuta la ruta
const { check } = require("express-validator");

// const { validarCampos } = require("../middleware/validar-campos");
// const { validarJWT } = require("../middleware/validar-jwt");
// const { esAdminRole, tieneRole } = require("../middleware/validar-roles");
const {
    validarCampos,
    validarJWT,
    esAdminRole,
    tieneRole
 } = require("../middleware");

const { esRoleValido, emailExiste, existeUsuarioPorID } = require("../helpers/db-validators");

const {usuariosGet, 
    usuariosPost, 
    usuariosDelete,
    usuariosPut,
    } = require("../controllers/usuarios");


const router = Router();

router.get('/', usuariosGet);

router.put('/:id', [
    check("id", "No es un ID valido").isMongoId(),
    check("id").custom( existeUsuarioPorID ),
    check("rol").custom( esRoleValido ),
    validarCampos,
], usuariosPut);

router.post('/', [
    check("correo", "El correo no es valido").isEmail(),
    check("nombre", "El nombre es obligatorio").not().isEmail(),
    check("password", "La password debe tener mas de 6 caracteres").isLength({min:6}),
    check("rol", "No es un rol valido").isIn(["USER_ROLE", "ADMIN_ROLE", "VENTAS_ROLE"]),
    // validar contra DB
    check("rol").custom( esRoleValido ),
    check("correo").custom( emailExiste ),
    validarCampos,
],  usuariosPost);

//Se recibe el ID (Mongo) como segmento del URL
router.delete('/:id', [  
    validarJWT,
    esAdminRole,
    tieneRole("ADMIN_ROLE"),
    check("id", "No es un ID valido").isMongoId(),
    check("id").custom( existeUsuarioPorID ),
    validarCampos,
], usuariosDelete);

module.exports = router;