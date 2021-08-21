const express = require('express')
const app = express()


app.use(require('../controllers/usuarios/usuarios.routes'))
app.use(require('../controllers/categorias/categorias.routes'))
app.use(require('../controllers/productos/productos.routes'))


module.exports = app