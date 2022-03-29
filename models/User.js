const {model, Schema} = require('mongoose')
const bcrypt = require('bcryptjs')
const Idea = require('./Idea')
const jwt = require('jsonwebtoken')



//Creating the UserSchema
const UserSchema = new Schema({
    name:{
        type: String,
        required: [true, 'Please enter a name'],
        trim: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
        match: [ /^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please enter a valid email']
    },
    gender:{
        type: String,
        enum: ['male', 'female'],
        required: true
    },
    role:{
        type: String,
        default: 'user'
    },
    password:{
        type: String,
        minlength: [6, 'Password cannot be shorter than 6 characters'],
        required: [true, 'Please enter a password']
        // select: false
    },
    // ideas: [{
    //     type: mongoose.Schema.ObjectId,
    //     ref: 'Idea'

    // }],
    // address:{
    //    type:{
    //     type: String, 
    //     enum: ['Point'],
    //     required: true
    //    },
    //    coordinates:{
    //        type: [Number],
    //        required: true
    //    }
    // }
    createdAt:{
        type: Date,
        default: Date.now
    },
    phone:{
        type: String,
        unique: [true, 'Please enter a phone number'],
        match: [/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im, 'Please enter a valid phone number']
    }
}, {
    toJson: {virtuals: true},
    toObject: {virtuals: true}
})

//Hashing password before save
UserSchema.pre('save', async function(next){
   //Store the incoming data

//    if(!isModified(this.password)){
//        next()
//    }
   const user = this
   const salt = await bcrypt.genSalt(10)

   user.password = await bcrypt.hash(user.password, salt)

})

//Method to sign token
UserSchema.methods.getJwtToken = function (){
    const token = jwt.sign({id: this._id}, 'jwt123')

    return token;
}
UserSchema.methods.matchPasswords = async function (passwordProvided){
    return await bcrypt.compare(passwordProvided, this.password)
}
//Using virtuals for reverse populate
UserSchema.virtual('ideas',
{
    ref: 'Idea',
    localField:'name',
    foreignField:'postedBy',
    justOne: false
})
//Cascade delete of Ideas when user is deleted
UserSchema.pre('remove', function(next){
    Idea.remove({postedBy: this._id}).exec()
    next()
})
//Creating the User Model
const User = model('User', UserSchema);


module.exports = User;