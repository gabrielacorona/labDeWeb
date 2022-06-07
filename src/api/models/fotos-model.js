const mongoose = require('mongoose');

const fotosSchema = mongoose.Schema({
    id: {
        type: String,
        unique: true,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    //the image is stored as the path to the uploads folder, not as an object
    image: {
        type: String,
        required: true
    }

});

const fotosCollection = mongoose.model('fotos', fotosSchema);

const Fotos = {
    createImage: function (newPicture) {
        return fotosCollection
            .create(newPicture)
            .then(createdImage => {
                return createdImage;
            })
            .catch(err => {
                throw new Error(err);
            });
    },
    //get all Fotos
    getFotos: function () {
        return fotosCollection
            .find()
            .then(fotos => {
                return fotos;
            })
            .catch(err => {
                throw new Error(err);
            })
    },
    getFotoByID: function (idFoto) {
        return fotosCollection
            .findOne({
                _id: idFoto
            })
            .then(foto => {
                if (!foto) {
                    throw new Error('foto not found');
                }
                return foto
            })
            .catch(err => {
                throw new Error(err);
            });
    },
    deleteFotoByID: function (query) {
        return fotosCollection
            .deleteOne({
                id: query
            })
            .then(fotoToDelete => {
                return fotoToDelete;
            })
            .catch(err => {
                return err;
            });
    },
    patchFotoByID: function (id, description, image) {
        return fotosCollection
            .updateOne({
                id: id
            }, {
                $set: {
                    description: description,
                    image: image
                }
            })
            .then(updatedFoto => {
                return updatedFoto;
            })
            .catch(err => {
                return err;
            })
    }
}

module.exports = {
    Fotos
}