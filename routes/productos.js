const { Router } = require("express");
const { check } = require("express-validator");
const {
   getProductos,
   getProductosPorID,
   crearProducto,
   putProducto,
   deleteProducto,
} = require("../controller/productos");
const { validarIDProducto } = require("../helpers/db-validators");
const { validarJWT, tieneRol, validarData } = require("../middlewares");
const { validarCampos } = require("../middlewares/validar-campos");
const router = Router();

//{{url}}/api/categorias

//obtener todas los productos, público sin login
router.get("/",getProductos );

//obtener una categoría por id
router.get(
   "/:id",
   [
      check("id", "No es un id válido").isMongoId(),
      check("id", "El producto no existe").custom(validarIDProducto),
      validarCampos,
   ],
   getProductosPorID
);

//crear producto, cualquier persona logueada
router.post(
   "/",
   [
      validarJWT, 
      validarData
   ],
   crearProducto
);

//editar categoría, cualquier persona logueada
router.put(
   "/:id",
   [
      validarJWT,
      check("nombre", "el nombre no es obligatorio").not().isEmpty(),
      check("id", "No es un id válido").isMongoId(),
      check("id", "El producto no existe").custom(validarIDProducto),
      validarCampos,
   ],
   putProducto
);

//borrar categoría, ADMIN logueado, se pone el estado en false
router.delete(
   "/:id",
   [
      validarJWT,
      tieneRol("ADMIN"),
      check("id", "No es un id válido").isMongoId(),
      check("id", "El producto no existe").custom(validarIDProducto),
      validarCampos,
   ],
   deleteProducto
);

module.exports = router;
