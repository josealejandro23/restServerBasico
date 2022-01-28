const path = require("path");
const { v4: uuidv4 } = require("uuid");

const subirArchivo = (files, extensionesValidas = ["png", "jpg", "jpeg", "gif"], carpetaAlmacenamiento = '') => {
   return new Promise((resolve, reject) => {
      //se extrae el archivo de la petición
      const { archivo } = files;
      const nombreCortado = archivo.name.split(".");
      const extension = nombreCortado[nombreCortado.length - 1];

      //se valida la extensión del archivo recibido.
      if (!extensionesValidas.includes(extension))
         return reject(`Solo se admiten archivos con extensión ${extensionesValidas}`);

      const nombreTemp = uuidv4() + "." + extension;
      //-- Almacenamiento directo de los archivos. sin tratamiento ni validaciones
      //__dirname retorna la ubicación hasta la carpeta actual entonces se debe dar un paso
      //atrás para ir al directorio de aplicación y no la carpeta controller
      const uploadPath = path.join(__dirname, "../uploads/", carpetaAlmacenamiento, nombreTemp);
      //se guarda el archivo en el directorio
      archivo.mv(uploadPath, (err) => {
         if (err) {
            return reject(err)
         }

         resolve(nombreTemp);
      });
   });
};

module.exports = {
   subirArchivo
}