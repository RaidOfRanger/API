const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const products = require('../schema/product_schema')
const register_user = require('../schema/register_user')
const {ObjectId} =require('mongodb')


router.post('/register', async (req, res, next) => {
    const user = new register_user(req.body)
    console.log(user)
    //generating crypted paasword
    const salt = await bcrypt.genSalt(10)
    const hashpass = await bcrypt.hash(user.password, salt)
    user.password = hashpass
    //checking in db if email id is already registered
    const record = await register_user.findOne({ email: user.email })
    // if already exist
    if (record) {
        return res.status(401).send({
            message: "Email is already exist"
        })
    } else {//else send data
       
        //sending data to db and in response sending jwt token back to frontend to save it to local storage of chrome
        user.save()
            .then((result) => {
                console.log("saved")
                res.send({
                    message: "success"
                })
            })
            .catch(err => {
                console.log("error", err)
            })
    }
})

router.post('/login',async (req, res, next) =>{
    const login = new register_user(req.body)
    register_user.findOne({email: login.email}).then(async (result) => {
        
        
        await bcrypt.compare(login.password,result.password).then(result => {
           if(result){
            console.log("back1")
            res.status(200)
            res.end()
           }
           else{
            console.log("back2")
            res.send('wrong password')
           }
        })
    }).catch(err => {
        console.log("back3")
        res.send('no user found with email')
    })
})


router.post('/add',(req, res, next) => {
    
    const addproducts = new products(req.body)
    addproducts.save()
        .then(result => {
            res.send(result)
            
        })
        .catch(err => {
            console.log(err)
        })
})

router.get('/fetchall', (req, res, next) => {

    
    products.find({}).then((result) => {
        console.log('result',result);
        res.send(result);
    }).catch(err => console.log('err',err))

})

router.patch('/update',async (req,res,next) => {

   
    const pupdate = await products.updateOne({_id:req.body._id},{$set:up})
   

    if(!pupdate){
       
        res.send(pupdate)
    }
    else{
       
        res.status(200).send('success')
        res.end()
    }
   
})

router.delete('/delete/:id', async(req,res,next)=>{

    let id  = req.params.id
    const deletedata = await products.findByIdAndDelete({_id:req.params.id})
    

    if(!deletedata){
        
        res.status(404).send("error")
    }
    else{
        res.send("data deleted")
    }
   
})


module.exports = router