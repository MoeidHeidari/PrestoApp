/*
@author: Moeid Heidari
Description: this rout will render the home page to user.
 */
const express = require('express');
const router = express.Router();
const visitorsMiddlware=require('../middleware/Visitors');
//======================================================================================================================

/*@author: Moeid Heidari
parameters: route name (String),Callback function (Async)
Description: this route handler is used to render the home page.
*/
/* GET home page. */
router.get('/', visitorsMiddlware,async (req, res, next)=> {
    res.render('home', {tellNumber: '+79531696641'});
});
//======================================================================================================================
module.exports = router;
