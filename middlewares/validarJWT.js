const { response, request } = require('express');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');

const validarJWT = async ( req=request,res = response,next ) =>{
   const token = req.header('x-token');

   if(!token){
      res.status(401).json({
         msg:'Token inexsitente'
      })
   }

   try {
      //se valida que el token sí sea correcto, esto retorna el token completo
      const {uid} =  jwt.verify(token, process.env.SECRETORPRIVATEKEY);
      
      //obtener el usuario 
      const usuario = await Usuario.findById(uid);
      //validar que el usuario exista físicamente en la DB
      if(!usuario){
         return res.status(401).json({
            msg: "el usuario que intenta hacer la petición no existe en la db",
         });
      }
      //validar si es un usuario activo o inactivo
      if(!usuario.estado)
         return res.status(401).json({
            msg : 'el usuario que intenta hacer la petición no está activo en la DB'
         })

      //se guarda la propiedad como usuario autenticado
      req.usuario = usuario;
      req.uid = uid;

      next();
   } catch (error) {
      console.log(error);
      res.status(401).json({
         msg:'Token no válido'
      })      
   }   
}

module.exports = {
   validarJWT
}