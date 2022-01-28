const { Router } = require("express");
const { check } = require("express-validator");
const { cargarArchivo, actualizarImagen, mostrarImagen } = require("../controller/upload");
const { validarColeccionesPermitidas } = require("../helpers");
const { validarJWT, validarCampos, validarArchivoSubir } = require("../middlewares");
const router = Router();


router.get(
   "/:coleccion/:id",[
      check("id", "No es un id válido").isMongoId(),
      check("coleccion").custom((c) => validarColeccionesPermitidas(c, ["usuarios", "productos"])),
      validarCampos,      
   ],
   mostrarImagen
);

router.post('/',[validarJWT,validarArchivoSubir],cargarArchivo)

router.put('/:coleccion/:id', [
   check('id','No es un id válido').isMongoId(),
   check('coleccion').custom( c => validarColeccionesPermitidas(c, ['usuarios','productos'])),
   validarCampos,
   validarArchivoSubir
], actualizarImagen);

module.exports = router;
