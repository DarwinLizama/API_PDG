const jwt=require('jsonwebtoken')

const validaJWT=(req,res,next)=>{
    const token=req.header('x-token')
    if(!token){
        return res.status(403).json({
            msg:'no hay teken'
        })
    }
    try{
        const payload=jwt.verify(token,process.env.SECRETKEY)
        console.log(payload)
        next()
    }catch(e){
        return res.status(403).json({
            msg:'token inválido'
        })
    }
}

module.exports={validaJWT}