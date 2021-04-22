const path =require('path')
const express= require('express');
const mongoose  = require('mongoose');

const dotenv = require('dotenv');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const passport = require('passport');
const session = require('express-session');

//const MongoStore = require('connect-mongo')
const MongoStore = require('connect-mongodb-session')(session);
//const MongoStore = require('connect-mongo')(session)
const connectdb= require('./config/db');
const methodOverride= require('method-override');


connectdb();

//Load  config
dotenv.config({path:'./config/config.env'})

//passport config
require('./config/passport')(passport)

const app =express();

//Body parser
app.use(express.urlencoded({extended:false}))
app.use(express.json())


//method override
app.use(methodOverride(function (req, res) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    let method = req.body._method
    delete req.body._method
    return method
  }
}))

//logging
if(process.env.NODE_ENV==="development"){
    app.use(morgan('dev'))
}

//handlebars
const {formatDate,stripTags,truncate,editIcon,select} =require('./helpers/hbs')

//handlebars
app.engine('.hbs',exphbs(
  {helpers:{
    formatDate,
    truncate,
    stripTags,
    editIcon,
    select
  },
   defaultLayout:'main',
   extname:'.hbs'
  })
);
app.set('view engine','.hbs');


const store = new MongoStore({
    uri: 'mongodb+srv://Tether:tarun123@clustertether.pdixo.mongodb.net/storytask?retryWrites=true&w=majority' ,
    collection:'mySessions'
  })
  

//express middleware
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store: store
    ///dont create a session untill something is stored 
   // cookie: { secure: true } - this wont work without https
  })
)


// app.use(
//     session({
//         secret: 'story book',
//         resave: false,
//         saveUninitialized: false,
//         store: MongoStore.create({
//             mongoUrl: 'mongodb+srv://Tether:tarun123@clustertether.pdixo.mongodb.net/storytask?retryWrites=true&w=majority'
//         })
//     })
// );

//passport middleware
app.use(passport.initialize())
app.use(passport.session())

//set global variable
app.use(function(req,res,next){
  res.locals.user=req.user || null
  next();
})

// static foldder
app.use(express.static(path.join(__dirname,'public')));

///ROtues
app.use('/',require('./routes/index'));
app.use('/auth',require('./routes/auth'));
app.use('/stories',require('./routes/stories'));



const PORT =process.env.PORT || 5000

app.listen(
    PORT,
    console.log(`Sever running in ${process.env.NODE_ENV} mode on port ${PORT} -- ${process.env.MONGO_URI}`)
);
