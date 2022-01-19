const mongoose = require('mongoose');

const dbConnection = async ()=>{
   try {
      await mongoose.connect(process.env.MONGODB,{
         // useNewUrlParser = true,
         // useUnifiedTopology = true,
         // useCreateIndex = true,
         // useFindAndModify = false
      });

      console.log('DB conectada correctamente');
   } catch (e) {
      console.log(e);
      throw new Error ('Error la inicializar la DB');
   }
}

module.exports = {
   dbConnection
}