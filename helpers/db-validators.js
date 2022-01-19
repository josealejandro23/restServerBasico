const Role = require("../models/role");
const Usuario = require('../models/usuario');

const esRolValido = async (rol = "") => {
   //find one verifica contra la DB en busca del objeto pasado como argumento
   const existeRol = await Role.findOne({ rol });
   if (!existeRol) {
      throw new Error(`El rol ${rol} no existe en la db`);
   }
};

//verificar si el correo ya existe
const existeEmail = async(correo) =>{
   const bExiste = await Usuario.findOne({correo:correo});
   if (bExiste) {
      throw new Error(`El correo "${correo}" ya existe en la DB`);
   }
}

const existeUsuarioID = async (id) => {
   const bExiste = await Usuario.findById(id);
   if (!bExiste) {
      throw new Error(`No existe un usuario asociado a ese id`);
   }
};

const validarQuery = ( query ) =>{
   if (isNaN(query.limite)) throw new Error("El límite debe ser un número");
   if (isNaN(query.desde)) throw new Error("desde debe ser un número");
}

module.exports = {
   esRolValido,
   existeEmail,
   existeUsuarioID,
   validarQuery,
};