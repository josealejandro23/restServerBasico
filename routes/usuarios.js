const { Router } = require("express");
const { check, query } = require("express-validator");
const { getUsuarios, postUsuarios, putUsuarios, deleteUsuarios } = require("../controller/usuarios");
const { validarCampos } = require("../middlewares/validar-campos");
const { esRolValido, existeEmail, existeUsuarioID, validarQuery } = require("../helpers/db-validators");

const router = Router();
router.get("/:id?", [check(query).custom(validarQuery), validarCampos], getUsuarios);

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
   [check("id", "No es un id válido").isMongoId(), check("id").custom(existeUsuarioID), validarCampos],
   deleteUsuarios
);

module.exports = router;
