const Paises = require('../models/categoria')


const existeNombreCategoria = async(nombre) => {
    let categoria = await categoria.findOne({ nombre });
    if (categoria) {
        throw new Error(`El Nombre ${nombre} ya esta Ingresado`);
    }
}

/* async function existeNombrePais(nombre){

} */

module.exports = {
    existeNombreCategoria
}