/*
author : Moeid Heidari
Description: this class is used to handle requests coming to manage the personal account
 */
const auth = require('../middleware/auth');
const express= require('express');
const router= express.Router();

/* GET login page. */
router.get('/', auth,function (req, res, next) {


    res.render('myAccount', {tellNumber: '+79531696641'});
});

//======================================================================================================================
/*
@author: Moeid Heidari
parameters: route name (String),Callback function (Async)
Description: this route handler is used to do the authentication for logout process
 */
router.get('/logout', auth,async (req, res, next) => {

    const response={

        location:'/login'
    };
    res.cookie('my-token', '',{expires: new Date(0)});

    res.send(response);


});

module.exports = router;