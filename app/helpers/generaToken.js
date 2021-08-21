const jwt=require('jsonwebtoken')

const generaJWT=(obj)=>{
    return new Promise((resolve,reject)=>{
        const {_id,user,rol}=obj
        const payload={_id,user,rol}
        jwt.sign(payload,process.env.SECRETKEY,{
            expiresIn:'4h'
        },(err,token)=>{
            if(err){
                reject({
                    status:400,
                    msg:'no se generó token',
                    obj:{}
                })
            }else{
                resolve({
                    status:200,
                    msg:'OK',
                    obj:{
                        _id,
                        user,
                        rol,
                        token
                    }
                })
            }
        })
    })
}

module.exports={generaJWT}