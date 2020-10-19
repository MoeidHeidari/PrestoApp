/*
author : Moeid Heidari
Description: this class is used to handle requests coming to login process
 */
const auth = require('../middleware/auth');
const express = require('express');
const hasher = require('../utils/hash');
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const User = require('../models/user.js');
const mailer = require('../utils/mailer');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const config = require('config');
const router = express.Router();


/* GET login page. */
router.get('/', function (req, res, next) {

    res.render('loginRegister', {tellNumber: '+79531696641'});
});
//======================================================================================================================
/*
@author: Moeid Heidari
parameters: route name (String),Callback function (Async)
Description: this route handler is used to register a new users save in database as user collection
and generate,save and send the activation token to active the user as email to user's email address
 */
router.post('/registerUser', async (req, res) => {

    const {error} = User.validateUser(req.body);
    if (error) return res.status(402).send(error.details[0].message);

    let existedUser = await User.User.findOne({email: req.body.email});
    if (existedUser) return res.status(400).send('user already existed');


    let user = new User.User(_.pick(req.body, 'firstName', 'lastName', 'email', 'phoneNumber', 'password'));
    user.proImage='http://localhost:3000/images/proImages/DefaultProImage.png';
    hasher.hash(req.body.password).then(async (result) => {
        user.password = result;
        crypto.randomBytes(20, async (err, buf) => {
            user.activeToken = user._id + buf.toString('hex');
            user.activeExpires = Date.now() + 24 * 3600 * 1000;
            var link = 'http://localhost:3000/login/activeUser/'
                + user.activeToken;
            mailer({
                to: user.email,
                subject: 'Welcome',
                html: 'Please click <a href="' + link + '"> here </a> to activate your account. or copy this link and past it to your browser addressbar ' + link
            });
            await user.save();
            if (user) {
                res.status(200).send({location: '/activationPage/' + user.email});
            }
        });
    });


});
//======================================================================================================================
/*
@author: Moeid Heidari
parameters: route name (String),Callback function (Async)
Description: this route handler is used to active the user and set the user as an active user with activation token
 */
router.get('/activeUser/:activeToken', async (req, res, next) => {


    // find the corresponding user
    User.User.findOne({
        activeToken: req.params.activeToken
    }, function (err, user) {

        if (user.isActivated == true) {
            res.render('userActivationReportPage', {
                tellNumber: '+79531696641',
                title: 'attention',
                content: 'dear ' + user.firstName + ' ' + user.lastName + ' ' + 'your account is activated already and you can log in'
            })
        } else {
            if (err) {

                res.render('userActivationReportPage', {
                    tellNumber: '+79531696641',
                    title: 'we are sorry  :(',
                    content: 'dear ' + user.firstName + ' ' + user.lastName + ' ' + 'your account has not been activated'
                })

                return next(err);
            }

            // invalid activation code
            if (!user) {

                return res.render('message', {
                    title: 'fail to activate',
                    content: 'dear ' + user.firstName + ' ' + user.lastName + ' ' + 'Your activation link is invalid, please <a href="/login">register</a> again'
                });
            }

            // activate and save
            user.isActivated = true;

            user.save(function (err, user) {

                if (err) {
                    res.render('userActivationReportPage', {
                        tellNumber: '+79531696641',
                        title: 'we are sorry  :(',
                        content: 'there is a problem with activation please try again !'
                    });

                    return next(err);
                }

                // activation success
                res.render('userActivationReportPage', {
                    tellNumber: '+79531696641',
                    title: 'congradulations :)',
                    content: 'dear ' + user.firstName + ' ' + user.lastName + ' ' + 'your account has been activated'
                });


            });
        }

    });
});
//======================================================================================================================

/*
@author: Moeid Heidari
parameters: route name (String),Callback function (Async)
Description: this route handler is used to do the authentication for login process
 */

router.post('/auth', async (req, res, next) => {

    let user = await User.User.findOne({email: req.body.loginEmail});
    if (!user) return res.status(400).send('Invalid email or password');

    const validPassword = await bcrypt.compare(req.body.loginPassword, user.password);
    if (!validPassword) return res.status(400).send('Invalid email or password');
    if (!user.isActivated) return res.status(402).send('user is not activated yet');


    const token = user.generateAuthToken();
    const response={

        location:'/myAccount'
    };
    res.cookie('my-token', token, { maxAge: 900000, httpOnly: true });

    res.send(response);


});

//======================================================================================================================
router.post('/changePass', auth,async (req, res, next) => {

    let user = await User.User.findOne({_id:req.user._id});
    const newPassword = await bcrypt.compare(req.body.oldPassword,user.password);
    if (!newPassword) return res.status(400).send('Invalid password');
    if (!user.isActivated) return res.status(402).send('user is not activated yet');

    hasher.hash(req.body.newPassword).then(async (result)=>
    {
        user.password = result;
        if(user.save())
        {
            const token = user.generateAuthToken();
            const response={

                location:'/login'
            };
            res.cookie('my-token', token, { maxAge: 900000, httpOnly: true });

            res.send(response);

        }
        else
        {
            res.status(500).send('internal server error. please try again later');
        }

    })





});
//======================================================================================================================
/*
@author: Moeid Heidari
Description: export the routes
 */
module.exports = router;


