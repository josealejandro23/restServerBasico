const { response } = require("express");
const path = require('path');
const fs = require('fs')

const { subirArchivo } = require("../helpers");
const { Usuario, Producto } = require('../models');

//permite almacenar un archivo enviado en una petición
const cargarArchivo = async (req, res = response) => {
   try {
      //se guarda el archivo
      //le decimos que admita txt y md y los guarde dentro de una carpeta llamada textos
      // const nombre = await subirArchivo(req.files, ["txt", "md"],'textos');
      const nombre = await subirArchivo(req.files, undefined, "pictures");
      res.json({
         nombre,
      });
   } catch (e) {
      res.status(400).json({
         msg:e
      })
   }
}

const actualizarImagen = async (req, res=response) => {
   //se extraen los params recibidos 
   const {id,coleccion} = req.params;
   //se crea una variable para manejar la data de la DB
   let modelo;
   switch (coleccion) {
      case "usuarios":
         //si no existe un documento con ese id se rechaza la petición
         modelo = await Usuario.findById(id);
         if(!modelo){
            return res.status(400).json({
               msg:'No existe un usuario con el id ' + id
            })
         }
         break;
      case "productos":
         modelo = await Producto.findById(id);
         if (!modelo) {
            return res.status(400).json({
               msg: "No existe un producto con el id " + id,
            });
         }
         break;
      default:
         return res.status(500).json({ msg: "Característica no implementada, actualizar img" });
   }

   //se limpian las imágenes previas asociadas al modelo del validarCampos
   if(modelo.img){
      //se crea la ruta a la imagen
      const pathImagen = path.join(__dirname,'../uploads',coleccion,modelo.img);
      //Se valida que existe la imagen en el disco
      if(fs.existsSync(pathImagen))
         fs.unlinkSync(pathImagen);
   }

   //se obtiene la ruta de almacenamiento del archivo y se guarda en una carpeta
   //con el nombre de la colección recibida
   const nombre = await subirArchivo(req.files, undefined, coleccion);
   modelo.img = nombre;
   //se guarda la info en DB
   await modelo.save();

   res.json({
      modelo
   })
}

const mostrarImagen = async (req, res=response) => {
   //se extraen los params recibidos
   const { id, coleccion } = req.params;
   //se crea una variable para manejar la data de la DB
   let modelo;
   switch (coleccion) {
      case "usuarios":
         //si no existe un documento con ese id se rechaza la petición
         modelo = await Usuario.findById(id);
         if (!modelo) {
            return res.status(400).json({
               msg: "No existe un usuario con el id " + id,
            });
         }
         break;
      case "productos":
         modelo = await Producto.findById(id);
         if (!modelo) {
            return res.status(400).json({
               msg: "No existe un producto con el id " + id,
            });
         }
         break;
      default:
         return res.status(500).json({ msg: "Característica no implementada, actualizar img" });
   }

   //se valida que el id buscado tenga una imagen asociada
   if (modelo.img) {
      //se crea la ruta a la imagen
      const pathImagen = path.join(__dirname, "../uploads", coleccion, modelo.img);
      //Se valida que existe la imagen en el disco
      if (fs.existsSync(pathImagen)) {
         //se retorna la imagen
         return res.sendFile(pathImagen);
      }
   }

   //si no hay una imagen asociada se retorna una imagen por defecto
   const pathImagen = path.join(__dirname,"../assets","no-image.jpg");
   res.sendFile(pathImagen);
}

module.exports = {
   cargarArchivo,
   actualizarImagen,
   mostrarImagen,
};