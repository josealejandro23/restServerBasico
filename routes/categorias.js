const { Router } = require("express");
const { check } = require("express-validator");
const { crearCategoria, getCategoriaPorID, getCategorias, putCategoria, deleteCategoria } = require("../controller/categorias");
const { validarIDCategoria } = require("../helpers/db-validators");
const { validarJWT, tieneRol } = require("../middlewares");
const { validarCampos } = require("../middlewares/validar-campos");
const router = Router();

//{{url}}/api/categorias

//obtener todas las categorías, público sin login
router.get("/",getCategorias);

//obtener una categoría por id
router.get(
   "/:id",
   [
      check("id", "No es un id válido").isMongoId(),
      check("id", "La categoría no existe").custom(validarIDCategoria),
      validarCampos,
   ],
   getCategoriaPorID
);

//crear categoría, cualquier persona logueada
router.post("/",[
   validarJWT,
   check('nombre','El nombre de la categoría es obligatorio').not().isEmpty(),
   validarCampos
],crearCategoria);

//editar categoría, cualquier persona logueada
router.put(
   "/:id",
   [
      validarJWT,
      check('nombre', 'el nombre no es obligatorio').not().isEmpty(),
      check("id", "No es un id válido").isMongoId(),
      check("id", "La categoría no existe").custom(validarIDCategoria),
      validarCampos,
   ],
   putCategoria
);

//borrar categoría, ADMIN logueado, se pone el estado en false
router.delete(
   "/:id",
   [
      validarJWT,
      tieneRol('ADMIN'),
      check("id", "No es un id válido").isMongoId(),
      check("id", "La categoría no existe").custom(validarIDCategoria),
      validarCampos,
   ],
   deleteCategoria
);

module.exports = router;