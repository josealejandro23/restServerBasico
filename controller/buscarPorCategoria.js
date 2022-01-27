const { response } = require("express");
const { isValidObjectId } = require("mongoose");
const { Categoria, Producto } = require("../models");

/**
 * Función que trae todos los productos de una categoría
 * Puede recibir el id de categoría o el nombre de categoría
 * @param {request} req
 * @param {response} res
 * @returns
 */
const buscarPorCategoria = async (req, res = response) => {
   const { categoria } = req.params;
   //se valida si el param es un id de mongo para buscar por id
   const esMongoID = isValidObjectId(categoria);
   //se busca por id
   if (esMongoID) {
      const productos = await Producto.find({ categoria, estado:true });
      return res.json({
         result: productos ? [productos] : [],
      });
   }

   //se busca la categoría por nombre para leer su id
   const nCategoria = await Categoria.findOne({nombre:categoria});
   if(!nCategoria)
      res.json({result:[]});

   //se buscan los productos que cumplan la categoría y estén activos
   const productos = await Producto.find({
      categoria: nCategoria._id,
      estado: true,
   });

   return res.json({
      result: productos,
   });
};

module.exports = {
   buscarPorCategoria,
};
