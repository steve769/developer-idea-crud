const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const User = require('../models/User')



// Register New User
//POST                  api/v1/auth/register
exports.registerUser = async (req, res)=> {
        try {
            const user = await User.create(req.body)
            const token = user.getJwtToken()
            
            res.status(201).json({
                success: true,
                msg: "Registred successfully",
                token
            })

        } catch (error) {
            return res.status(400).json({success: true, msg: "Check the data you gave: Something's not right", error})
        }
       

}
// LogIn User
//POST                  api/v1/auth/login
exports.logInUser = async (req, res)=> {
    try {
        //Pull email & Password from the req.body
        const { email, password} = req.body
        //Check if both fields are provided
        if(!email || !password){
            return res.status(400).json({success: false, msg: "Invalid credentials"})
        }

        //Query the database for the email
        const user = await User.findOne({email})
        //If no such user throw error
        if(!user){
            return res.status(400).json({success: false, msg: "Invalid credentials"})
        }
        //Check if passwords match
        const isMatch = await user.matchPasswords(password)
        //If passwords missmatch throw error
        if(!isMatch){
            return res.status(400).json({success: false, msg: "Invalid credentials"})
        }
        //Set a JWT token when logged in
        const token = user.getJwtToken()

        return res.status(200).json({
            success: true,
            msg: "Login successful",
            token,
            user
        })

    } catch (error) {
        //If Anything goes wrong 
        res.status(400).json({success: true, msg: "Login Error", error})
        console.log(error)
    }
   
}

// Get Logged In User
//GET                  api/v1/auth/me
exports.getMe = async (req, res)=> {
    try {
        let token
        if(!req.headers.authorization){
            return res.status(400).json({success: false, error})
        }
        token = req.headers.authorization.split(' ')[1]
        //Verify the JWT
        const decoded = jwt.verify(token, 'jwt123')
        //Set the stsus to 200 ok and & display the user
        const user = await User.findById(decoded.id)
        res.status(200).json({success: true, user}) 
    } catch (error) {
        return res.status(400).json({success: false, error})
    }

}
//Update User Profile
//PUT                 api/v1/auth/me/updatemyprofile
exports.updateMe = async (req, res) =>{
    try {
        let user
        //These are the fields allowed update
        const fieldsToBeUpdated = {
        name: req.body.name,
        email: req.body.email,
        gender: req.body.gender,
        phone: req.body.phone
        }
        //Check if user is exists
        user = await User.findOne({email: req.user.email})

        user = await User.findByIdAndUpdate(req.body.email, fieldsToBeUpdated,{
            new: true,
            runValidators: true,
            setDefaultsOnInsert: true
        })
            
    } catch (error) {

        res.status(400).json({success: false, msg: "Update error: Please check your data"})
    }
    
//Delete User Profile
//DELETE                 api/v1/auth/me/deletemyprofile
}
exports.deleteMyAccount =  async (req, res) =>{
    try {
        //Check user in DB
        const user = await User.findById(req.user.id)

        //Check if user exists
        if(!user){
            return res.status(400).json({success: false, msg: "Account doesnt exist"})
        }
        //If user delete document
        user.remove()
        //return success
        res.status(200).json({success: true, msg: "Account deleted successfully"})
       
    } catch (error) {
        //If anything goes wrong throw error
        return res.status(400).json({success: false, msg: "Account deletion failed"})
    }
}

//Logout User
//GET                 api/v1/auth/logout
exports.logOut = (req, res)=>{
    try {
        let token
        //Reset auth token to nothing
        if(!req.headers.authorization){
            return res.status(400).json({success: false, msg: "You cannot access this route"})
        }
        //Brag token from headers
        token = req.headers.authorization.split(' ')[1]

        //Reset token to nothing
        token = ' '

        return res.status(200).json({success: true, msg: "Logout successful"})


    } catch (error) {
        res.status(400).json({success: false, msg: "something went wrong"})
    }
}