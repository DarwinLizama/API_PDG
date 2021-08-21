const mongoose=require('mongoose')
const schema=mongoose.Schema

const usuariosSchema=new schema({
    user:{type:String,required:'usuario requerido',unique:true}
    ,email:{type:String,required:'email requerido',unique:true}
    ,clave:{type:String,required:'contraseña requerida'}
    ,estado:{type:Boolean,default:true}
    ,rol:{type:String,enum:{
        values:['VENDEDOR','ADMIN']
      , message: 'rol es requerido'
      }}
},{
    timestamps:true
    ,versionKey:false
})

usuariosSchema.methods.toJSON=function(){
    const {password,...usuario}=this.toObject()
    return usuario;
}

module.exports=mongoose.model('usuarios',usuariosSchema,'usuarios')