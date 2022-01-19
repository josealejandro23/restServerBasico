const jwt = require('jsonwebtoken');

const generarJWT = ( uid = '') =>{
   return new Promise((resolve,reject) =>{
     try {
        //Carga útil del token
        const payload = { uid };
        const token = jwt.sign(payload, process.env.SECRETORPRIVATEKEY, {
           expiresIn: "10h",
        });
        resolve(token);
     } catch (e) {
        reject(e);
     }
   })
}

module.exports = {
   generarJWT
}