const Paises = require('../models/categoria')


const existeNombreCategoria = async(nombre) => {
    let pais = await Paises.findOne({ nombre });
    if (pais) {
        throw new Error(`El Nombre ${nombre} ya esta Ingresado`);
    }
}

/* async function existeNombrePais(nombre){

} */

module.exports = {
    existeNombreCategoria
}