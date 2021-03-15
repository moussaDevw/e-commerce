const router = require('express').Router()
const { requireSignin,isAuth } = require('../controller/requireSignin')
const { userById } = require('../controller/user')
router.get("/secret/:userId", requireSignin,isAuth,(req,res)=>{
    res.json({
        user: req.profile
    })
})

router.param("userId", userById)

module.exports = router