const bodyParser = require('body-parser');
const express = require('express');
const router = express.Router();
const uuid = require('uuid');
const jsonParser = bodyParser.json();

const {Pagos} = require('./../models/pagos-model');


const checkAdminAuth = require('./../middleware/check-admin-auth');
const checkClienteAuth = require('./../middleware/check-cliente-auth');


router.get('/', checkAdminAuth, (req, res, next) => {
    console.log("getting all pagos")
    Pagos
        .getPagos()
        .then(pagos => {
            res.status(200).json(pagos);
        })
        .catch(err =>{
            res.statusMessage = "Something went wrong while retrieving the pagos";
            return res.status(500).end();
        });
});

router.post('/', checkAdminAuth, jsonParser, (req, res, next) => {
    let id = uuid.v4();
    let fecha = req.body.fecha;
    let ultimoPago = req.body.ultimoPago;
    let cobroPorMes = req.body.cobroPorMes;
    let dirFactura = req.body.dirFactura;
    let deuda = req.body.deuda;
    let cliente = req.body.cliente;
    let newPago = {
        id,
        fecha,
        ultimoPago,
        cobroPorMes,
        dirFactura,
        deuda,
        cliente
    };
    console.log(newPago);
    Pagos
        .createPago(newPago)
        .then(result => {
            return res.status(201).json(result)
        })
        .catch(err => {
            res.statusMessage = "Something went wrong wrong with the DB. Try again later.";
            return res.status(500).end()
        });
});

router.get('/id/:id', checkAdminAuth, jsonParser, (req, res, next) => {
    const id = req.params.id;
    Pagos
        .getPagoById(id)
        .then(result => {
            return res.status(201).json(result)
        })
        .catch(err => {
            res.statusMessage = "Could not find Pago with that Id";
            return res.status(500).end()
        })
});

// param cliente: id del usuario que es el cliente
router.get('/cliente/:cliente', checkClienteAuth, jsonParser,(req, res, next) => {
    const cliente = req.params.cliente;
    Pagos
        .getPagosByUserId(cliente)
        .then(result => {
            return res.status(201).json(result)
        })
        .catch(err => {
            res.statusMessage = "Could not find company with that Id";
            return res.status(500).end()
        })
    
});

router.get('/company/:company', checkClienteAuth, jsonParser, (req, res, next) => {
    const company = req.params.company;
    if (company == ""){
        res.status(404).json({
            message: "No hay compañía"
        });
        return res;
    }
    else{
        Pagos
            .getPagosByCompany(company)
            .then(result => {
                return res.status(201).json(result)
            })
            .catch(err => {
                res.statusMessage = "Could not find company";
                return res.status(500).end()
            })
    }
});

router.patch('/', checkAdminAuth, jsonParser, (req, res, next) => {
    console.log("updating a pago owo");
    console.log(req.body)
    const {
        id,
        fecha,
        ultimoPago,
        cobroPorMes,
        dirFactura,
        deuda,
        cliente
    } = req.body;
    if(!id){
        res.statusMessage = "missing id, verify  query"
        return res.status(406).end();
    }

    Pagos
        .getPagoById(id)
        .then(pagoToUpdate =>{
            if(pagoToUpdate.length === 0){
                res.statusMessage = "id not found";
                return res.status(404).end();
            }
            else {
                Pagos
                    .patchPagoById(id, fecha, ultimoPago, cobroPorMes, dirFactura, deuda, cliente)
                    .then(result =>{
                        if(!result){
                            res.statusMessage = "Id not found";
                            return res.status(404).end();
                        }
                        else{
                            res.statusMessage = "updated successfully";
                            return res.status(200).json(result);
                        }
                    })
                    .catch(err =>{
                        res.statusMessage = "Something went wrong with the DB. Try again later.";
                        return res.status(500).end();
                    });
            }
        });
});

router.delete('/', checkAdminAuth, jsonParser, (req, res, next) => {
    const id = req.body.id;
    Pagos
        .deletePagoById(id)
        .then(result => {
            return res.status(201).json(result)
        })
        .catch(err => {
            res.statusMessage = "Could not delete Pago with that Id";
            return res.status(500).end()
        })
});

module.exports = router;
