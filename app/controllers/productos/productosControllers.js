const Producto = require('../../models/producto')


const GetProductos = async() => {
    // const query = { estado: true}
    let data = await Producto.find({estado:true})

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
        descripcion
    })
    let data = await nuevoProducto.save()
    return data
}

const DeleteProducto = async(id) => {

    const productoBorrado = await Producto.findByIdAndUpdate(id, {estado: false}, {new: true})
    return productoBorrado
}

module.exports = {
    GetProductos,
    NewProductos,
    DeleteProducto
}