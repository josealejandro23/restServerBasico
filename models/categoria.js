const { Schema, model } = require("mongoose");

const CategoriaSchema = Schema({
   nombre: {
      type: "string",
      required: [true, "el nombre de categoría es obligatorio"],
      unique : true
   },
   estado:{
      type: Boolean,
      default : true,
      require : true
   },
   usuario : {
      type : Schema.Types.ObjectId,
      ref:'Usuario',
      require : true
   }
});

//se sobreescribe la función toJSON para eliminar los objetos que no me interesa retornar
CategoriaSchema.methods.toJSON = function () {
   //se saca en dos variables __V y password y todo lo demás se empaqueta en usuario
   const { __v,estado,usuario,...categoria } = this.toObject();
   const {password, rol, _id,google,...newUser} = usuario;
   categoria.usuario = newUser;
   return categoria;
};

module.exports = model("Categoria", CategoriaSchema);
