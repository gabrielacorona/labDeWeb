const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: "handling GET request to moldes"
    });
});

router.post('/', (req, res, next) => {
    res.status(200).json({
        message: "handling POST request to moldes"
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
