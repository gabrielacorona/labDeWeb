const express = require('express');
const router = express.Router();
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

// TODO: Cambiar esa función cuando tengamos el nuevo modelo de moldes
router.post('/', jsonParser, (req, res, next) => {
    let id = uuid.v4();
    let titulo = req.body.titulo;
    let fecha = req.body.fecha;
    let autor = req.body.autor;
    let descripcion = req.body.descricion;
    let diagnostico = req.body.diagnostico;
    let costoEstimado = req.body.costoEstimado
    let fotos = [];
    let newMolde = {
        id,
        titulo,
        fecha,
        autor,
        descripcion,
        diagnostico,
        costoEstimado,
        fotos
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
