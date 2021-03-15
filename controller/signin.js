const User = require('../models/user')
const jwt = require('jsonwebtoken')
exports.signin = (req,res)=>{
    const {email,password} = req.body
    User.findOne({email},(err,user)=>{
        if(err || !user){
            return res.status(400).json({
                error:'email ou mot de pass incorrecte'
            })
        }
        if(password !== user.password){
            return res.status(400).json({
                error:'email ou mot de pass incorrecte'
            })
        }
        const token = jwt.sign({_id:user._id},process.env.SECRET_TOKEN)
        res.cookie("t",token,{expire: new Date() + 9999})
        const {_id,firstName,lastName,email,role} = user
        res.json({token,user:{_id,firstName,lastName,email,role}})
    })
}

exports.signout = (req,res)=>{
    res.clearCookie("t")
    res.json({
        message:"Deconnexion avec succes ByBy"
    })
}