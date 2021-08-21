const { Schema, model } = require('mongoose');


const ProductoSchema = new Schema({
    id: {
        type: Number,
        required: true
        
    },
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        unique: [true, 'El nombre ya existe']
    },
    precio:{
        type: Number,        
        default: 0
    },
    idCategoria: {
        type: Number
    },
    estado: {
        type: Boolean,
        default: true,
        required: true
    },
    img: { 
        type: String 
    },
    descripcion:{
        type: String
    }    
},{
    timestamps: true,
    versionKey: false
})


module.exports = model( 'Producto', ProductoSchema );