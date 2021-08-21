const Producto = require('../../models/producto')


const GetProductos = async() => {
    // const query = { estado: true}
    let data = await Producto.find({estado:true})

    return data
}

const GetProducto = async(id) => {

    let data = await Producto.findOne({ id: id })
    return data
}

const GetProductoNombre = async(nom) => {

    let data = await Producto.findOne({ nombre:nom })
    return data
}
const NewProductos = async(producto) => {

    const { id, nombre, precio, idCategoria, estado, descripcion } = producto

    let nuevoProducto = new Producto ({
        id,
        nombre,
        precio,
        idCategoria,
        estado,
        descripcion,
        img: null
    })
    let data = await nuevoProducto.save()
    return data
}

const ActualizarProducto = async(productoId, data) => {
     
    const producto = await Producto.findByIdAndUpdate({ _id:productoId }, data, { new: true })
    
    return producto
    
}

const ActualizarProductoNombre = async(productoNombre, data) => {
     
    const producto = await Producto.findByIdAndUpdate(productoNombre, data, { new: true })
    
    return producto
    
}

const DeleteProducto = async(id) => {

    const productoBorrado = await Producto.updateOne(id, {estado: false}, {new: true})
    
    return productoBorrado
}

module.exports = {
    GetProductos,
    GetProducto,
    GetProductoNombre,
    NewProductos,
    ActualizarProducto,
    ActualizarProductoNombre,
    DeleteProducto
}