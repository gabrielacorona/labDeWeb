const express = require('express');
const router = express.Router();

const { Fotos } = require('./../models/fotos-model');
const checkUserAuth = require('../middleware/check-user-auth');


router.get('/', checkUserAuth, (req, res, next) => {
    res.status(200).json({
        message: "handling GET request to fotos"
    });
});

router.post('/', checkUserAuth, (req, res, next) => {
    res.status(200).json({
        message: "handling POST request to fotos"
    });
});

router.get('/:fotoId', checkUserAuth, (req, res, next) => {
    const id = req.params.userId;
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

router.patch('/:fotoId', checkUserAuth, (req, res, next) => {
    res.status(200).json({
        message: "foto  updates",
    });
});

router.delete('/:fotoId', checkUserAuth, (req, res, next) => {
    res.status(200).json({
        message: "deleting foto"
    });
});

module.exports = router;
