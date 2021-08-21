const generaJWT = require('./generaToken');
const subirArchivo   = require('./subirArchivo');
const existeNombreCategoria = require('./subirArchivo');
const ExisteProductoPorId = require('./validaProducto');
const ExisteNombreProducto = require('./validaProducto');
const ExisteCategoriaId = require('./validaProducto');
const existeUsuario = require('./validacionesUsuarios')
const validaUpdate = require('./validacionesUsuarios')
const validaDelete = require('./validacionesUsuarios')
const validaLogin = require('./validacionesUsuarios')

module.exports = {
    ...generaJWT,
    ...subirArchivo,
    ...existeNombreCategoria,
    ...ExisteProductoPorId,
    ...ExisteNombreProducto,
    ...ExisteCategoriaId,
    ...existeUsuario,
    ...validaUpdate,
    ...validaDelete,
    ...validaLogin
}