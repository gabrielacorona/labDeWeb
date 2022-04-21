const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: "handling GET request to users"
    });
});

router.post('/', (req, res, next) => {
    res.status(200).json({
        message: "handling POST request to users"
    });
});

router.get('/:userId', (req, res, next) => {
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

router.patch('/:userId', (req, res, next) => {
    res.status(200).json({
        message: "user updates",
    });
});

router.delete('/:userId', (req, res, next) => {
    res.status(200).json({
        message: "deleting user"
    });
});

module.exports = router;
