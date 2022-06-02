const bodyParser = require('body-parser');
const express = require('express');
const router = express.Router();
const jsonParser = bodyParser.json();
const checkAdmin = require('./../middleware/check-admin-auth');
const uuid = require('uuid');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const { Users } = require('./../models/users-model');
const {Reportes} = require('./../models/reportes-model');
const {Moldes} = require('./../models/moldes-model');
const {Pagos} = require('./../models/pagos-model');
const { JWT_KEY } = require('../../config');

const checkUserAuth = require('../middleware/check-user-auth');
const checkAdminAuth = require('./../middleware/check-admin-auth');
const checkClienteAuth = require('./../middleware/check-cliente-auth');

//get all users
router.get('/', checkAdminAuth, (req, res, next) => {
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

//get cliente
router.get('/clientes', checkAdminAuth, (req, res, next) => {
    console.log("getting all clientes")
    Users
        .getClientes()
        .then(users => {
            res.status(200).json(users);
        })
        .catch(err => {
            res.statusMessage = "Something went wrong while retrieving the users";
            return res.status(500).end();
        });
});

//get users by company
router.get('/company/:company', checkAdminAuth, jsonParser, (req, res, next) => {
    console.log("getting user by their company");
    let id = req.params.company;
    if(!id){
        res.statusMessage = "please send 'company' as body";
        return res.status(406).end();
    }
    Users
        .getUsersByCompany(id)
        .then(user => {
            if (user === null || user.length == 0 ) {
                res.statusMessage = `no user with the provided company ${company}"`;
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

//get users by user
router.get('/getOperadores/:userId', checkClienteAuth, jsonParser, (req, res, next) => {
    console.log("getting user by their user");
    let id = req.params.userId;
    if(!id){
        res.statusMessage = "please send 'user' as body";
        return res.status(406).end();
    }
    Users
        .getUsersByUser(id)
        .then(users => {
            if (users === null || users.length == 0 ) {
                res.statusMessage = `no users with the provided userId`;
                return res.status(404).end();
            } else {
                return res.status(200).json(users);
            }
        })
        .catch(err => {
            res.statusMessage = "Something went wrong with the DB. Try again later.";
            return res.status(500).end();
        });
});

router.get('/getReportes/:userId', checkAdminAuth, jsonParser, (req, res, next) => {
    console.log("getting reportes by their user");
    let id = req.params.userId;
    if(!id){
        res.statusMessage = "please send 'user' as body";
        return res.status(406).end();
    }
    Users
        .getReportesByUser(id)
        .then(reporteIds => {
            if (reporteIds === null || reporteIds.length == 0 ) {
                res.statusMessage = `no reportes with the provided userId`;
                return res.status(404).end();
            } else {
                Reportes
                .populateReportes(reporteIds)
                .then(reportes => {
                    return res.status(200).json(reportes);
                })
                .catch(err =>{
                    res.statusMessage = "Something went wrong with the DB. Try again later.";
                    return res.status(500).end();
                })
            }
        })
        .catch(err => {
            res.statusMessage = "Something went wrong with the DB. Try again later.";
            return res.status(500).end();
        });
});

router.get('/getMoldes/:userId', checkAdminAuth, jsonParser, (req, res, next) => {
    console.log("getting moldes by their user");
    let id = req.params.userId;
    if(!id){
        res.statusMessage = "please send 'user' as body";
        return res.status(406).end();
    }
    Users
        .getMoldesByUser(id)
        .then(moldeIds => {
            if (moldeIds === null || moldeIds.length == 0 ) {
                res.statusMessage = `no moldes with the provided userId`;
                return res.status(404).end();
            } else {
                Moldes
                .populateMoldes(moldeIds)
                .then(moldes => {
                    return res.status(200).json(moldes);
                })
                .catch(err =>{
                    res.statusMessage = "Something went wrong with the DB. Try again later.";
                    return res.status(500).end();
                })
            }
        })
        .catch(err => {
            res.statusMessage = "Something went wrong with the DB. Try again later.";
            return res.status(500).end();
        });
});

router.get('/getPagos/:userId', checkAdminAuth, jsonParser, (req, res, next) => {
    console.log("getting pagos by their user");
    let id = req.params.userId;
    if(!id){
        res.statusMessage = "please send 'user' as body";
        return res.status(406).end();
    }
    Users
        .getPagosByUser(id)
        .then(pagoIds => {
            if (pagoIds === null || pagoIds.length == 0 ) {
                res.statusMessage = `no pagos with the provided userId`;
                return res.status(404).end();
            } else {
                Pagos
                .populatePagos(pagoIds)
                .then(pagos => {
                    return res.status(200).json(pagos);
                })
                .catch(err =>{
                    res.statusMessage = "Something went wrong with the DB. Try again later.";
                    return res.status(500).end();
                })
            }
        })
        .catch(err => {
            res.statusMessage = "Something went wrong with the DB. Try again later.";
            return res.status(500).end();
        });
});

//get users by id
router.get('/id/:id', jsonParser, (req, res, next) => {
    //console.log("getting user by their id", req.params.id);
    let id = req.params.id;
    if(!id){
        res.statusMessage = "please send 'ID' as body";
        return res.status(406).end();
    }
    Users
        .getUserById(id)
        .then(user => {
            if (user === null) {
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

router.get('/mongoId/:id', checkUserAuth, jsonParser, (req, res, next) => {
    //console.log("getting user by their id");
    let id = req.params.id;
    if(!id){
        res.statusMessage = "please send 'ID' as body";
        return res.status(406).end();
    }
    Users
        .getUserByMongoId(id)
        .then(user => {
            if (user === null) {
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
router.get('/email/:email',  checkAdminAuth, jsonParser, (req, res, next) => {
    console.log("getting user by email")
    let email = req.params.email;
    if (!email) {
        res.statusMessage = "please send 'Email' as  body";
        return res.status(406).end(); //not accept status
    }
    Users
        .getUserByEmail(email)
        .then(person => {
            if (person === null) {
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

//TODO: agregar signIn para admins tmbn
router.post('/signIn', jsonParser, (req, res, next) => {
    let email = req.body.email
    let password = req.body.password
    Users
        .getUserByEmail(email)
        .then(user => {
            if (user.length === 0) {
                res.statusMessage = "Auth failed.";
                return res.status(401).end();
            }
            bcrypt.compare(password, user.password, (err, result) => {
                if (err) {
                    res.statusMessage = "Auth failed.";
                    return res.status(401).end();
                }
                if (result) {
                    const token = jwt.sign({
                        id: user.id,
                        email: user.email,
                        company: user.company,
                        userType: user.userType
                    }, JWT_KEY, {
                        expiresIn: "1h"
                    });
                    res.statusMessage = "Auth successful.";
                    //console.log(token)
                    result = {
                        id: user.id,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        email: user.email,
                        password: user.password,
                        company: user.company,
                        telephone: user.telephone, 
                        userPicture: user.userPicture,
                        companyPicture: user.companyPicture,
                        lastReportDate: user.lastReportDate,
                        memberSince: user.memberSince,
                        userType: user.userType,
                        token: token
                    }
                    return res.status(200).json(result);
                }
                res.statusMessage = "Auth failed.";
                return res.status(401).end();
            });
        })
        .catch(err => {
            console.log(err)
            res.statusMessage = "Something went wrong with the DB. Try again later.";
            return res.status(500).end();
        });
});

router.patch('/addOperador', jsonParser, (req, res, next) => {
    const {
        userId,
        operadorId
    } = req.body;
    if(!userId || !operadorId){
        res.statusMessage = "missing id, verify  query"
        return res.status(406).end();
    }
    Users
       .getUserById(operadorId)
       .then(operador => {
        if (operador.length === 0) {
            res.statusMessage = "operadorId not found";
            return res.status(404).end();
        } else {
            Users
                .addOperador(userId, operador._id)
                .then(result =>{
                    return res.status(201).json(result);
                })
                .catch(err => {
                    res.statusMessage = "Something went wrong with the DB. Try again later.";
                    return res.status(500).end();
                });
        }
       })
       .catch(err =>{
            res.statusMessage = "Something went wrong with the DB. Try again later.";
            return res.status(500).end();
       });
});

router.patch('/addReporte', jsonParser, (req, res, next) => {
    const {
        userId,
        reporteId
    } = req.body;
    if(!userId || !reporteId){
        res.statusMessage = "missing id, verify  query"
        return res.status(406).end();
    }
    Reportes
       .getReporteById(reporteId)
       .then(reporte => {
        if (reporte.length === 0) {
            res.statusMessage = "reporteId not found";
            return res.status(404).end();
        } else {
            Users
                .addReporte(userId, reporte._id)
                .then(result =>{
                    return res.status(201).json(result);
                })
                .catch(err => {
                    res.statusMessage = "Something went wrong with the DB. Try again later.";
                    return res.status(500).end();
                });
        }
       })
       .catch(err =>{
            res.statusMessage = "Something went wrong with the DB. Try again later.";
            return res.status(500).end();
       });
});

router.patch('/addMolde', jsonParser, (req, res, next) => {
    const {
        userId,
        moldeId
    } = req.body;
    if(!userId || !moldeId){
        res.statusMessage = "missing id, verify  query"
        return res.status(406).end();
    }
    Moldes
       .getMoldeById(moldeId)
       .then(molde => {
        if (molde.length === 0) {
            res.statusMessage = "moldeId not found";
            return res.status(404).end();
        } else {
            Users
                .addMolde(userId, molde._id)
                .then(result =>{
                    return res.status(201).json(result);
                })
                .catch(err => {
                    res.statusMessage = "Something went wrong with the DB. Try again later.";
                    return res.status(500).end();
                });
        }
       })
       .catch(err =>{
            res.statusMessage = "Something went wrong with the DB. Try again later.";
            return res.status(500).end();
       });
});

router.patch('/addPago', jsonParser, (req, res, next) => {
    const {
        userId,
        pagoId
    } = req.body;
    if(!userId || !pagoId){
        res.statusMessage = "missing id, verify  query"
        return res.status(406).end();
    }
    Pagos
       .getPagoById(pagoId)
       .then(pago => {
        if (pago.length === 0) {
            res.statusMessage = "pagoId not found";
            return res.status(404).end();
        } else {
            Users
                .addPago(userId, pago._id)
                .then(result =>{
                    return res.status(201).json(result);
                })
                .catch(err => {
                    res.statusMessage = "Something went wrong with the DB. Try again later.";
                    return res.status(500).end();
                });
        }
       })
       .catch(err =>{
            res.statusMessage = "Something went wrong with the DB. Try again later.";
            return res.status(500).end();
       });
});

//TODO: hacer config para que solo cliente de misma compañía puedan crear users
router.post('/',  jsonParser, (req, res, next) => {
    Users
        .getUserByEmail(req.body.email)
        .then(person => {
            if (person) {
                res.statusMessage = `User with the provided email ${req.body.email} already exists"`;
                return res.status(409).end();
            } else {
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
                        let userType =req.body.userType;
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
                }
            })
            .catch(err => {
                res.statusMessage = "Something went wrong with the DB. Try again later.";
                return res.status(500).end();
            });
});


router.patch('/', checkClienteAuth, jsonParser, (req, res, next) => {
    console.log("updating a user owo")
    const {
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
        userType
    } = req.body;
    bcrypt.hash(password, 5, (err, hash) => {
        if (!id) {
            res.statusMessage = "missing id, verify  query"
            return res.status(406).end();
        }

        Users
            .getUserById(id)
            .then(userToUpdate => {
                if (userToUpdate.length === 0) {
                    res.statusMessage = "id not found";
                    return res.status(404).end();
                } else {
                    Users
                        .patchUserById(id, firstName, lastName, email, hash, company, telephone, userPicture, companyPicture, lastReportDate, memberSince, userType)
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

router.delete('/', checkClienteAuth, jsonParser, (req, res, next) => {
    //TODO: agregar middleware de checar que user sea cliente o admin
    console.log("deleting a user u.u")
    let id = req.body.id;
    //console.log(req.headers)
    Users
        .getUserById(id)
        .then(userToRemove => {
            if (userToRemove.length === 0) {
                res.statusMessage = "id not found";
                return res.status(404).end();
            } else {
                Users
                    .deleteUserById(id)
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
