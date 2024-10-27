const jwt = require('jsonwebtoken');
const jwtSecret = 'cheetahhikehde@123$'

const fetchuser =(req,res,next)=>{
    const token = req.header("auth");
    if(!token){
       return  res.status(401).send('bad-request');

    }
    try {
        const userdata=  jwt.verify(token,jwtSecret);
        req.user=userdata;
        next();
    
    } catch (error) {
        console.error(error);
        return  res.status(401).send('bad-request');

    }

}
module.exports=fetchuser;