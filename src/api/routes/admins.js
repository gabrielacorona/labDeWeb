const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const jsonParser = bodyParser.json();
const uuid = require('uuid');
const bcrypt = require('bcrypt');


const checkAdminAuth = require('../middleware/check-admin-auth');

const { Admins } = require('./../models/admins-model');

//get all admins
router.get('/', (req, res, next) => {
    console.log("getting all admins")
    Admins
        .getAdmins()
        .then(admins => {
            res.status(200).json(admins);
        })
        .catch(err => {
            res.statusMessage = "Something went wrong while retrieving the admins";
            return res.status(500).end();
        });
});

//get admins by id
router.get('/byId', jsonParser, (req, res, next) => {
    console.log("getting admin by their id");
    let id = req.body.id;
    if(!id){
        res.statusMessage = "please send 'ID' as body";
        return res.status(406).end();
    }
    Admins
        .getAdminById(id)
        .then(user => {
            if (user === null) {
                res.statusMessage = `no admin with the provided id ${id}"`;
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

//get admins by email
router.get('/byEmail', jsonParser, (req, res, next) => {
    console.log("getting admin by email")
    let email = req.body.email;
    if (!email) {
        res.statusMessage = "please send 'Email' as  body";
        return res.status(406).end(); //not accept status
    }
    Admins
        .getAdminByEmail(email)
        .then(person => {
            if (person === null) {
                res.statusMessage = `no admin with the provided email ${email}"`;
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

router.post('/',  jsonParser, (req, res, next) => {
    Admins
        .getAdminByEmail(req.body.email)
        .then(person => {
            if (person) {
                res.statusMessage = `admin with the provided email ${req.body.email} already exists"`;
                return res.status(409).end();
            } else {
                bcrypt.hash(req.body.password, 5, (err, hash) => {
                    if (err) {
                        res.statusMessage = "Something went wrong with the DB. Try again later.";
                        return res.status(500).end();
                    } else {
                        let id = uuid.v4();
                        let email = req.body.email;
                        let password = hash;
                        let userType = "a";
                        if (!email || !password) {
                            res.statusMessage = "missing param";
                            console.log(req.body.title);
                            return res.status(406).end(); //not accept status
                        }
                        let newAdmin = {
                            id,
                            email,
                            password,
                            userType
                        };
                        Admins
                            .createAdmin(newAdmin)
                            .then(result => {
                                return res.status(201).json(result);
                            })
                            .catch(err => {
                                res.statusMessage = "Something went wrong with the DB. Try again later.";
                                return res.status(500).end();
                            })
                        }
                    })
                }
            })
            .catch(err => {
                res.statusMessage = "Something went wrong with the DB. Try again later.";
                return res.status(500).end();
            });
});



router.patch('/', jsonParser, (req, res, next) => {
    console.log("updating an admin owo")
    const {
        id,
        email,
        password,
        userType
    } = req.body;
    bcrypt.hash(password, 5, (err, hash) => {
        if (!id) {
            res.statusMessage = "missing id, verify  query"
            return res.status(406).end();
        }

        Admins
            .getAdminById(id)
            .then(adminToUpdate => {
                if (adminToUpdate.length === 0) {
                    res.statusMessage = "id not found";
                    return res.status(404).end();
                } else {
                    Admins
                        .patchAdminById(id, email, password, userType)
                        .then(result => {
                            //TODO: handling si cambió de lo que estaba guardado anteriormente y si password cambia encriptarlo, maybe coordinar con frontend?
                            if (!result) {
                                res.statusMessage = "Id not found";
                                return res.status(404).end();
                            } else {
                                res.statusMessage = "updated successfully";
                                return res.status(200).json(result);
                            }
                        })
                        .catch(err => {
                            res.statusMessage = "Something went wrong with the DB. Try again later.";
                            return res.status(500).end();
                        })
                }
            })
            .catch(err => {
                res.statusMessage = "Something went wrong with the DB. Try again later.";
                return res.status(500).end();
            })
    });
});

router.delete('/', jsonParser, (req, res, next) => {
    console.log("deleting a admin u.u")
    let id = req.body.id;
    Admins
        .getAdminById(id)
        .then(userToRemove => {
            if (userToRemove.length === 0) {
                res.statusMessage = "id not found";
                return res.status(404).end();
            } else {
                Admins
                    .deleteAdminById(id)
                    .then(result => {
                        res.statusMessage = "successfully deleted"
                        return res.status(200).end();
                    })
                    .catch(err => {
                        res.statusMessage = "Something went wrong with the DB. Try again later.";
                        return res.status(500).end();
                    });
            }
        })
        .catch(err => {
            res.statusMessage = "Something went wrong with the DB. Try again later.";
            return res.status(500).end();
        });
});

module.exports = router;
