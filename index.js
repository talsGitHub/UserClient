require('dotenv').config();

const express = require('express');
const edge = require('edge.js');
const { config, engine } = require('express-edge');
const bodyParser = require('body-parser');
//var session = require('client-sessions');
var session = require('express-session')
var cookieParser = require('cookie-parser');


const app = express();


app.use(engine);
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


//app.use(session({secret: process.env.SECRET_KEY,saveUninitialized: true,resave: true}))


app.use(cookieParser());
app.use(session({secret: "Shh, its a secret!"}));

/*app.use(session({
    cookieName: 'session',
    secret: 'random_string_goes_here',
    duration: 30 * 60 * 1000,
    activeDuration: 5 * 60 * 1000,
  }));*/

  app.use('*', (req, res, next) => {
    edge.global('auth', req.session.token);
  
    next();
  });




const homepageController = require('./controllers/homePage');
const registerUserController = require('./controllers/registerUser');
const dashboardController = require('./controllers/dashboard');
const loginUserController = require('./controllers/loginUser');
const logoutUserController = require('./controllers/logoutUser');
const loginViewController = require('./controllers/loginView');





//middleware
const authLogin = require('./middleware/authLogin');






app.get('/test', function(req, res){
    if(req.session.page_views){
       req.session.page_views++;
       req.session.test = "hello"
       res.send("You visited this page " + req.session.page_views + " times: " + req.session.test);
    } else {
       req.session.page_views = 1;
       res.send("Welcome to this page for the first time!");
    }
 });



app.get('/', homepageController);
app.get('/dashboard', authLogin, dashboardController);
app.get('/login', loginViewController);
app.get('/auth/logout', logoutUserController);


app.post('/auth/register', registerUserController);
app.post('/auth/login', loginUserController);


app.use((req, res) => res.render('not-found'));
console.log("Listening to port " + process.env.PORT)
app.listen(process.env.PORT || 5000);