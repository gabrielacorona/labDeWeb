const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: "handling GET request to admins"
    });
});

router.post('/', (req, res, next) => {
    res.status(200).json({
        message: "handling POST request to admins"
    });
});

router.get('/:adminId', (req, res, next) => {
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

router.patch('/:adminId', (req, res, next) => {
    res.status(200).json({
        message: "admin  updates",
    });
});

router.delete('/:adminId', (req, res, next) => {
    res.status(200).json({
        message: "deleting admin"
    });
});

module.exports = router;
