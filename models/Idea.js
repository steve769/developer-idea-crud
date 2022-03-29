const mongoose = require('mongoose')

const IdeaSchema = new mongoose.Schema({
    title:{
        type:String,
        Require: true,
        unique: true
    },
    ideaCategory:{
        type: String,
        enum: ['Health', 'Technology', 'Manufacturing', 'Education', 'Security', 'Agriculture']
    },
    description:{
        type: String,
        minlength: [10, 'Description should be at least 10 characters'],
        required: true
    },
    languages:{
        type: [String],
        enum: ['JavaScript', 'HTML & CSS', 'Java', 'GoLang', 'C#', 'Swift', 'Kotlin', 'Ruby'],
        required: true
    },
    estimatedTimeInMonths:{
        type: Number,
        required: true
    },
    requiresCollaboration:{
        type: Boolean,
        default: true
    },
    discordLink:{
        type: String,
        required: true
    },
    createdAt:{
        type: Date,
        default: Date.now
    },
    postedBy: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'

    },
    collaborators: {
        type: [String]
    },
})

const Idea = mongoose.model('Idea', IdeaSchema)

module.exports = Idea;