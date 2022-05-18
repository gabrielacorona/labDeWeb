const bodyParser = require('body-parser');
const express = require('express');
const { Moldes } = require('../models/moldes-model');
const router = express.Router();
const uuid = require('uuid');
const jsonParser = bodyParser.json();

const {Reportes} = require('./../models/reportes-model');

const checkUserAuth = require('../middleware/check-user-auth');
const checkAdminAuth = require('./../middleware/check-admin-auth');
const checkClienteAuth = require('./../middleware/check-cliente-auth');


//get all reports
router.get('/', checkAdminAuth, (req, res, next) => {
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
    //console.log(newReporte)
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

router.get('/id/:id', checkUserAuth,  jsonParser,(req, res, next) => {
    const id = req.params.id;
    console.log(id)
    Reportes
        .getReporteById(id)
        .then(result => {
            return res.status(201).json(result)
        })
        .catch(err => {
            res.statusMessage = "Could not find Reporte with that Id";
            return res.status(500).end()
        })
    
});

// param autor: id del usuario que es el autor
router.get('/autor/:autor', checkUserAuth,  jsonParser,(req, res, next) => {
    const autor = req.params.autor;
    Reportes
        .getReportesByUserId(autor)
        .then(result => {
            return res.status(201).json(result)
        })
        .catch(err => {
            res.statusMessage = "Could not find Reporte with that author";
            return res.status(500).end()
        });
});

router.get('/company/:company', checkUserAuth, jsonParser, (req, res, next) => {
    const company = req.params.company;
    if (company == ""){
        res.status(404).json({
            message: "No hay compañía"
        });
        return res;
    }
    else{
        Reportes
            .getReportesByCompany(company)
            .then(result => {
                return res.status(201).json(result)
            })
            .catch(err => {
                res.statusMessage = "Could not find Reporte with that company";
                return res.status(500).end()
            })
    }
});

router.patch('/', checkClienteAuth, jsonParser, (req, res, next) => {
    console.log("updating a reporte owo");
    console.log(req.body)
    const {
        id,
        titulo,
        fecha,
        autor,
        descripcion,
        diagnostico,
        costoEstimado,
        fotos
    } = req.body;
    if(!id){
        res.statusMessage = "missing id, verify  query"
        return res.status(406).end();
    }

    Reportes
        .getReporteById(id)
        .then(reporteToUpdate =>{
            if(reporteToUpdate.length === 0){
                res.statusMessage = "id not found";
                return res.status(404).end();
            }
            else {
                Reportes
                    .patchReporteById(id, titulo, fecha, autor, descripcion, diagnostico, costoEstimado, fotos)
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

router.delete('/', checkClienteAuth, jsonParser,(req, res, next) => {
    const id = req.body.id;
    console.log("Este es el id UWU", id)
    Reportes
        .deleteReporteById(id)
        .then(result => {
            return res.status(201).json(result)
        })
        .catch(err => {
            res.statusMessage = "Could not delete Reporte with that Id";
            return res.status(500).end()
        });
});

module.exports = router;
