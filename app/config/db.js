const mongoose = require('mongoose')
require('dotenv').config({ path: 'variables.env' })

const conectarDB = async () => {
    try {
        await mongoose.connect(process.env.Mongo,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        })
        console.log("Conexion realizada correctemente!!");
    } catch (error) {
        console.log("Error en la conexion!!!!");
    }
}

module.exports = conectarDB