const express = require('express');
const router = express.Router();

const { Fotos } = require('./../models/fotos-model');
const checkUserAuth = require('../middleware/check-user-auth');
const multer = require('multer');
const uuid = require('uuid');
const fs = require('fs');
const util = require('util')
const unlinkFile = util.promisify(fs.unlink)

const { uploadFile } = require('../aws/s3');

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

router.get('/', (req, res, next) => {
    console.log("getting all pictures owo")
    Fotos
        .getFotos()
        .then(fotos => {
            return res.status(200).json(fotos);
        })
        .catch(err => {
            res.statusMessage = "Something went wrong while retrieving the pictures";
            return res.status(500).end()
        })
});

router.get('/:fotoId', (req, res, next) => {
    console.log("getting a picture by their id =w=");
    let id = req.params.id;
    if (!id) {
        res.statusMessage = "please send 'ID' as a param";
        return res.status(406).end();
    }
    Fotos
        .getFotoByID(id)
        .then(fotos => {
            if (fotos.length === 0) {
                console.log(fotos)
                res.statusMessage = `no pictures with the provided id ${id}"`;
                return res.status(404).end();
            } else {
                return res.status(200).json(fotos);
            }
        })
        .catch(err => {
            res.statusMessage = "Something went wrong with the DB. Try again later.";
            return res.status(500).end();
        });
});

router.post('/', upload.single('image'), async (req, res, next) => {
    console.log("adding a new picture B^)");
    //even though the file is sent in form data the server recieves it in the files tag
    let image = req.file
    //all other stuff sent through the request that is not a file is sent as a body
    let description = req.body.description;
    try{
        result = await uploadFile(image)
        await unlinkFile(image.path)
    }catch(e){
        console.log(e)
    }
    image = result["Location"]
    if (!description || !image) {
        res.statusMessage = "missing param";
        return res.status(406).end(); //not accept status
    }
    let id = uuid.v4();

    let newPicture = {
        id,
        description,
        image
    };

    Fotos
        .createImage(newPicture)
        .then(result => {
            return res.status(201).json(result);
        })
        .catch(err => {
            res.statusMessage = "Something went wrong with the DB. Try again later. " + err.statusMessage;
            return res.status(500).end();
        })
});


router.patch('/:fotoId', checkUserAuth, (req, res, next) => {
    console.log("updating a picture owo")

    let image = req.files[0].path
    let description = req.body.description;

    let id = req.params.id;

    if (!id) {
        res.statusMessage = "missing id, verify  query"
        return res.status(406).end();
    }

    Fotos
        .getFotoByID(id)
        .then(fotoToUpdate => {
            if (fotoToUpdate.length === 0) {
                res.statusMessage = "id not found";
                return res.status(404).end();
            } else {
                console.log(fotoToUpdate)
                Fotos
                    .patchFotoByID(id, description, image)
                    .then(result => {
                        //console.log("Entra", result)
                        if (!result) {
                            res.statusMessage = "Id not found";
                            return res.status(404).end();
                        } else {
                            res.statusMessage = "updated successfully";
                            return res.status(200).json(result);
                        }
                    })
                    .catch(err => {
                        res.statusMessage = "Something went wrong with the DB. Try again later.";
                        return res.status(500).end();
                    })
            }
        })
        .catch(err => {
            res.statusMessage = "Something went wrong with the DB. Try again later.";
            return res.status(500).end();
        })
});

router.delete('/:fotoId', checkUserAuth, (req, res, next) => {
    console.log("deleting a picture u.u")
    let id = req.params.id;
    console.log(id);
    Fotos
        .getFotoByID(id)
        .then(fotoToRemove => {
            if (fotoToRemove.length === 0) {
                res.statusMessage = "id not found";
                return res.status(404).end();
            } else {
                //delete file from the filesystem
                const path = './' + fotoToRemove.image
                fs.unlink(path, (err) => {
                    if (err) {
                        console.log(err)
                        return
                    }
                });
                Fotos
                    .deleteFotoByID(id)
                    .then(result => {
                        res.statusMessage = "successfully deleted"
                        return res.status(200).end();
                    })
                    .catch(err => {
                        res.statusMessage = "Something went wrong with the DB. Try again later.";
                        return res.status(500).end();
                    });
            }
        })
        .catch(err => {
            res.statusMessage = "Something went wrong with the DB. Try again later.";
            return res.status(500).end();
        });
});

module.exports = router;
