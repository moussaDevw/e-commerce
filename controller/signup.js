const User = require('../models/user')
const bcrypt = require('bcrypt')
exports.signup = (req,res)=>{
    const {firstName,lastName,email,hashed_password,confirmePassword,about} = req.body
    User.findOne({email},(err,users)=>{
        if(!err && users){
            return res.status(400).json({
                error:'Ce mail existe deja'
            })
        }
        if(hashed_password !== confirmePassword){
            return res.status(400).json({
                error:'Lex deux mot de passe ne sont pas identique'
            })
        }
        const salt = 10
        const password = bcrypt.hash(hashed_password, salt)
        const user = new User({
            firstName,
            lastName,
            email,
            password,
            about
        })
        user.save((error,user)=>{
            if(error){
                console.log(error)
                return res.status(400).json({
                    error:'Erreur de sauvegarde'
                })
            }
            res.json({
                message:'Inscription avec success' + user
            })
        })
    })
} 