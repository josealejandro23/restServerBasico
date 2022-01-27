const { response } = require("express");
const { Categoria } = require("../models");

const validarData = async (req, res = response, next) => {
   try {
      const {nombre} = req.body;
      if(!nombre)
         res.status(400).json({
            msg: "Debe indicar el nombre del producto",
         });
      
      const nCategoria = req.body.categoria.toUpperCase();
      if (!nCategoria) 
         res.status(400).json({
            msg : "Debe indicar la categoría del producto"
         })

      const categoria = await Categoria.findOne({ nombre: nCategoria });
      if (!categoria) {
         res.status(400).json({
            msg: "La categoría indicada no existe",
         });
      }
      next()
   } catch (e) {
      console.log(e);
   }
};

module.exports = { validarData };
