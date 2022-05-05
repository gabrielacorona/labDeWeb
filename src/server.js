const express = require('express');

const mongoose = require('mongoose');
const morgan = require('morgan');

const multer = require('multer');
var cors = require('../src/api/middleware/cors');
const bodyParser = require("body-parser");

const http = require('http');
const app = express();
require('dotenv').config()




const fs = require('fs')



let today = new Date();
let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
let dateTime = date + ' ' + time;

//used for fotos later
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, './uploads/')
//     },
//     filename: function (req, file, cb) {
//         cb(null, dateTime + " " + file.originalname)
//     }
// });
var storage = multer.memoryStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, dateTime + " " + file.originalname)
    }
});


const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

const upload = multer({
    storage: storage,
    limits: {
        //5mb limit
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});

const {
    DATABASE_URL,
    PORT
} = require('./config');

// TODO: handle foto uploads con S3? no borrar abajo
//app.use('/uploads', express.static('uploads'))
////------------------>ENDPOINTS ROUTING<------------------
const adminsRoutes = require('./api/routes/admins');
const fotosRoutes = require('./api/routes/fotos');
const moldesRoutes = require('./api/routes/moldes');
const pagosRoutes = require('./api/routes/pagos');
const reportesRoutes = require('./api/routes/reportes');
const userRoutes = require('./api/routes/users');

app.use('/admins', adminsRoutes);
app.use('/fotos', fotosRoutes);
app.use('/moldes', moldesRoutes);
app.use('/pagos', pagosRoutes);
app.use('/reportes', reportesRoutes);
app.use('/users', userRoutes);



app.use(cors);
app.use(express.static("public"));
app.use(morgan('dev'));
app.use(express.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req, res, next) => {
    const error = new Error("not found");
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500 );
    res.json({
        error:{
            message:error.message
        }
    });
})

////------------------>SERVER<------------------
app.listen(PORT, () => {
    console.log("This server is RUNNING ㅇㅅㅇ");

    new Promise((resolve, reject) => {
            const settings = {
                useNewUrlParser: true,
                useUnifiedTopology: true
            };

            mongoose.connect(DATABASE_URL, settings, (err) => {
                if (err) {
                    return reject(err);
                } else {
                    console.log("Database connected successfully :^)")
                    return resolve();
                }
            })
        })
        .catch(err => {
            mongoose.disconnect();
            console.log(err);
        });
});