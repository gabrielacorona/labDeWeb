const bodyParser = require('body-parser');
const express = require('express');
const { Moldes } = require('../models/moldes-model');
const router = express.Router();
const uuid = require('uuid');
const multer = require('multer');
const fs = require('fs');
const util = require('util')
const unlinkFile = util.promisify(fs.unlink)
const jsonParser = bodyParser.json();

const {Reportes} = require('./../models/reportes-model');
const {Fotos} = require('./../models/fotos-model')
const {uploadFile} = require('../aws/s3')

const checkUserAuth = require('../middleware/check-user-auth');
const checkAdminAuth = require('./../middleware/check-admin-auth');
const checkClienteAuth = require('./../middleware/check-cliente-auth');

let today = new Date();
let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
let dateTime = date + ' ' + time;

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, dateTime + " " + file.originalname)
    }
});


const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

const upload = multer({
    dest:'uploads/', 
    storage: storage,
    limits: {
        //5mb limit
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});

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

router.post('/', upload.single('image'), jsonParser, async(req, res, next) => {
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
    if(req.file){
        let fotoId = uuid.v4();
        let image = req.file;
        let fotoDescription = req.body.fotoDescription;
        try{
            result = await uploadFile(image)
            await unlinkFile(image.path)
        }catch(e){
            console.log(e)
        }
        image = result["Location"]

        if (!fotoDescription || !image) {
            res.statusMessage = "missing param";
            return res.status(406).end(); //not accept status
        }
        let id = fotoId
        let description = fotoDescription

        let newPicture = {
            id,
            description,
            image
        };

        Fotos
            .createImage(newPicture)
            .then(resultFotos => {
                newReporte.fotos.push(resultFotos._id)
                Reportes
                .createReporte(newReporte)
                .then(result =>{
                    return res.status(201).json(result);
                })
                .catch(err => {
                    res.statusMessage = "Something went wrong with the DB. Try again later.";
                    return res.status(500).end()
                });
            })
            .catch(err => {
                res.statusMessage = "Something went wrong with the DB. Try again later. " + err;
                return res.status(500).end();
            })
    }else{
        Reportes
        .createReporte(newReporte)
        .then(result =>{
            return res.status(201).json(result);
        })
        .catch(err => {
            res.statusMessage = "Something went wrong with the DB. Try again later.";
            return res.status(500).end()
        });
    }

});

router.get('/id/:id', checkUserAuth,  jsonParser,(req, res, next) => {
    const id = req.params.id;
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
