const { Router } = require("express");
const { check, query } = require("express-validator");
const router = Router();

const {login} = require('../controller/login');
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

module.exports = router;