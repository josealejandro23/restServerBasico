const { response } = require("express");
const usuario = require("../models/usuario");

const validarAdminRol = (req,res = response,next) =>{
   //se valida que efectivamente venga un objeto usuario que debió crearse en la validación del jwt
   if(!req.usuario){
      return res.status(500).json({
         msg:'Se quiere verificar el rol sin validar el token primero'
      })
   }
   const {rol, nombre} = req.usuario;

   if(rol !== 'ADMIN'){
      return res.status(401).json({
         msg : 'Esta acción solo está permitida para administradores'
      })
   }

   next();
}

const tieneRol = ( ...roles ) =>{
   return(req,res = response,next)=>{
      //se valida que efectivamente venga un objeto usuario que debió crearse en la validación del jwt
      if (!req.usuario) {
         return res.status(500).json({
            msg: "Se quiere verificar el rol sin validar el token primero",
         });
      }
      //se valida que el rol del usuario si esté entre los permitidos
      if(!roles.includes(req.usuario.rol)){
         return res.status(401).json({
            msg: "el servicio requiere uno de estos roles: " + roles,
         });
      }
      next();
   }
}

module.exports = {
   validarAdminRol,
   tieneRol,
};