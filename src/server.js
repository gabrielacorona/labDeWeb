const express = require('express');

const mongoose = require('mongoose');
const morgan = require('morgan');

const multer = require('multer');
const cors = require('./middleware/cors');

const http = require('http');
const app = require('./serverApp');



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
    PORT,
    JWT_KEY
} = require('./config');
const userRoutes = require('./api/routes/users');

//app.use('/uploads', express.static('uploads'))
app.use(cors);
app.use(express.static("public"));
app.use(morgan('dev'));

////------------------>SERVER<------------------
app.listen(PORT, () => {
    console.log("This server is RUNNING ㅇㅅㅇ");

    new Promise((resolve, reject) => {
            const settings = {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true
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