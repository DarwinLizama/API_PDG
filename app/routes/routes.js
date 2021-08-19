const express = require('express')
const app = express()


app.use(require('../controllers/usuarios/usuarios.routes'))


module.exports = app