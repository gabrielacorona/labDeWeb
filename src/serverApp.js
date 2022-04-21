
const express = require('express');
const app = express();


const userRoutes = require('./api/routes/routes/users');

app.use('/users',userRoutes);

// app.use((req, res, next)=>{
//     res.status(200).json({
//         message: "This server is RUNNING ㅇㅅㅇ"
//     });
// });



module.exports = app;