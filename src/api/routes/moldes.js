const bodyParser = require('body-parser');
const express = require('express');
const router = express.Router();
const uuid = require('uuid');
const jsonParser = bodyParser.json();

const {Moldes} = require('./../models/moldes-model');

// get all moldes
router.get('/', (req, res, next) => {
    console.log("getting all moldes")
    Moldes
        .getMoldes()
        .then(moldes => {
            res.status(200).json(moldes);
        })
        .catch(err =>{
            res.statusMessage = "Something went wrong while retrieving the moldes";
            return res.status(500).end();
        });
});

router.post('/', jsonParser, (req, res, next) => {
    let id = uuid.v4();
    let nombreMolde = req.body.nombreMolde;
    let descripcion = req.body.descripcion;
    let costo = req.body.costo;
    let fotoPrincipal = req.body.fotoPrincipal;
    let tipoColada = req.body.tipoColada
    let ultimaReparacion = req.body.ultimaReparacion
    let ultimoReporte = req.body.ultimoReporte
    let fechaAdquisicion = req.body.fechaAdquisicion
    let encargado = req.body.encargado
    let fotos = [];
    let reportes = [];
    let newMolde = {
        id,
        nombreMolde,
        descripcion,
        costo,
        fotoPrincipal,
        tipoColada,
        ultimaReparacion,
        ultimoReporte,
        fechaAdquisicion,
        encargado,
        fotos,
        reportes
    };
    console.log(newMolde)
    Moldes
        .createMolde(newMolde)
        .then(result =>{
            return res.status(201).json(result)
        })
        .catch(err => {
            res.statusMessage = "Something went wrong with the DB. Try again later.";
            return res.status(500).end()
        });
});

router.get('/:moldeId', (req, res, next) => {
    const id = req.params.moldeId;
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

router.patch('/:userId', (req, res, next) => {
    res.status(200).json({
        message: "molde updates",
    });
});

router.delete('/:moldeId', (req, res, next) => {
    res.status(200).json({
        message: "deleting molde"
    });
});

module.exports = router;
