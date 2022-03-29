const Idea = require('../models/Idea');
const User = require('../models/User');


// Public  GET /api/v1/ideas 
// Description - Gets All ideas from the DB
exports.getIdeas = async (req, res) =>{
    
    try {
        //Query to get all ideas in DB
        const ideas = await Idea.find(req.query);
        return res.status(200).json({success: true, count: ideas.length, data: ideas});
    } catch (error) {

        //Returning error incase something goes wrong
        res.status(500).json({success: false, msg: "Something went wrong with the server"});
    }

  
}

// Public  GET /api/v1/idea/:id 
// Description - Gets A single idea from the DB by its ID
exports.getIdea = async (req, res, next) =>{
    try {
        //Query for user by Object ID
        const idea = await Idea.findById(req.params.id);
        //If correct Object ID format but no user
        if(!idea){
            //Return 200 but with empty object
           return res.status(200).json({success:true, data:{}})
        }

        return res.status(200).json({success: true, data: idea})
    } catch (error) {
        res.status(404).json({success: false, error: `${error.message}`})
    }

}

// Private  POST /api/v1/ideas
// Description - Adds idea data to the DB
exports.addIdea = async (req, res, next) =>{

    try {
        //Copy whats in the req.body and add to it the id of poster
        const ideaData ={
            ...req.body,
            postedBy: req.user._id
        }
        //Create the idea in DB
        const idea = await Idea.create(ideaData);

         //201 for creating a resource
        return res.status(201).send({success: true, data: idea});

    } catch (error) {
        //If things go wrong invoke error
        res.status(400).send({success: false, data: "Something went wrong check your data", msg : `${error.message}`})
    }
    
    
   
    
}

// Private  PUT /api/v1/idea/:id 
// Desription - Updates idea data in the DB
exports.updateIdea = async (req, res, next) =>{
try {
    //Query the DB for idea
    let idea = await Idea.findById(req.params.id)
    //If idea isnt found throw error
    if(!idea){
        return res.status(400).json({success: false, error:"Cant update idea"})
    }
    //Check idea ownership
    if(req.user.id !== idea.postedBy.toString()){
        return res.status(401).json({success: false, msg: "Update not authorized"})

    }
    //Set the idea to the updated idea
    idea = await Idea.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    })
    //Return success
    return res.status(200).json({success: true, data: idea})

} catch (error) {
    //If things go wrong catch error here
    res.status(400).json({success: false, error: `${error.message}`})
}

}

// Private  DELETE /api/v1/idea/:id 
// Description - Deletes idea data from the DB
exports.deleteIdea = async (req, res, next) =>{

    try {
        //Get the idea from the db
        const idea = await Idea.findById(req.params.id)
        if(!idea){
            return res.status(400).json({success: false, msg: `The idea with id ${req.params.id} doesnt exist`})
        }
        //Check idea ownership
        if(req.user.id !== idea.postedBy.toString()){
            return res.status(401).json({success: false, msg: "Update not authorized"})
    
        }
        await Idea.findByIdAndDelete(req.params.id)

        return res.status(200).json({success: true, msg: `Idea id ${req.params.id} deleted`})
    } catch (error) {
        res.status(400).json({success: false, msg: `Idea delete failed`})
    }

}
// Private  GET /api/v1/ideas/mine 
// Description - Gets all ideas for postedBy a particular user
exports.getIdeasByUser = async(req, res) =>{
    try {
        console.log(req.user);
        //Query DB to get ideas
        //const ideasByUser = await Idea.find({postedBy: req.user._id})

        
        return res.status(200).json({ok: true})
        
    } catch (error) {

        //Returning error incase something goes wrong
        res.status(500).json({success: false, msg: "Something went wrong with the server"});
    }

}