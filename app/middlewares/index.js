const validaJWT = require('../middlewares/validaJWT');
const validacionesCampos   = require('../middlewares/validaciones');
const validarArchivoSubir  = require('../middlewares/validarArchivo');
const validarCampos = require('../middlewares/validarCampos');

module.exports = {
    ...validaJWT,
    ...validacionesCampos,
    ...validarArchivoSubir,
    ...validarCampos
}