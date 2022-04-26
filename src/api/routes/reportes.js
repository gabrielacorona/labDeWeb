const bodyParser = require('body-parser');
const express = require('express');
const { Moldes } = require('../models/moldes-model');
const router = express.Router();
const uuid = require('uuid');
const jsonParser = bodyParser.json();

const {Reportes} = require('./../models/reportes-model');
const checkUserAuth = require('../middleware/check-user-auth');


//get all reports
router.get('/', checkUserAuth, (req, res, next) => {
    console.log("getting all reports")
    Reportes
        .getReportes()
        .then(reportes => {
            res.status(200).json(reportes);
        })
        .catch(err => {
            res.statusMessage = "Something went wrong while retrieving the reportes";
            return res.status(500).end();
        });
});

router.post('/', checkUserAuth, jsonParser, (req, res, next) => {
    let id = uuid.v4();
    let titulo = req.body.titulo;
    let fecha = req.body.fecha;
    let autor = req.body.autor;
    let descripcion = req.body.descripcion;
    let diagnostico = req.body.diagnostico;
    let costoEstimado = req.body.costoEstimado
    let fotos = [];
    let newReporte = {
        id,
        titulo,
        fecha,
        autor,
        descripcion,
        diagnostico,
        costoEstimado,
        fotos
    };
    console.log(newReporte)
    Reportes
        .createReporte(newReporte)
        .then(result =>{
            return res.status(201).json(result);
        })
        .catch(err => {
            res.statusMessage = "Something went wrong with the DB. Try again later.";
            return res.status(500).end()
        });

});

router.get('/:reporteId', checkUserAuth, (req, res, next) => {
    const id = req.params.reporteId;
    if (id == 'unId'){
        res.status(200).json({
            message: "owo un id",
            id : id
        });
        return res;
    }
    else{
        Reportes
        .getReporteById(id)
        .then(result => {
            return res.status(201).json(result)
        })
        .catch(err => {
            res.statusMessage = "Could not find Reporte with that Id";
            return res.status(500).end()
        })
    }
});

router.patch('/:reporteId', checkUserAuth, (req, res, next) => {
    res.status(200).json({
        message: "reporte updates",
    });
});

router.delete('/:reporteId', checkUserAuth, (req, res, next) => {
    const id = req.params.reporteId;
    if (id == 'unId'){
        res.status(200).json({
            message: "owo un id",
            id : id
        });
        return res;
    }
    else{
        Reportes
        .deleteReporteById(id)
        .then(result => {
            return res.status(201).json(result)
        })
        .catch(err => {
            res.statusMessage = "Could not delete Reporte with that Id";
            return res.status(500).end()
        })
    }
});

module.exports = router;
