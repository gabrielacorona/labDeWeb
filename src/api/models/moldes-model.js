const mongoose = require('mongoose');

const moldesSchema = mongoose.Schema({
    id: {
        type: String,
        unique: true,
        required: true,
    },
    nombreMolde: {
        type: String,
        required: true,
    },
    descripcion: {
        type: String,
        required: true
    },
    costo: {
        type: Number,
        required: true
    },
    fotoPrincipal: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'fotos',
        required: false
    },
    tipoColada: {
        type: String,
        required: true
    },
    ultimaReparacion: {
        type: String,
        required: true
    },
    ultimoReporte: {
        type: String,
        required: true
    },
    fechaAdquisicion: {
        type: String,
        required: true
    },
    encargado: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    fotos: [{
        required: false,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'fotos'
    }],
    reportes: [{
        required: false,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'reportes'
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
                console.log(err);
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
    getMoldesByUserId: function (idUser) {
        return MoldesCollection
            .find({
                "encargado": idUser
            })
            .then(reportes => {
                if (!reportes) {
                    throw new Error('reporte not found');
                }
                return reportes
            })
            .catch(err => {
                console.log(err)
                throw new Error(err);
            });
    },
    getMoldesByCompany: function (company) {
        return MoldesCollection.aggregate([
        {$lookup: {
            from:"users",
            localField: "encargado",
            foreignField: "_id",
            as: "encargado"
        }},
        {$match: {
            "encargado.company": company
        }}]
        ).then(reportes =>{
            if (!reportes) {
                throw new Error('reporte not found');
            }
        return reportes;
        })
        .catch(err => {
            console.log(err)
            throw new Error(err);
        });
    },
    populateMoldes: function(moldeIds){
        return MoldesCollection
            .find({
                '_id': { $in: moldeIds}
            })
            .then(moldes =>{
                return moldes;
            })
            .catch(err => {
                throw new Error(err);
            })
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
    },
    patchMoldeById: function (id, nombreMolde, descripcion, costo, fotoPrincipal, tipoColada, ultimaReparacion, ultimoReporte, fechaAdquisicion, encargado, fotos, reportes){
        return MoldesCollection
            .updateOne({
                id:id
            },
            {
                $set: {
                    id: id,
                    nombreMolde: nombreMolde,
                    descripcion: descripcion,
                    costo: costo,
                    fotoPrincipal: fotoPrincipal,
                    tipoColada: tipoColada,
                    ultimaReparacion: ultimaReparacion,
                    ultimoReporte: ultimoReporte,
                    fechaAdquisicion: fechaAdquisicion,
                    encargado: encargado,
                    fotos: fotos,
                    reportes: reportes
                },
            })
            .then(updatedMolde =>{
                return updatedMolde;
            })
            .catch(err =>{
                return err;
            });
    }
}


module.exports = {
    Moldes
}