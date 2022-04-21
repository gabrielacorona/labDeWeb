const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: "handling GET request to reportes"
    });
});

router.post('/', (req, res, next) => {
    res.status(200).json({
        message: "handling POST request to reportes"
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
