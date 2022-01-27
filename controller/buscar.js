const { response } = require("express");
const { isValidObjectId } = require('mongoose');
const {Usuario, Categoria, Producto} = require('../models')

const coleccionesPermitidas = [
   'categorias',
   'productos',
   'roles',
   'usuarios',
];

const buscarUsuarios = async (termino = '', res = response) => {
   //se valida si el param es un id de mongo para buscar por id
   const esMongoID = isValidObjectId(termino);
   //se busca por id
   if(esMongoID){
      const usuario = await Usuario.findById(termino);
      return res.json({
         result:(usuario) ? [usuario] : []
      });
   }
   //se crea una expresión de búsqueda, esta es opcional y se usa para buscar todas las coincidencias
   const regex = new RegExp(termino,'i');
   //se buscan los usuarois que cumplan la expresión regular
   const usuarios = await Usuario.find({ 
      //que el nombre coincida o el correo coincida
      $or : [{nombre:regex},{correo:regex}],
      //que tengan estado true
      $and :[{estado : true}]
   });

   return res.json({
      result: usuarios,
   });
}

const buscarProductos = async (termino = "", res = response) => {
   //se valida si el param es un id de mongo para buscar por id
   const esMongoID = isValidObjectId(termino);
   //se busca por id
   if (esMongoID) {
      const producto = await Producto.findById(termino).populate('categoria','nombre');
      return res.json({
         result: producto ? [producto] : [],
      });
   }
   //se crea una expresión de búsqueda, esta es opcional y se usa para buscar todas las coincidencias
   const regex = new RegExp(termino, "i");
   //se buscan los usuarois que cumplan la expresión regular
   const productos = await Producto.find({nombre: regex,estado: true }).populate('categoria','nombre');

   return res.json({
      result: productos,
   });
};

const buscarCategorias = async (termino = "", res = response) => {
   //se valida si el param es un id de mongo para buscar por id
   const esMongoID = isValidObjectId(termino);
   //se busca por id
   if (esMongoID) {
      const categoria = await Categoria.findById(termino);
      return res.json({
         result: categoria ? [categoria] : [],
      });
   }
   //se crea una expresión de búsqueda, esta es opcional y se usa para buscar todas las coincidencias
   const regex = new RegExp(termino, "i");
   //se buscan los usuarois que cumplan la expresión regular
   const categorias = await Categoria.find({
      nombre: regex, estado: true 
   });

   return res.json({
      result: categorias,
   });
};

/**
 * Función que busca dentro de la base por diferentes parámetros
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const buscar = (req, res = response) => {
   const { coleccion, termino } = req.params;
   if(!coleccionesPermitidas.includes(coleccion)){
      return res.status(400).json({
         msg: `Las colecciones permitidas son ${coleccionesPermitidas}`
      })
   }

   switch (coleccion) {
      case "categorias":
         buscarCategorias(termino, res);
         break;
      case "productos":
         buscarProductos(termino,res);
         break;
      case "usuarios":
         buscarUsuarios(termino, res);
         break;
      default:
         res.status(500).json({
            msg: "este error es a propósito. Esta búsqueda no está implementada",
         });
         break;
   }
};

module.exports = {
   buscar,
};
