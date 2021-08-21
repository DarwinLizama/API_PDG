const Producto = require('../models/producto')

const ExisteProductoPorId = async( id ) => {
    
    
    const existeProducto = await Producto.findOne({_id:id});
    if ( !existeProducto ) {
        throw new Error(`El id no existe ${ id }`);
    }
    
}

const ExisteNombreProducto = async(req, res, next) => {

    const { ...body } = req.body

    const productoDB = await Producto.findOne({ nombre: body.nombre });

    if ( productoDB ) {
        return res.status(400).json({
            msg: `El producto ${ productoDB.nombre }, ya existe`
        });
    }
    next()

}

module.exports ={
    ExisteProductoPorId,
    ExisteNombreProducto
}