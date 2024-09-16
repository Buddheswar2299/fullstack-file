const express = require('express')
const user = require('../models/user')
const router = express.Router()

// router.get('/',async(req,res)=>{
    
//     const userData = await user.find()

//     res.status(200).json({data:userData})

// })


router.post('/new',async(req,res)=>{
    const newUser = new user({email: req.body.email,password:req.body.password,rePassword:req.body.rePassword})

    newUser.save()
    res.status(200).json({message:'A new user is created to the database'})
})

router.get('/',async(req,res)=>{
    const usersData = await user.find()

    res.status(200).json({data:usersData})
})

router.get('/:id',async(req,res)=>{
    const usersData = await user.findById(req.params.id)
    if(usersData){
        res.status(200).json({data:usersData})
    }
})

router.patch('/update/:id',async(req,res)=>{
    const userData = await user.findById(req.params.id)
    console.log(userData)
    // console.log(req.body.userName)
    userData.userName = req.body.userName
    await userData.save()
    res.status(200).json({message: 'user detailes updated'})
})

router.delete('/delete/:id',async(req,res)=>{
    const userData = await user.findOneAndDelete(req.params.id)
    res.status(200).json({message:'selected id is deleted'})
})



module.exports = router