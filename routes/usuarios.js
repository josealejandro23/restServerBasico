const { Router } = require("express");
const { check, query } = require("express-validator");
const { getUsuarios, postUsuarios, putUsuarios, deleteUsuarios } = require("../controller/usuarios");
const { esRolValido, existeEmail, existeUsuarioID, validarLimite } = require("../helpers/db-validators");

const { validarCampos, validarJWT, validarAdminRol, tieneRol } = require("../middlewares/index");

const router = Router();
router.get("/:id?", [
   query(["limite", "desde"]).custom(validarLimite), validarCampos
], getUsuarios);

router.post(
   "/",
   [
      check("correo", "El correo no es válido").isEmail(), //agrega el error al request si es que sucede
      check("nombre", "El nombre es obligatorio").not().isEmpty(),
      check("password", "El password es obligatorio y mayor a 6 letras").isLength(6),
      // check("rol", "No se ha dado un rol válido").isIn(["ADMIN", "USER"]),
      //se valida que el rol exista en la base de datos, validación personalizada
      //check("rol").custom(rol => esRolValido(rol)) es equivalente a la siguiente línea check("rol").custom(esRolValido),
      check("correo").custom(existeEmail),
      check("rol").custom(esRolValido),
      validarCampos,
   ],
   postUsuarios
);

router.put(
   "/:id?",
   [
      check("id", "No es un id válido").isMongoId(),
      check("id").custom(existeUsuarioID),
      check("rol").custom(esRolValido),
      validarCampos,
   ],
   putUsuarios
);

router.delete(
   "/:id",
   [
      validarJWT,
      // validarAdminRol,  //este middleware fuerza a que el user sea admin
      tieneRol("ADMIN", "VENTAS"),
      check("id", "No es un id válido").isMongoId(),
      check("id").custom(existeUsuarioID),
      validarCampos,
   ],
   deleteUsuarios
);

module.exports = router;
