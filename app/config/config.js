const dotenv = require('dotenv')
const resultado = dotenv.config()

if (typeof process.env.AMBIENTE == 'undefined') {
    console.log("Falta definir el Ambiente de ejecucion!!!");
}

if (process.env.AMBIENTE && process.env.AMBIENTE.trim()=='produccion') {
    console.log("Producción");
    process.env.Mongo = "mongodb://localhost:27017/dbpdg"
} else {
    console.log("Desarrollo!!!");
    process.env.Mongo = "mongodb://localhost:27017/dbpdgdev"
}