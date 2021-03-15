const router = require('express').Router()
const {signup} = require('../controller/signup')
const {signin,signout} = require('../controller/signin')
const {userSignupValidator,userSigninValidator} = require('../utils/validatorUser')
const {runValidator} = require('../utils/runValidator')
const { requireSignin } = require('../controller/requireSignin')
router.post('/signup',userSignupValidator,runValidator, signup)
router.post('/signin',userSigninValidator,runValidator, signin)
router.get('/signout', signout)

module.exports = router