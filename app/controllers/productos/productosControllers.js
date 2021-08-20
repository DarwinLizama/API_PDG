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

const ActualizarProducto = async(id, data) => {

    console.log("data en controller", data);    
   
    const producto = await Producto.updateOne(id, {$set:{ nombre, descripcion, precio }})
    console.log("producto controllers", producto);
    return producto

}

const DeleteProducto = async(id) => {

    const productoBorrado = await Producto.updateOne(id, {estado: false}, {new: true})
    
    return productoBorrado
}

module.exports = {
    GetProductos,
    GetProducto,
    NewProductos,
    ActualizarProducto,
    DeleteProducto
}