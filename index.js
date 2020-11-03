const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
//import routes
const authRoute = require('./routes/auth');
const postRout = require('./routes/posts');


dotenv.config();

//connect DB
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
 console.log('connect to database!')
})





// Middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());


//route middleware
app.use('/api/user', authRoute);
app.use('/api/posts', postRout);

app.listen(3000, () => console.log('Server up and running'));
