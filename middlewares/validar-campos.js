const { validationResult } = require("express-validator");
const { response, request } = require("express");


const validarCampos = ( req,res, next ) => {
   const errors = validationResult(req); //se valida la llave errores
   if (!errors.isEmpty()) {
      return res.status(400).json(errors);
   }

   next();
};

module.exports = {
   validarCampos,
};
