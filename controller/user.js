const User = require('../models/user')

exports.userById = (req, res, next, id)=>{
    User.findById(id).exec((err,user)=>{
        if(err || !user){
            return res.status(400).json({
                error:'Ce utilisateur n\'existe pas'
            })
        }
        req.profile = user
        next()
    })
}