const { response } = require("express");
const { Categoria, Producto } = require("../models/index");

//obtener categorias, paginado - cantidad - populate
const getProductos = async (req, res = response) => {
   try {
      //se leen los querys que vienen en la url
      const { limite = 15, desde = 0 } = req.query;
      const query = { estado: true };

      //--"total" será lo que tenga la promesa en la posición 0 y "usuarios" la promesa en la posición 1
      const [total, productos] = await Promise.all([
         Producto.countDocuments(query),
         Producto.find(query)
            .populate("usuario", "nombre")
            .populate("categoria","nombre")
            .skip(Number(desde)) //indica desde qué registro va a retornar la información
            .limit(Number(limite)),
      ]);

      res.json({
         total,
         productos,
      });
   } catch (e) {
      res.json({
         error: "Error al consultar la DB",
      });
   }
};

//obtener categoria, populate, {} de categoria
const getProductosPorID = async (req, res = response) => {
   try {
      //se obtiene el id de la categoría
      const { id } = req.params;
      //se indica que traiga todos los datos del campo usuario
      const productoDB = await Producto.findById(id).populate("usuario", "nombre").populate("categoria","nombre");

      res.status(200).json({productoDB, estado:productoDB.estado});
   } catch (e) {
      console.error(e);
   }
};

const crearProducto = async (req, res = response) => {
   try {
      const nombre = req.body.nombre.toUpperCase();
      const { precio, descripcion, categoria, disponible} = req.body;
      const productoDB = await Producto.findOne({nombre});
      
      if (productoDB) {
         return res.status(400).json({
            msg: `El producto ${productoDB.nombre} ya existe.`,
         });
      }
      
      const categoriaDB = await Categoria.findOne({ nombre:categoria.toUpperCase() });
      //datos a guardar
      const data = {
         nombre,
         precio,
         descripcion,
         categoria: categoriaDB._id,
         disponible,
         usuario: req.uid,
      };

      const producto = new Producto(data);
      await producto.save();

      res.status(201).json(producto);
   } catch (e) {
      console.log(e);
   }
};

//editar categoria // cambiar el nombre y validar q el nombre nuevo no exista
const putProducto = async (req = request, res = response) => {
   const { id } = req.params;
   //se extraen los parámetros que no nos intereza actualizar directamente
   const { estado, usuario, categoria, ...data } = req.body;
   data.nombre = data.nombre.toUpperCase();
   //se actualiza el nombre del usuario que creó la categoría por el que la edita
   data.usuario = req.uid;

   const productoDB = await Producto.findByIdAndUpdate(id, data, { new: true });
   res.json({
      productoDB,
   });
};

//borrar categoria, cambiar estado a false solamente, validar id
const deleteProducto = async (req, res = response) => {
   const { id } = req.params;

   //eliminación física de la DB, no recomendado
   const producto = await Producto.findByIdAndUpdate(id, { estado: false }, { new: true });

   //obtener usuario autenticado
   const usuarioautenticado = req.usuario;

   res.json({
      producto,
      usuarioautenticado,
   });
};

module.exports = {
   crearProducto,
   getProductos,
   getProductosPorID,
   putProducto,
   deleteProducto,
};
