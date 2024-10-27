const express = require('express');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../models/fetchuser.js');
const router = express.Router();
const saltRounds=10;
const jwtSecret = 'cheetahhikehde@123$'


router.post('/create', [
    body('name').isLength({ min: 3 }).withMessage('Name must be at least 3 characters long'),
    body('email').isEmail().withMessage('Please provide a valid email')
],async  (req, res) => {
    const result = validationResult(req);

    if (!result.isEmpty()) {
        return res.status(400).json({ errors: result.array() });
    }
    let user = await User.findOne({email:req.body.email});
    if(user){
        return res.status(400).json('email already exist')
    }
    const pass = req.body.password;
    const passhashed=await bcrypt.hash(pass, saltRounds);

    user=await User.create({
        name: req.body.name,
        email: req.body.email,
        password: passhashed
    })
    const token = jwt.sign({ userId: user._id }, jwtSecret);
    return res.json({
        success: true,
        message: 'registeration successful',
        Accesstoken:token,
        userID:user.id
       
        
    });
   
    
    
});
router.post('/login', [
    body('password').exists().withMessage('password must not be blank'),
    body('email').isEmail().withMessage('Please provide a valid email')
],async  (req, res) => {
    const result = validationResult(req);

    if (!result.isEmpty()) {
        return res.status(400).json({ errors: result.array() });
    }
    const {email,password}=req.body;
    try{
        let user = await User.findOne({email});
        if(!user){
            return res.status(400).json('user does not exists');
        
        }
        const passcheck =await bcrypt.compare(password,user.password);
        if(!passcheck){
            return res.status(400).json('wrong password');

        }
        const token = jwt.sign({ userId: user._id }, jwtSecret);
        return res.json({
            success: true,
            message: 'Login successful',
            Accesstoken:token,
            userID:user.id
           
            
        });

    }
    catch(error){
        console.log(error);
        res.status(400).send('some error occured');

    }
   
    
    
});



router.post('/getuser', fetchuser,async  (req, res) => {
   try {
   const userid=req.user.userId;
       const user = await User.findById(userid).select("-password");
    res.send(user);
   } catch (error) {
    console.log(error);
    res.status(500).send("internal serveer error");
   }
    
    
   
   
    
    
});
module.exports = router;
