const express = require('express')
const { check } = require('express-validator')
const { ExisteProductoPorId, ExisteNombreProducto, ExisteCategoriaId } = require('../../helpers/validaProducto');
const { validarCampos, validaJWT } = require('../../middlewares');
const app = express()
const { GetProductos, NewProductos, DeleteProducto, ActualizarProducto, GetProducto, ActualizarProductoNombre, GetProductoNombre } = require('./productosControllers')

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
        res.send("Error en la busqueda del Producto!!")
    }
}

const getProductoNombre = async(req, res) => {
    try {        
        let nom = req.body.nombre
        console.log(nom);
        let respuesta = await GetProductoNombre(nom)
        res.send(respuesta)
    } catch (error) {
        res.send("Error en la busqueda del Producto!!")
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
        const productoId = req.params.id        
        const {...data} = req.body    
        
        let respuesta = await ActualizarProducto(productoId, data)
        console.log("log respuetas", respuesta);        
        res.send(respuesta)
    } catch (error) {
        console.log(error);
        res.status(500).send("Hubo un error al Actualizar Producto!!!")
    }
}

const actualizarProductosNombre = async(req, res) =>{
    try {
        const productoNombre = req.params.id        
        const {...data} = req.body    
        
        let respuesta = await ActualizarProductoNombre(productoNombre, data)
        console.log("log respuetas", respuesta);        
        res.send(respuesta)
    } catch (error) {
        console.log(error);
        res.status(500).send("Hubo un error al Actualizar Producto!!!")
    }
}

const deleteProductos = async(req, res) => {
    try {
        let id = req.params        
        let respuesta = await DeleteProducto(id)
        res.send(respuesta)
    } catch (error) {
        res.status(500).send("Hubo un error al elimianr el producto!!!")
    }
}


app.get('/api/productos', getProductos)

app.get('/api/productos/:id',[
    check('nombre').custom(ExisteNombreProducto),
    check('id').custom(ExisteProductoPorId),
    validarCampos
], getProducto)

app.get('/api/productos/:nombre', getProductoNombre)

app.post('/api/productos', [
    validaJWT,
    ExisteNombreProducto,
    check('idCategoria').custom(ExisteCategoriaId),
    validarCampos
], newProductos)

app.put('/api/productos/:id', [
    validaJWT,
    check('id').custom(ExisteProductoPorId),
    ExisteNombreProducto,
    validarCampos
], actualizarProductos)

app.put('/api/productos/:nombre', validaJWT, actualizarProductosNombre)

app.delete('/api/productos/:id',
    validaJWT,
    /* [
    check('id').custom(ExisteProductoPorId),
    validarCampos
], */ deleteProductos)


module.exports = app