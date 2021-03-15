const Category = require('../models/category')

exports.categoryById = (req,res,next,id)=>{
    Category.findById(id).exec((err,category)=>{
        if(err || !category){
            return res.status(400).json({
                error:"Ce category n'existe pas"
            })
        }
        req.category = category
        next()
    })
}
exports.create = (req,res)=>{
    const category = new Category(req.body)
    category.save((err,data)=>{
        if(err){
            return res.status(400).json({
                error:'Erreur de sauvegarde'
            })
        }
        res.json({data})
    })
}
exports.read = (req,res)=>{
    res.json(req.category)
}

exports.update = (req,res)=>{
    let category = req.category
    category.name = req.body.name
    category.save((err,categoryUpdate)=>{
        if(err){
            return res.status(400).json({
                error:"Erreur de sauvegarde"
            })
        }
        res.json(categoryUpdate)
    })
}

exports.remove = (req,res)=>{
    let category = req.category
    category.remove((err,deleteProduct)=>{
        if(err || !deleteProduct){
            return res.status(400).json({
                error:"Ce category n'existe pas"
            })
        }
        let deleteCat = deleteProduct.name
        res.json({
            deleteCat,
            message:"est supprimer avec succes"
        })
    })
}

exports.list = (req,res)=>{
    Category.find({}).exec((err,categorys)=>{
        if(err){
            return res.status(400).json({
                error:"Aucun category"
            })
        }
        res.json(categorys)
    })
}