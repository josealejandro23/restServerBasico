const { Categoria, Role, Usuario, Producto } = require("../models");

const esRolValido = async (rol = "") => {
   //find one verifica contra la DB en busca del objeto pasado como argumento
   rol = rol.toLowerCase();
   if((rol !== 'admin') && (rol !== 'user')){
      throw new Error(`El rol ${rol} no está permitido`);
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

const validarColeccionesPermitidas = ( coleccion = '', colecciones = [] ) =>{
   const bExiste = colecciones.includes(coleccion);
   if(!bExiste){
      throw new Error('La colección no es permitida. Colecciones: ' + colecciones)
   }
   return true;
}

module.exports = {
   esRolValido,
   existeEmail,
   existeUsuarioID,
   validarLimite,
   validarIDCategoria,
   validarIDProducto,
   validarColeccionesPermitidas,
};