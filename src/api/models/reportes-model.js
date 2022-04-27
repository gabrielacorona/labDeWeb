const mongoose = require('mongoose');

const reportesSchema = mongoose.Schema({
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

const ReportesCollection = mongoose.model('reportes', reportesSchema);
const {Users} = require('./../models/users-model');

const Reportes = {
    createReporte: function (newReporte) {
        return ReportesCollection
            .create(newReporte)
            .then(createdReporte => {
                return createdReporte;
            })
            .catch(err => {
                console.log(err);
                throw new Error(err);
            });
    },
    //get all reportes
    getReportes: function () {
        return ReportesCollection
            .find()
            .then(reporte => {
                return reporte;
            })
            .catch(err => {
                console.log(err)
                throw new Error(err);
            })
    },
    getReporteById: function (idReporte) {
        return ReportesCollection
            .findOne({
                id: idReporte
            })
            .then(reporte => {
                if (!reporte) {
                    throw new Error('reporte not found');
                }
                return reporte
            })
            .catch(err => {
                console.log(err)
                throw new Error(err);
            });
    },
    getReportesByUserId: function (idUser) {
        return ReportesCollection
            .find({
                "autor": idUser
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
    getReportesByCompany: function (company) {
        return ReportesCollection.aggregate([
        {$lookup: {
            from:"users",
            localField: "autor",
            foreignField: "_id",
            as: "autor"
        }},
        {$match: {
            "autor.company": company
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
    deleteReporteById: function (query) {
        return ReportesCollection
            .deleteOne({
                id: query
            })
            .then(reporteToDelete => {
                return reporteToDelete;
            })
            .catch(err => {
                return err;
            });
    },
    patchReporteById: function (id, titulo, fecha, autor, descripcion, diagnostico, costoEstimado, fotos){
        return ReportesCollection
            .updateOne({
                id:id
            },
            {
                $set: {
                    id: id,
                    titulo: titulo,
                    fecha: fecha,
                    autor: autor,
                    descripcion: descripcion,
                    diagnostico: diagnostico,
                    costoEstimado: costoEstimado,
                    fotos: fotos
                },
            })
            .then(updatedReporte =>{
                return updatedReporte;
            })
            .catch(err =>{
                return err;
            });
    }
}



module.exports = {
    Reportes
}