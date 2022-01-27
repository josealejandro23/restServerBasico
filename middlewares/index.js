const validarCampos = require("../middlewares/validar-campos");
const validarJWT = require("../middlewares/validarJWT");
const validaRoles = require("../middlewares/validar-roles");
const validarData = require("./validarInfoProducto");

//--Al exportar usando el operador spread, indico que se exportan todos los métodos 
//-- de cada constante
module.exports = {
   ...validarCampos,
   ...validarJWT,
   ...validaRoles,
   ...validarData,
};
