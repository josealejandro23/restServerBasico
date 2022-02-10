const mongoose = require('mongoose');

const dbConnection = async ()=>{
   try {
      const {MONGODB_ATLAS, MONGODB_DOCKER, NODE_ENV} = process.env;
      
      let connectionString = MONGODB_ATLAS;
      if (NODE_ENV !== "production") {
         connectionString = MONGODB_DOCKER;
      }

      await mongoose.connect(connectionString);

      console.log('DB conectada correctamente');
   } catch (e) {
      throw new Error ('Error la inicializar la DB');
   }
}

module.exports = {
   dbConnection
}