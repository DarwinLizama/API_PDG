const Producto = require('../models/producto')
const categorias = require('../models/categoria')

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

const ExisteCategoriaId= async( idCategoria ) => {
    
    
    const existeCategoria = await categorias.findOne({id:idCategoria});
    if ( !existeCategoria ) {
        throw new Error(`El id no existe ${ id }`);
    }
    
}

module.exports ={
    ExisteProductoPorId,
    ExisteNombreProducto,
    ExisteCategoriaId
}