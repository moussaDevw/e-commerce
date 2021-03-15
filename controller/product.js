const formidable = require('formidable')
const _ = require('lodash')
const fs = require('fs')
const Product = require('../models/product')
//pour recupere l'id du product
exports.productById = (req,res,next,id)=>{
    Product.findById(id).exec((err,product)=>{
        if(err){
            return res.status(400).json({
                error:'Ce produits n\'existe pas'
            })
        }
        req.product = product
        next()
    })
}
//pour afficher le product demander
exports.read = (req,res)=>{
    req.product.photo = undefined
    res.json(req.product)
}
//pour creer un produits avec le package formidable
exports.create = (req,res)=>{
    let form = new formidable.IncomingForm()
    form.keepExtensions = true
    form.parse(req,(err,fields,files)=>{
        if(err){
            return res.status(400).json({
                error:"L'image n'a pas pu etre telechargee"
            })
        }
        const {name,description,price,category,quantity} = fields
        if(!name || !description || !price || !category || !quantity){
            return res.status(400).json({
                error:"Tous les champs sont requis"
            })
        }
        let product = new Product(fields)
        if(files.photo){
            product.photo.data = fs.readFileSync(files.photo.path)
            product.photo.contentType = files.photo.type
        }
        product.save((err,result)=>{
            if(err){
                return res.status(400).json({
                    error:'Erreur de sauvegarde'
                })
            }
            res.json(result)
        })
    })
}

exports.remove = (req,res)=>{
    let product = req.product
    product.remove((err,deleteProduct)=>{
        if(err){
           return res.status(400).json({
               error:"erreur pour supprimer ce produits"
           })
        }
        let deletePro = deleteProduct.name
        res.json({
            deletePro,
            message:"Supprimer avec succes"
        })
    })
}
//mis a jour des produits
exports.update = (req,res)=>{
    let form = new formidable.IncomingForm()
    form.keepExtensions = true
    form.parse(req,(err,fields,files)=>{
        if(err){
            return res.status(400).json({
                error:"L'image n'a pas pu etre telechargee"
            })
        }
        const {name,description,price,category,quantity} = fields
        if(!name || !description || !price || !category || !quantity){
            return res.status(400).json({
                error:"Tous les champs sont requis"
            })
        }
        let product = req.product
        product = _.extend(product,fields)
        if(files.photo){
            product.photo.data = fs.readFileSync(files.photo.path)
            product.photo.contentType = files.photo.type
        }
        product.save((err,result)=>{
            if(err){
                return res.status(400).json({
                    error:'Erreur de sauvegarde'
                })
            }
            res.json(result)
        })
    })
}
//pour afficher la liste total des produits
exports.list = (req,res)=>{
    let order = req.query.order ? req.query.order : "asc"
    let sortBy = req.query.sortBy ? req.query.sortBy : "_id"
    let limit = req.query.limit ? parseInt(req.query.limit) : 6

    Product.find({})
        .select("-photo")
        .populate('Category')
        .sort([[sortBy,order]])
        .limit(limit)
        .exec((err,products)=>{
            if(err){
                return res.status(400).json({
                    error:"Aucun produits"
                })
            }
            res.json(products)
        })
}

exports.listRelated = (req,res)=>{
    let limit = req.query.limit ? parseInt(req.query.limit) : 6
    Product.find({_id: {$ne: req.product}, category: req.product.category})
    .limit(limit)
    .populate('Category', "_id name")
    .exec((err,products)=>{
        if(err){
            return res.status(400).json({
                error:"Produits non trouvés"
            })
        }
        products.photo = undefined
        res.json(products)
    })
}

exports.listCategories = (req,res)=>{
    Product.distinct("category", {}, (err,categories)=>{
        if(err){
            return res.status(400).json({
                error:"Categori non trouvees"
            })
        }
        res.json(categories)
    })
}