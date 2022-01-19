//--como en este punto no se sabe de qué tipo es res o req entonces se importa el paquete de express para que vsc sepa el tipo de dato
const { response, request } = require("express");
const bcryptjs = require("bcryptjs");

const Usuario = require('../models/usuario');

const getUsuarios = async (req = request, res = response) => {
   try {
      //se leen los querys que vienen en la url
      const { limite = 5, desde = 0 } = req.query; //leer querys de una petición
      if (isNaN(limite)) res.json({ error: "El límite debe ser un número" });
      if (isNaN(desde)) res.json({ error: 'El "desde" debe ser un número' });

      const query = { estado: true };
      //se traen todos los usuarios de la db
      // const usuarios = await Usuario.find(query)
      // .skip(Number(desde)) //indica desde qué registro va a retornar la información
      // .limit(Number(limite)); //cantidad de registros que retornará

      // const total = await Usuario.countDocuments(query);

         //--total será lo que tenga la promesa en la posición 0 y usuarios la promesa en la posición 1
      const [total, usuarios] = await Promise.all([
         Usuario.countDocuments(query),
         Usuario.find(query)
            .skip(Number(desde)) //indica desde qué registro va a retornar la información
            .limit(Number(limite)),
      ]);

      res.json({
         total,
         usuarios
      });
   } catch (e) {
      res.json({
         error:'Error al consultar la DB'
      })
   }
};

const postUsuarios = async (req = request, res = response) => {
   

   const {nombre,correo,password,rol} = req.body;
   let usuario = new Usuario({nombre,correo,password,rol});
   
   //encriptación del password
   const salt = bcryptjs.genSaltSync(10);  //número de vueltas para encriptar el pass
   usuario.password = bcryptjs.hashSync(password,salt);
   //guardar en db
   await usuario.save();
 
   res.json({
      usuario 
   });
};

const putUsuarios = async (req = request, res = response) => {
   const {id} = req.params;
   //se extraen los parámetros que no nos intereza actualizar directamente
   const {password, google,correo, _id,... resto} = req.body;

   //validar contra DB
   //si envían el pass es porque lo van a actualizar y se genera el nuevo hash
   if( password ){
      //encriptación del password
      const salt = bcryptjs.genSaltSync(10); //número de vueltas para encriptar el pass
      resto.password = bcryptjs.hashSync(password, salt);
   }
   //se busca el objeto por id y se actualiza directamente
   const usuarioDB = await Usuario.findByIdAndUpdate(id,resto);

   res.json({
      usuarioDB
   });
};

const deleteUsuarios = async (req, res = response) => {
   const {id} = req.params;

   //eliminación física de la DB, no recomendado
   // const usuario = await Usuario.findByIdAndDelete( id );

   const usuario = await Usuario.findByIdAndUpdate( id, {estado : false} )

   res.json({
      usuario
   });
};

module.exports = {
   getUsuarios,
   postUsuarios,
   putUsuarios,
   deleteUsuarios,
};
