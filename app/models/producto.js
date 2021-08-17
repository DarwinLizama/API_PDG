const { Schema, model } = require('mongoose');


const ProductoSchema = new Schema({
    id: {
        type: Number,
        required: true
        
    },
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        unique: true
    },
    precio:{
        type: Number,
        required: true,
        default: 0
    },
    estado: {
        type: Boolean,
        default: false
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