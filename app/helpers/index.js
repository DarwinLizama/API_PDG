const generaJWT = require('./generaToken');
const subirArchivo   = require('./subirArchivo');
const existeNombreCategoria = require('./subirArchivo');
const ExisteProductoPorId = require('./validaProducto');
const ExisteNombreProducto = require('./validaProducto');
const ExisteCategoriaId = require('./validaProducto');


module.exports = {
    ...generaJWT,
    ...subirArchivo,
    ...existeNombreCategoria,
    ...ExisteProductoPorId,
    ...ExisteNombreProducto,
    ...ExisteCategoriaId
}