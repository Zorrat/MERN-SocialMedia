const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require("morgan");
const expressValidator = require('express-validator');
const cookieParser = require('cookie-parser')
const fs = require('fs');
const cors = require('cors')

// import mongoose
const mongoose = require('mongoose');
// load env variables
const dotenv = require('dotenv');
dotenv.config()

//db connection
mongoose
    .connect(process.env.MONGO_URI, {
        useNewUrlParser: true
    })
    .then(() => console.log('DB Connected'));

mongoose.connection.on('error', err => {
    console.log(`DB connection error: ${err.message}`);
});

// Bring in routes
const postRoutes = require('./routes/post');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');

//apiDocs
app.get('/', (req,res) => {
    fs.readFile('docs/apiDocs.json',(err,data) => {
        if(err){
            res.status(400).json({error:err});
        }
        const docs = JSON.parse(data);
        res.json(docs);
    });
});

//Use middleware
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());
app.use(cors());
app.use("/",postRoutes);
app.use("/",authRoutes);
app.use("/",userRoutes);

app.use(function (err,req,res,next){
    if (err.name === "UnauthorizedError"){
        res.status(401).json({
            error:"Unauthorized. Please Login First!"
        });
    }
});

const port = 8090;
app.listen(port , () => {
    console.log(`A Node Js API is listening on port: ${port}`);
}); 