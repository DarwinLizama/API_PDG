const express = require('express')
const { check } = require('express-validator')
const { ExisteProductoPorId } = require('../../helpers/validaProducto')
const { validarCampos } = require('../../middlewares/validarCampos')
const app = express()
const { GetProductos, NewProductos, DeleteProducto, ActualizarProducto, GetProducto } = require('./productosControllers')

const getProductos = async (req, res) => {
    try {
        let respuesta = await GetProductos()
        res.send(respuesta)
    } catch (error) {
        res.send("Error en la busqueda de Productos!!")
    }
}

const getProducto = async(req, res) => {
    try {        
        let id = req.params.id
        console.log(id);
        let respuesta = await GetProducto(id)
        res.send(respuesta)
    } catch (error) {
        res.send("Error en la busqueda del Pais!!")
    }
}

const newProductos = async(req, res) =>{
    try {
        let producto = req.body
        console.log(producto)
        let respuesta = await NewProductos(producto)
        res.send(respuesta)
    } catch (error) {
        res.status(500).send("Hubo un error al guardar!!!")
    }
}

const actualizarProductos = async(req, res) =>{
    try {
        let { id } = req.params
        const { ...data } = req.body
        //let id = req.params.id   
        console.log(id);  
        let respuesta = await ActualizarProducto(id, data)
        console.log("log respuetas", respuesta);        
        res.send(respuesta)
    } catch (error) {
        res.status(500).send("Hubo un error al Actualizar Producto!!!")
    }
}

const deleteProductos = async(req, res) => {
    try {
        let id = req.params
        //console.log(id);
        let respuesta = await DeleteProducto(id)
        res.send(respuesta)
    } catch (error) {
        res.status(500).send("Hubo un error al elimianr el producto!!!")
    }
}


app.get('/api/productos', getProductos)

app.get('/api/productos/:id',[
    
    check('id').custom(ExisteProductoPorId),
    validarCampos
], getProducto)

app.post('/api/productos', newProductos)

app.put('/api/productos/:id',[
    
    check('id').custom(ExisteProductoPorId),
    validarCampos
], actualizarProductos)

app.delete('/api/productos/:id',[
    
    check('id').custom(ExisteProductoPorId),
    validarCampos
], deleteProductos)

module.exports = app