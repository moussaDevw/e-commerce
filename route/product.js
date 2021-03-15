const router = require('express').Router()
const { create,productById,read,remove,update,list,listRelated,listCategories } = require('../controller/product')
const { requireSignin,isAuth,isAdmin } = require('../controller/requireSignin')
const { userById } = require('../controller/user')
router.get('/product/read/:productId', read)
router.post('/product/create/:userId',requireSignin, isAuth, isAdmin, create)
router.delete('/product/:productId/:userId',requireSignin, isAuth, isAdmin, remove)
router.put('/product/:productId/:userId',requireSignin, isAuth, isAdmin, update)
router.get('/products', list)
router.get('/product/category', listCategories)
//recuperer les produits par category
router.get('/product/related/:productId', listRelated)
router.param("userId", userById)
router.param("productId", productById)

module.exports = router