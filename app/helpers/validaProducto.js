const Producto = require('../models/producto')

const ExisteProductoPorId = async( id ) => {
    
    
    const existeProducto = await Producto.findOne({_id:id});
    if ( !existeProducto ) {
        throw new Error(`El id no existe ${ id }`);
    }
    
}

const ExisteNombreProducto = async(nombre = '') => {

    const existeNombre = await Producto.findOne({ nombre });
    if (existeNombre) {
        throw new Error(`El Nombre ${nombre} ya esta Ingresado`);
    }
}

module.exports ={
    ExisteProductoPorId,
    ExisteNombreProducto
}