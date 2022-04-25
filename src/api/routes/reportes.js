const bodyParser = require('body-parser');
const express = require('express');
const { Moldes } = require('../models/moldes-model');
const router = express.Router();
const uuid = require('uuid');
const jsonParser = bodyParser.json();

const {Reportes} = require('./../models/reportes-model');

//get all reports
router.get('/', (req, res, next) => {
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

router.post('/', jsonParser, (req, res, next) => {
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

router.get('/:reporteId', (req, res, next) => {
    const id = req.params.reporteId;
    if (id == 'unId'){
        res.status(200).json({
            message: "owo un id",
            id : id
        });
    }
    else{
        res.status(200).json({
            message: "noexiste"
        });
    
    }
});

router.patch('/:reporteId', (req, res, next) => {
    res.status(200).json({
        message: "reporte updates",
    });
});

router.delete('/:reporteId', (req, res, next) => {
    res.status(200).json({
        message: "deleting reporte"
    });
});

module.exports = router;
