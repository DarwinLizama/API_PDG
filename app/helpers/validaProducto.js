const Producto = require('../models/producto')

const ExisteProductoPorId = async( id ) => {

    const existeProducto = await Producto.findOne({id:id});
    if ( !existeProducto ) {
        throw new Error(`El id no existe ${ id }`);
    }
    
}

module.exports ={
    ExisteProductoPorId
}