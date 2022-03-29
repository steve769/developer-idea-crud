const User = require('../models/User');

// Private  GET /api/v1/users  
// Desription - Gets All Users from the DB
exports.getUsers = async (req, res, next) =>{
    try {
        //Query to get all users in DB
        const users = await User.find(req.query);
        return res.status(200).json({success: true, count: users.length, data: users});
    } catch (error) {

        //Returning error incase something goes wrong
        res.status(500).json({success: false, msg: "Something went wrong with the server",  error});
    }
  
}

// Private  GET /api/v1/user/:id 
// Desription - Gets A single user from the DB by ID
exports.getUser = async (req, res) =>{
    try {
        //Query for user by Object ID
        const user = await User.findById(req.params.id);
        //If correct Object ID format but no user
        if(!user){
            //Return 200 but with empty object
           return res.status(200).json({success:true, data:{}})
        }

        return res.status(200).json({success: true, data: user})
    } catch (error) {
        res.status(404).json({success: false, error: `${error.message}`})
    }

}

// Public  POST /api/v1/users
// Desription - Adds user data to the DB
exports.addUser = async (req, res, next) =>{

    try {
        const user = await User.create(req.body);

         //201 for creating a resource
        return res.status(201).send({success: true, data: user});

    } catch (error) {
        res.status(400).send({success: false, data: "Something went wrong check your data", msg : `${error.message}`})
      
    }
    
    
   
    
}

// Private  PUT /api/v1/user/:id 
// Desription - Updates users data in the DB
exports.updateUser = async (req, res, next) =>{
try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        setDefaultsOnInsert: true
    })
    if(!user){
        return res.status(400).json({success: false, error:"Cant update user"})
    }

    return res.status(200).json({success: true, data: user})

} catch (error) {
    res.status(400).json({success: false, error: `${error.message}`})
}

}

// Private  DELETE /api/v1/user/:id 
// Desription - Deletes user data from the DB
exports.deleteUser = async (req, res, next) =>{

    try {
        await User.findByIdAndDelete(req.params.id)

        return res.status(200).json({success: true, msg: `user id ${req.params.id} deleted`})
    } catch (error) {
        res.status(400).json({success: false, msg: `User delete failed`})
    }

}