const router = require('express').Router()
const { create, categoryById,read,update,remove,list} = require('../controller/category')
const { requireSignin,isAuth,isAdmin } = require('../controller/requireSignin')
const { userById } = require('../controller/user')

router.get('/category/read/:categoryId', read)
router.post('/category/create/:userId',requireSignin, isAuth, isAdmin, create)
router.put('/category/:categoryId/:userId',requireSignin, isAuth, isAdmin, update)
router.delete('/category/:categoryId/:userId',requireSignin, isAuth, isAdmin, remove)
router.get('/category/read', list)

router.param("userId", userById)
router.param("categoryId", categoryById)

module.exports = router