const express = require('express');
const cors = require('cors');



const connect = require(`./config/db`)

require('dotenv').config();
const authenticate = require('./middleware/auth');

const port = process.env.PORT || 5001
const app = express();

const {Router} = require("./controllers/user.controller");
const courseRoute = require("./controllers/course.controller")

 const session = require('express-session');

app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: process.env.SESSION_SECRET 
}));

app.set('view engine', 'ejs');

app.use(express.json());
app.use(cors());

// Use the authentication middleware for all routes
app.use('/authen', authenticate);
app.use('/', Router);
app.use('/', courseRoute)

const userRoutes = require('./routes/userRoute');

app.use('/',userRoutes);

app.listen(port, async function() {
    try {
        await connect();
        console.log(`listening on port ${port}`);
    }
    catch (err) {
        console.log(err);
    }
})

