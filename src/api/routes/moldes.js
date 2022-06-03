const bodyParser = require('body-parser');
const express = require('express');
const router = express.Router();
const uuid = require('uuid');
const multer = require('multer');
const fs = require('fs');
const util = require('util')
const unlinkFile = util.promisify(fs.unlink)
const jsonParser = bodyParser.json();

const {Moldes} = require('./../models/moldes-model');
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

router.post('/', upload.single('image'), checkClienteAuth, jsonParser, async (req, res, next) => {
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
                newMolde.fotos.push(resultFotos._id)
                Moldes
                .createMolde(newMolde)
                .then(result =>{
                    return res.status(201).json(result)
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
        Moldes
        .createMolde(newMolde)
        .then(result =>{
            return res.status(201).json(result)
        })
        .catch(err => {
            res.statusMessage = "Something went wrong with the DB. Try again later.";
            return res.status(500).end()
        });
    }
   
});

router.get('/id/:id', checkUserAuth, jsonParser,  (req, res, next) => {
    let id = req.params.id;
    Moldes
    .getMoldeById(id)
    .then(result => {
        return res.status(201).json(result)
    })
    .catch(err => {
        res.statusMessage = "Could not find Molde with that Id";
        return res.status(500).end()
    })
});

// param encargado: id del usuario que es el encargado
router.get('/encargado/:encargado', checkUserAuth, jsonParser,(req, res, next) => {
    const encargado = req.params.encargado;
    Moldes
        .getMoldesByUserId(encargado)
        .then(result => {
            return res.status(201).json(result)
        })
        .catch(err => {
            res.statusMessage = "Could not find Molde with that Id";
            return res.status(500).end()
        })
    
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

router.get('/getReportes/:moldeId', checkUserAuth, jsonParser, (req, res, next) => {
    console.log("getting reportes by their molde");
    let id = req.params.moldeId;
    if(!id){
        res.statusMessage = "please send 'molde' as body";
        return res.status(406).end();
    }
    Moldes
        .getReportesByMolde(id)
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

router.patch('/addReporte', jsonParser, (req, res, next) => {
    console.log(req.body, req)
    const {
        moldeId,
        reporteId
    } = req.body;
    if(!moldeId || !reporteId){
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
            Moldes
                .addReporte(moldeId, reporte._id)
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

router.patch('/', checkClienteAuth, jsonParser, (req, res, next) => {
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

router.delete('/', checkClienteAuth, jsonParser,(req, res, next) => {
    const id = req.body.id;
    Moldes
        .getReportesByMolde(id)
        .then(reporteIds => {
            Reportes
                .deleteMultipleByMongoId(reporteIds)
                .then(delResp => {
                    console.log(delResp);
                    Moldes
                    .deleteMoldeById(id)
                    .then(deleteRes => {
                        return res.status(201).json(deleteRes)
                    })
                    .catch(err => {
                        res.statusMessage = "Could not delete Molde with that Id";
                        return res.status(500).end()
                    });
                })
                .catch(err => {
                    res.statusMessage = "Could not delete Molde with that Id";
                    return res.status(500).end()
                });
        })
        .catch(err => {
            res.statusMessage = "Could not delete Molde with that Id";
            return res.status(500).end()
        });
});

module.exports = router;
