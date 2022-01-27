const { response } = require("express");
const { Categoria } = require('../models/index')

//obtener categorias, paginado - cantidad - populate
const getCategorias = async (req, res = response) =>{
   try {
      //se leen los querys que vienen en la url
      const { limite = 15, desde = 0 } = req.query;
      const query = { estado: true };

      //--"total" será lo que tenga la promesa en la posición 0 y "usuarios" la promesa en la posición 1
      const [total, categorias] = await Promise.all([
         Categoria.countDocuments(query),
         Categoria.find(query)
            .populate('usuario','nombre')
            .skip(Number(desde)) //indica desde qué registro va a retornar la información
            .limit(Number(limite)),
      ]);

      res.json({
         total,
         categorias,
      });
   } catch (e) {
      res.json({
         error: "Error al consultar la DB",
      });
   }
}

//obtener categoria, populate, {} de categoria
const getCategoriaPorID = async (req, res = response) => {
   try {
      //se obtiene el id de la categoría
      const {id} = req.params;
      //se indica que traiga todos los datos del campo usuario
      const categoriaDB = await Categoria.findById(id).populate('usuario','nombre');

      res.status(200).json(categoriaDB);
   } catch (e) {
      console.error(e)
   }
}

const crearCategoria = async (req,  res = response) => {
   try {
      const nombre = req.body.nombre.toUpperCase();
      const categoriaDB = await Categoria.findOne({nombre});

      if(categoriaDB){
         return res.status(400).json({
            msg: `La categoría ${categoriaDB.nombre} ya existe.`,
         });
      }

      //datos a guardar
      const data = {
         nombre,
         usuario : req.uid
      }

      const categoria = new Categoria(data);
      await categoria.save();

      res.status(201).json(categoria);
   } catch (e) {
      console.log(e)
   }
}

//editar categoria // cambiar el nombre y validar q el nombre nuevo no exista
const putCategoria = async (req = request, res = response) => {
   const { id } = req.params;
   //se extraen los parámetros que no nos intereza actualizar directamente
   const { estado, usuario, ...data } = req.body;
   data.nombre = data.nombre.toUpperCase();
   //se actualiza el nombre del usuario que creó la categoría por el que la edita
   data.usuario = req.uid;

   const categoriaDB = await Categoria.findByIdAndUpdate(id, data, {new : true});
   res.json({
      categoriaDB,
   });
};

//borrar categoria, cambiar estado a false solamente, validar id
const deleteCategoria = async (req, res = response) => {
   const { id } = req.params;

   //eliminación física de la DB, no recomendado
   const categoria = await Categoria.findByIdAndUpdate(id, { estado: false },{new : true});

   //obtener usuario autenticado
   const usuarioautenticado = req.usuario;

   res.json({
      categoria,
      usuarioautenticado,
   });
};

module.exports = {
   crearCategoria,
   getCategoriaPorID,
   getCategorias,
   putCategoria,
   deleteCategoria,
};