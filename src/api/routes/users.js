const bodyParser = require('body-parser');
const express = require('express');
const router = express.Router();
const jsonParser = bodyParser.json();
const checkAdmin = require('./../middleware/check-admin-auth');
const uuid = require('uuid');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const {Users} = require('./../models/users-model');

//get all users
router.get('/', (req, res, next) => {
    console.log("getting all users")
    Users
        .getUsers()
        .then(users => {
            res.status(200).json(users);
        })
        .catch(err => {
            res.statusMessage = "Something went wrong while retrieving the users";
            return res.status(500).end();
        });
});

//get users by id
router.get('/byId', (req, res, next) => {
    console.log("getting user by their id");
    console.log(req.body)
    let id = req.body.id;
    if(!id){
        res.statusMessage = "please send 'ID' as a param";
        return res.status(406).end();
    }
    console.log("questapasando",id);
    Users
        .getUserById(id)
        .then(user => {
            if (user.length === 0) {
                res.statusMessage = `no user with the provided id ${id}"`;
                return res.status(404).end();
            } else {
                return res.status(200).json(user);
            }
        })
        .catch(err => {
            res.statusMessage = "Something went wrong with the DB. Try again later.";
            return res.status(500).end();
        });
});

//get users by email
router.get('/byEmail/', (req, res, next) => {
    console.log("getting user by email")
    let email = req.params.email;
    if (!email) {
        res.statusMessage = "please send 'Email' as a param";
        return res.status(406).end(); //not accept status
    }
    Users
        .getUserByEmail(email)
        .then(person => {
            if (person.length === 0) {
                console.log(person)
                res.statusMessage = `no user with the provided email ${email}"`;
                return res.status(404).end();
            } else {
                return res.status(200).json(person);
            }
        })
        .catch(err => {
            res.statusMessage = "Something went wrong with the DB. Try again later.";
            return res.status(500).end();
        });
});

//TODO: hacer config para que solo admin o cliente de misma compañía puedan hacer users
//router.post('/', checkAdmin, jsonParser, (req, res, next) => {
router.post('/', jsonParser, (req, res, next) => {
    bcrypt.hash(req.body.password, 5, (err, hash) => {
        if (err) {
            res.statusMessage = "Something went wrong with the DB. Try again later.";
            return res.status(500).end();
        } else {
            let id = uuid.v4();
            let firstName = req.body.firstName;
            let lastName = req.body.lastName;
            let email = req.body.email;
            let password = hash;
            let company = req.body.company;
            let telephone = req.body.telephone;
            let userPicture = "pendiente";
            let companyPicture = "pendiente";
            let lastReportDate = req.body.lastReportDate;
            let memberSince = req.body.memberSince;
            let userType = " ";
            let pagos = [];
            let reportes = [];
            let moldes = [];
            let operadores = [];
            if (!email || !password) {
                res.statusMessage = "missing param";
                console.log(req.body.title);
                return res.status(406).end(); //not accept status
            }
            let newUser = {
                id,
                firstName,
                lastName,
                email,
                password,
                company,
                telephone,
                userPicture,
                companyPicture,
                lastReportDate,
                memberSince,
                userType,
                pagos,
                reportes,
                moldes,
                operadores
            };
            console.log(newUser)
            Users
                .createUser(newUser)
                .then(result => {
                    return res.status(201).json(result);
                })
                .catch(err => {
                    res.statusMessage = "Something went wrong with the DB. Try again later.";
                    return res.status(500).end();
                })
        }
    })
});


router.patch('/:userId', (req, res, next) => {
    res.status(200).json({
        message: "user updates",
    });
});

router.delete('/:userId', (req, res, next) => {
    res.status(200).json({
        message: "deleting user"
    });
});

module.exports = router;
