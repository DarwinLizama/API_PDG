const jwt=require('jsonwebtoken')

const generaJWT=(_id,user,rol)=>{
    return new Promise((resolve,reject)=>{
        const payload={_id,user,rol}
        jwt.sign(payload,process.env.SECRETKEY,{
            expiresIn:'2h'
        },(err,token)=>{
            if(err){
                reject('no se generó token')
            }else{
                resolve(token)
            }
        })
    })
}

module.exports={generaJWT}