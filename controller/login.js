const { response } = require("express");
const bcryptjs = require('bcryptjs');

const Usuario = require("../models/usuario");
const { generarJWT } = require("../helpers/generarJWT");
const { googleVerify } = require("../helpers/google-verify");


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

const googlesignin = async (req, res = response ) => {
   try {
      const { id_token } = req.body;
      const { nombre, correo, img } = await googleVerify(id_token);

      let usuario = await Usuario.findOne({ correo });
      if (!usuario) {
         //se crea el usuario si no existe
         const data = {
            nombre,
            correo,
            password: "cualqierCosa",
            img,
            google: true,
         };

         usuario = new Usuario(data);
         await usuario.save();
      }

      //si es usuario de google y tiene estado en false se niega el login
      if (!usuario.estado) {
         return res.status(401).json({
            msg: "Usuario bloqueado",
         });
      }

      //crear JWT
      const token = await generarJWT(usuario.id);

      res.json({
         usuario,
         token
      });
   } catch (e) {
      res.status(400).json({
         ok:false,
         msg:'Error al verificar el token google: ' + e
      })
   }
}

module.exports = {
   login,
   googlesignin,
};
