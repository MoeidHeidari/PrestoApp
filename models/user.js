/*
@author: Moeid Heidari
Description: this is the user collection model.
 */
const Joi = require('joi');
const mongoose = require('mongoose');
const jwt=require('jsonwebtoken');
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        require: true,
        minlength: 5,
        maxlength: 50
    },
    lastName: {
        type: String,
        require: true,
        minlength: 5,
        maxlength: 50
    },
    proImage: {
        type: String,
        require: false

    },
    email: {
        type: String,
        require: true,
        minlength: 5,
        maxlength: 255,
        unique:true
    },
    phoneNumber: {
        type: String,
        require: true,
        minlength: 11,
        maxlength: 11,
        unique: false
    },
    password: {
        type: String,
        require: true,
        minlength: 8,
        maxlength: 1024
    },
    isActivated: {
        type: Boolean,
        required: true,
        default: false
    },
    activeToken: {
        type: String,
        require: false
    },
    activeExpires: {
        type: Date,
        require: false
    },
    role:{
        type: String,
        required: true,
        default:2
    }



});
userSchema.methods.generateAuthToken=function()
{
    const token=jwt.sign({_id:this._id},process.env.presto_jwtPrivateKey);
    return token;
};
//======================================================================================================================
/*
@author: Moeid Heidari
Description: Create user model corresponds with its schema.
 */
const User = mongoose.model('User', userSchema);

//======================================================================================================================
/*
@author: Moeid Heidari
parameters: user (User model)
Description: this method is used to validate the users information with a defined schema as a control policy.
*/
function validateUser(user) {
    const schema = {
        firstName: Joi.string().min(5).max(50).required(),
        lastName: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(8).max(255).required(),
        phoneNumber: Joi.string().min(11).max(11).required()
    }
    return Joi.validate(user, schema);
}

//======================================================================================================================
/*
@author: Moeid Heidari
Description: export the User model and validation method to be used outside the javascript file.
*/
exports.User = User;
exports.validateUser = validateUser;

