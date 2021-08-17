const jwt=require('jsonwebtoken')

const generaJWT=(user)=>{
    return new Promise((resolve,reject)=>{
        const payload={user}
        jwt.sign(payload,process.env.SECRETKEY,{
            expiresIn:'2h'
        },(err,token)=>{
            if(err){
                console.log(err)
                reject('no se generó token')
            }else{
                resolve(token)
            }
        })
    })
}

module.exports={generaJWT}