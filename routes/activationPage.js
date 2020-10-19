/*
@author: Moeid Heidari
Description: this rout will render the users activation page.
 */
const express = require('express');
const router = express.Router();

/*@author: Moeid Heidari
parameters: route name (String),Callback function (Async)
Description: this route handler is used to render the user activation page.
*/
/* GET home page. */
router.get('/:email', async (req, res, next)=> {
    res.render('activationPage', {tellNumber: '+79531696641', email: req.params.email});
});
//======================================================================================================================

module.exports = router;