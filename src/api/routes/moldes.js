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

router.get('/byId',jsonParser,  (req, res, next) => {
    const id = req.body.id;
    if (id == 'unId'){
        res.status(200).json({
            message: "owo un id",
            id : id
        });
        return res;
    }
    else{
        Moldes
        .getMoldeById(id)
        .then(result => {
            return res.status(201).json(result)
        })
        .catch(err => {
            res.statusMessage = "Could not find Molde with that Id";
            return res.status(500).end()
        })
    }
});

router.get('/byUserId', jsonParser,(req, res, next) => {
    const encargado = req.body.encargado;
    if (encargado == 'unId'){
        res.status(200).json({
            message: "owo un id"
        });
        return res;
    }
    else{
        Moldes
        .getMoldesByUserId(encargado)
        .then(result => {
            return res.status(201).json(result)
        })
        .catch(err => {
            res.statusMessage = "Could not find Molde with that Id";
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
        Moldes
        .getMoldesByCompany(company)
        .then(result => {
            return res.status(201).json(result)
        })
        .catch(err => {
            res.statusMessage = "Could not find Molde with that Id";
            return res.status(500).end()
        })
    }
});

router.patch('/', jsonParser, (req, res, next) => {
    console.log("updating a molde owo");
    console.log(req.body)
    const {
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
    } = req.body;
    if(!id){
        res.statusMessage = "missing id, verify  query"
        return res.status(406).end();
    }

    Moldes
        .getMoldeById(id)
        .then(moldeToUpdate =>{
            if(moldeToUpdate.length === 0){
                res.statusMessage = "id not found";
                return res.status(404).end();
            }
            else {
                Moldes
                .patchMoldeById(id, nombreMolde, descripcion, costo, fotoPrincipal, tipoColada, ultimaReparacion, ultimoReporte, fechaAdquisicion, encargado, fotos, reportes)
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

router.delete('/', jsonParser,(req, res, next) => {
    const id = req.body.id;
    if (id == 'unId'){
        res.status(200).json({
            message: "owo un id",
            id : id
        });
        return res;
    }
    else{
        Moldes
        .deleteMoldeById(id)
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
