const mongoose = require('mongoose');

const moldesSchema = mongoose.Schema({
    id: {
        type: String,
        unique: true,
        required: true,
    },
    titulo: {
        type: String,
        required: true,
    },
    fecha: {
        type: String,
        required: true
    },
    autor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    diagnostico: {
        type: String,
        required: true
    },
    costoEstimado: {
        type: Number,
        required: true
    },
    fotos: [{
        required: false,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'fotos'
    }]
});

const MoldesCollection = mongoose.model('moldes', moldesSchema);


const Moldes = {
    createMolde: function (newMolde) {
        return MoldesCollection
            .create(newMolde)
            .then(createdMolde => {
                return createdMolde;
            })
            .catch(err => {
                throw new Error(err);
            });
    },
    //get all moldes
    getMoldes: function () {
        return MoldesCollection
            .find()
            .then(molde => {
                return molde;
            })
            .catch(err => {
                console.log(err)
                throw new Error(err);
            })
    },
    getMoldeById: function (idMolde) {
        return MoldesCollection
            .findOne({
                id: idMolde
            })
            .then(molde => {
                if (!molde) {
                    throw new Error('molde not found');
                }
                return molde
            })
            .catch(err => {
                console.log(err)
                throw new Error(err);
            });
    },
    deleteMoldeById: function (query) {
        return MoldesCollection
            .deleteOne({
                id: query
            })
            .then(moldeToDelete => {
                return moldeToDelete;
            })
            .catch(err => {
                return err;
            });
    }
}


module.exports = {
    Moldes
}