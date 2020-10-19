//===================================================member variables===================================================
const config=require('config');
require('dotenv').config()
const createError = require('http-errors');
const express = require('express');
var bodyParser = require('body-parser');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const activationRouter = require('./routes/activationPage');
const login_register_Router = require('./routes/login');
const my_account_Router = require('./routes/myAccount');
const app = express();
//====================================================middleware===================================================

// view engine setup
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login', login_register_Router);
app.use('/activationPage', activationRouter);
app.use('/myAccount', my_account_Router);

//===================================================check environment variables definition===================================
if(!process.env.presto_jwtPrivateKey)
{
    console.error("FATAL ERROR: jwtPrivateKey is not defined");
    process.exit(1);
}
//===================================================database connection======================================================
const option={
    useNewUrlParser: true,
    useUnifiedTopology: true
};


mongoose.connect("mongodb://localhost/prestodb")
    .then(() => console.log('connected to mongodb...'))
    .catch(() => console.log('could not connect to mongodb...'))
//====================================================error catcher methods===============================================

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('404');
});
//========================================================export app===============================================
module.exports = app;
