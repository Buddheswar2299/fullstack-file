
const express = require('express')
const cors = require('cors');
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const user = require('./models/user')//user.js from modules
const bcrypt = require('bcryptjs')
const bodyParser = require('body-parser')
require('dotenv').config()
const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(bodyParser.urlencoded({extended:true}))
app.set('view engine','ejs') 
app.use(cors())
mongoose.connect(process.env.MONGO_URI)
const db = mongoose.connection

db.once('open',()=>{
    console.log('successfully connected to the db')
})
db.on('error',(error)=>{
    console.log(error)
})


app.get('/signin',(req,res)=>{
    res.redirect('https://fullstack-file-frontend.onrender.com/shoppersPage.html')
})
app.get('/signup',(req,res)=>{
    res.redirect('https://fullstack-file-frontend.onrender.com/shoppersSignup.html')
})
app.get('/gethome',(req,res)=>{
    res.redirect('https://fullstack-file-frontend.onrender.com/home.html')
})
app.get('/sellerssignin',(req,res)=>{
    res.redirect('https://fullstack-file-frontend.onrender.com/sellersPage.html')
})
app.get('/sellerssignup',(req,res)=>{
    res.redirect('https://fullstack-file-frontend.onrender.com/sellersSignuppage.html')
})
app.get('/gethomeseller',(req,res)=>{
    res.redirect('https://fullstack-file-frontend.onrender.comsellersapi.html')
})
app.get('/initial',(req,res)=>{
    res.redirect('https://fullstack-file-frontend.onrender.com/index.html')
})
app.post('/signup',async(req,res)=>{
    const{email,password:plainTextPassword1,rePassword:plainTextPassword2} = req.body

    const salt = await bcrypt.genSalt(10)
    const encryptedPassword1 = await bcrypt.hash(plainTextPassword1,salt)
    const encryptedPassword2 = await bcrypt.hash(plainTextPassword2,salt)

    try{
        await user.create({
            email, 
            password:encryptedPassword1, 
            rePassword: encryptedPassword2
        })
        res.redirect('/signin')
    }catch(error){
        console.log(error)
    }
})


app.post('/signin',async(req,res)=>{
    const {email,password} = req.body
    console.log(email)

    const userObj = await user.findOne({email})

    if(!userObj){
        res.send({error:'User doesnt exist'})
    }
    const isPasswordValid = await bcrypt.compare(password,userObj.password)
    if(isPasswordValid){
        const token = jwt.sign({
            userId: userObj._id, email:email, type:'user'}, process.env.JWT_SECRET_KEY , {expiresIn:'2h'})
        res.cookie('token',token, {maxAge:2*60*60*1000})
        res.redirect('/')
        }
        else{
            res.redirect('/signin')
        }
    
})


app.get('/',(req,res)=>{
    const {token} = req.cookies
    if(token){
        const tokenData = jwt.verify(token,process.env.JWT_SECRET_KEY)
        if(tokenData.type == 'user'){
            res.redirect('/gethome')
        }else{
            res.redirect('signup')
        }
    }
    res.redirect('signup')
})

app.post('/sellerssignup',async(req,res)=>{
    const{email,password:plainTextPassword1,rePassword:plainTextPassword2} = req.body

    const salt = await bcrypt.genSalt(10)
    const encryptedPassword1 = await bcrypt.hash(plainTextPassword1,salt)
    const encryptedPassword2 = await bcrypt.hash(plainTextPassword2,salt)

    try{
        await user.create({
            email, 
            password:encryptedPassword1, 
            rePassword: encryptedPassword2
        })
        res.redirect('/sellerssignin')
    }catch(error){
        console.log(error)
    }
})


app.post('/sellerssignin',async(req,res)=>{
    const {email,password} = req.body

    const userObj = await user.findOne({email})

    if(!userObj){
        res.send({error:'User doesnt exist'})
    }
    const isPasswordValid = await bcrypt.compare(password,userObj.password)
    if(isPasswordValid){
        const token = jwt.sign({
            userId: userObj._id, email:email, type:'user'}, process.env.JWT_SECRET_KEY , {expiresIn:'2h'})
        res.cookie('token',token, {maxAge:2*60*60*1000})
        res.redirect('/new')
        }
        else{
            res.redirect('/sellerssignin')
        }
  
    
})

app.get('/new',(req,res)=>{
    const {token} = req.cookies
    if(token){
        const tokenData = jwt.verify(token,process.env.JWT_SECRET_KEY)
        if(tokenData.type == 'user'){
            res.redirect('/gethomeseller')
        }else{
            res.redirect('sellerssignup')
        }
    }
    res.redirect('sellerssignup')
})


app.get('/logout',(req,res)=>{
    res.clearCookie('token')
    res.redirect('/initial')
})


const useRouter = require('./routes/user')
app.use('/users/',useRouter)

const port = process.env.PORT || 5501

app.listen(port)

console.log('server is listening on 5501')
