const path = require('path')
const fs = require('fs')
const { Producto } = require('../../models/producto')
// const { subirArchivo } = require('../../helpers/subirArchivo')

const CargarArchivo = async(img) => {

    // const nombre = await subirArchivo( req.files, undefined, 'imgs' );
    // return ({ nombre });
}

module.exports = {
    CargarArchivo
}
