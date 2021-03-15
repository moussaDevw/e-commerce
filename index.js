const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const config = require('./utils/config')
const routerAuth = require('./route/auth')
const routerUserId = require('./route/user')
const routerCategory = require('./route/category')
const routerProduct = require('./route/product')
mongoose.connect(config.MONGO_URI,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology: true
})
.then(()=>console.log('connexion sur la base de donne avec succes'))
.catch(e=>console.log('connexion echouer',e))

//middleware

const app = express();
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(cors())
//route middleware
app.use('/', routerAuth)
app.use('/', routerUserId)
app.use('/', routerCategory)
app.use('/', routerProduct)
const PORT = config.PORT || 8000
app.listen(PORT,()=>console.log('connexion reussie sur la port',PORT))