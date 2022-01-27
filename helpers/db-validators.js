const { Categoria, Role, Usuario, Producto } = require("../models");

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
   if (!bExiste) 
      throw new Error(`No existe un usuario asociado a ese id`);
};

const validarLimite = ( query = '') =>{
   if(query === '') return true;
   if(isNaN(query)) throw new Error('Las querys límite y desde deben ser números');
   return true
}

const validarIDCategoria = async (id) => { 
   bExiste = await Categoria.findById(id);
   if(!bExiste)
      throw new Error("La categoría indicada no existe");
}

const validarIDProducto = async (id) => {
   bExiste = await Producto.findById(id);
   if (!bExiste) throw new Error("El producto indicado no existe");
};

module.exports = {
   esRolValido,
   existeEmail,
   existeUsuarioID,
   validarLimite,
   validarIDCategoria,
   validarIDProducto,
};