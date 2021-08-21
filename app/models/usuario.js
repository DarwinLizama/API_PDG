const mongoose=require('mongoose')
const schema=mongoose.Schema

const usuariosSchema=new schema({
    user:{type:String,required:[true,'usuario requerido'],unique:[true,'usuario ya registrado{VALUE}']}
    ,email:{type:String,required:[true,'email requerido'],unique:true}
    ,clave:{type:String,required:[true,'password requerido']}
    ,estado:{type:Boolean,default:true}
    ,rol:{type:String,enum:['VENDEDOR','ADMIN']}
},{
    timestamps:true
    ,versionKey:false
})

usuariosSchema.methods.toJSON=function(){
    const {password,...usuario}=this.toObject()
    return usuario;
}

module.exports=mongoose.model('usuarios',usuariosSchema,'usuarios');