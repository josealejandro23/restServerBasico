const { Router } = require("express");
const { check, query } = require("express-validator");
const router = Router();

const {login, googlesignin} = require('../controller/login');
const { validarCampos } = require("../middlewares/validar-campos");

router.post(
   "/",
   [
      check("correo", "El correo es obligatorio").isEmail(),
      check("password", "La contraseña es obligatoria").not().isEmpty(),
      validarCampos,
   ],
   login
);

router.post(
   "/google",
   [
      check("id_token", "El id_token no ha sido recibido").not().isEmpty(),
      validarCampos,
   ],
   googlesignin
);


module.exports = router;