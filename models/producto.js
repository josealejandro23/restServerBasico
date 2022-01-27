const { Schema, model } = require("mongoose");

const ProductoSchema = Schema({
   nombre: {
      type: "string",
      required: [true, "el nombre de categoría es obligatorio"],
      unique: true,
   },
   estado: {
      type: Boolean,
      default: true,
      require: true,
   },
   usuario: {
      type: Schema.Types.ObjectId,
      ref: "Usuario",
      require: true,
   },
   precio : {
      type : Number,
      default : 0
   },
   categoria : {
      type : Schema.Types.ObjectId,
      ref : "Categoria",
      require : true
   },
   descripcion : {
      type : String
   },
   disponible : {
      type : Boolean,
      default : true
   }
});

//se sobreescribe la función toJSON para eliminar los objetos que no me interesa retornar
ProductoSchema.methods.toJSON = function () {
   //se saca en dos variables __V y password y todo lo demás se empaqueta en usuario
   const { __v, estado, ...data } = this.toObject();
   return data;
};

module.exports = model("Producto", ProductoSchema);
