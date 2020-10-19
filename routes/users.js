const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {User, validate} = require('../models/user.js');
var formidable = require('formidable');
var base64Img = require('base64-img');
/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});
//======================================================================================================================
router.post('/addUser', function (req, res, next) {
});
//======================================================================================================================
router.get('/me', auth, async (req, res, next) => {
    const user = await User.findById(req.user._id).select('-password -isActivated -_id -activeToken -activeExpires');

    res.send(user);

});
//======================================================================================================================
router.post('/updateUserInfo',auth,async (req,res,next)=>
{

    console.log(req.body);
    let user=await User.findById(req.user._id);
    user.firstName=req.body.firstName;
    user.lastName=req.body.lastName;
    user.email=req.body.email;
    user.phoneNumber=req.body.phoneNumber;



    if(user.save())
    {
        res.send('user has been updated successfully');
    }
    else {
        res.status(400).send('invalidate information');
    }





});
//======================================================================================================================
router.post('/changeProImage',auth, async (req, res, next) =>
{

    base64Img.img(req.body.image, './public/images/proImages/', req.user._id, async (err, filepath)=>
    {
        let user=await User.findById(req.user._id);
        user.proImage='http://localhost:3000/images/proImages/'+user._id+'.jpg';
        user.save();
        res.send('image changed successfully');
    });



});
//======================================================================================================================
module.exports = router;
