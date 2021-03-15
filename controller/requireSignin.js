const expressJwt = require('express-jwt')

exports.requireSignin = expressJwt({
    secret:process.env.SECRET_TOKEN,
    algorithms:['sha1', 'RS256', 'HS256'],
    userProperty:'auth'
})

exports.isAuth = (req,res,next)=>{
    let user = req.profile && req.auth && req.profile._id == req.auth._id
    if(!user){
        return res.status(403).json({
            error:'Acces interdit'
        })
    }
    next()
}

exports.isAdmin = (req,res,next)=>{
    if(req.profile.role === 0){
        return res.status(403).json({
            error:'Admin ressource! Acces interdit'
        })
    }
    next()
}