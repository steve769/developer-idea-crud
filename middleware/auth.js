const jwt = require('jsonwebtoken')
const User = require('../models/User')


exports.protect = async  (req, res, next) =>{
    try{
    //Initialize a token var
    let token
    //Check if a token is formatted correctly
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        //Extract token string
        token = req.headers.authorization.split(' ')[1]
    }

    if(!token){
        //If no token throw err
        return res.status(403).json({success: false, msg: "Protected route"})
    }
    //Verify the JWT
    const decoded = jwt.verify(token, 'jwt123')
    //Query the database for the user then save it on req.user    !IMPORTANT
    req.user = await User.findById(decoded.id)
    //Move execution along
    next()
    }catch (error){
        return res.status(403).json({success: false, msg: "Protected Route: Something went wrong"})
    }

}
