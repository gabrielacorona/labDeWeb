const bodyParser = require('body-parser');
const express = require('express');
const router = express.Router();
const uuid = require('uuid');
const jsonParser = bodyParser.json();

const {Pagos} = require('./../models/pagos-model');
const checkUserAuth = require('../middleware/check-user-auth');


router.get('/', checkUserAuth, (req, res, next) => {
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

router.post('/', checkUserAuth, jsonParser, (req, res, next) => {
    let id = uuid.v4();
    let fecha = req.body.fecha;
    let ultimoPago = req.body.ultimoPago;
    let cobroPorMes = req.body.cobroPorMes;
    let dirFactura = req.body.dirFactura;
    let deuda = req.body.deuda;
    let newPago = {
        id,
        fecha,
        ultimoPago,
        cobroPorMes,
        dirFactura,
        deuda
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

router.get('/:pagoId', checkUserAuth, (req, res, next) => {
    const id = req.params.pagoId;
    if (id == 'unId'){
        res.status(200).json({
            message: "owo un id",
            id : id
        });
        return res;
    }
    else{
        Pagos
        .getPagoById(id)
        .then(result => {
            return res.status(201).json(result)
        })
        .catch(err => {
            res.statusMessage = "Could not find Pago with that Id";
            return res.status(500).end()
        })
    }
});

router.patch('/:pagoId', checkUserAuth, (req, res, next) => {
    res.status(200).json({
        message: "pago updates",
    });
});

router.delete('/:pagoId', checkUserAuth, (req, res, next) => {
    const id = req.params.pagoId;
    if (id == 'unId'){
        res.status(200).json({
            message: "owo un id",
            id : id
        });
        return res;
    }
    else{
        Pagos
        .deletePagoById(id)
        .then(result => {
            return res.status(201).json(result)
        })
        .catch(err => {
            res.statusMessage = "Could not delete Molde with that Id";
            return res.status(500).end()
        })
    }
});

module.exports = router;
