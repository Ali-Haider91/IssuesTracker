const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./DB/index.js')
require('dotenv').config();
const issuesRouter = require('./Routes/issue.route.js');
const app = express();


app.use(bodyParser.json());


connectDB()

//  Routes
app.use('/api/issues', issuesRouter);

// app.get('/', (req, res)=> {
//     res.send('Hello World');
//   });
app.listen(process.env.PORT,()=>{
    console.log(`Running Port is ${process.env.PORT}` );
   });
