const { response } = require("express");
const bcryptjs = require('bcryptjs');

const Usuario = require("../models/usuario");
const { generarJWT } = require("../helpers/generarJWT");

const login = async (req, res = response) => {
   const { correo, password } = req.body;
   try {
      //verificar si el correo existe
      const usuario = await Usuario.findOne({ correo: correo });
      if (!usuario) {
         res.status(400).json({
            msg: "El usuario/password no son correctos - correo",
         });
      }
      //verificar si el usuario está activo en la DB
      if (!usuario.estado) {
         res.status(400).json({
            msg: "El usuario/password no son correctos - estado: false",
         });
      }
      //verificar el password, esta función valida si el password recibido es igual al de la db
      const bValida = bcryptjs.compareSync(password,usuario.password);
      if(!bValida){
         res.status(400).json({
            msg: "El usuario/password no son correctos - password",
         });
      }
      //crear JWT
      const token = await generarJWT(usuario.id);
      res.json({
         usuario,
         token
      });
   } catch (e) {
      console.log(e);
      return res.status(500).json({
         msg: "Hubo un error en el login",
      });
   }
};

module.exports = {
   login,
};
