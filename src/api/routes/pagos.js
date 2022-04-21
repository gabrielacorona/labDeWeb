const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: "handling GET request to pagos"
    });
});

router.post('/', (req, res, next) => {
    res.status(200).json({
        message: "handling POST request to pagos"
    });
});

router.get('/:pagoId', (req, res, next) => {
    const id = req.params.pagoId;
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

router.patch('/:pagoId', (req, res, next) => {
    res.status(200).json({
        message: "pago updates",
    });
});

router.delete('/:pagoId', (req, res, next) => {
    res.status(200).json({
        message: "deleting pago"
    });
});

module.exports = router;
