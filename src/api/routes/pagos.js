const bodyParser = require('body-parser');
const express = require('express');
const router = express.Router();
const uuid = require('uuid');
const jsonParser = bodyParser.json();

const {Pagos} = require('./../models/pagos-model');

router.get('/', (req, res, next) => {
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

router.post('/', jsonParser, (req, res, next) => {
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

router.get('/byId', jsonParser, (req, res, next) => {
    const id = req.body.id;
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

router.get('/byUserId', jsonParser,(req, res, next) => {
    const cliente = req.body.cliente;
    if (cliente == 'unId'){
        res.status(200).json({
            message: "owo un id"
        });
        return res;
    }
    else{
        Pagos
        .getPagosByUserId(cliente)
        .then(result => {
            return res.status(201).json(result)
        })
        .catch(err => {
            res.statusMessage = "Could not find Cliente with that Id";
            return res.status(500).end()
        })
    }
});

router.get('/byCompany', jsonParser, (req, res, next) => {
    const company = req.body.company;
    if (company == ""){
        res.status(200).json({
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
            res.statusMessage = "Could not find Cliente with that Id";
            return res.status(500).end()
        })
    }
});

router.patch('/', jsonParser, (req, res, next) => {
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

router.delete('/', jsonParser, (req, res, next) => {
    const id = req.body.id;
    Pagos
    .deletePagoById(id)
    .then(result => {
        return res.status(201).json(result)
    })
    .catch(err => {
        res.statusMessage = "Could not delete Molde with that Id";
        return res.status(500).end()
    })
});

module.exports = router;
