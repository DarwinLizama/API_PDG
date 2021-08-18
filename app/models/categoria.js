const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categoriasSchema = new Schema({

    id: {
        type: Number,
        required: [true, 'el id es obligatorio'],
        unique: true
    },
    nombre: {
        type: String
    },
    estado: {
        type: Boolean,
        default: true
    },
  
}, {
    timestamps: true,
    versionKey: false
})

module.exports = mongoose.model('categorias', categoriasSchema, 'categorias');

