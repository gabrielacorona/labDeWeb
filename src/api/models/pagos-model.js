const mongoose = require('mongoose');

const pagosSchema = mongoose.Schema({
    id: {
        type: String,
        unique: true,
        required: true,
    },
    fecha: {
        type: String,
        required: true,
    },
    ultimoPago: {
        type: String,
        required: true
    },
    cobroPorMes: {
        type: Number,
        required: true
    },
    dirFactura: {
        type: String,
        required: true
    },
    deuda: {
        type: Number,
        required: true
    },
    cliente: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
});

const pagosCollection = mongoose.model('pagos', pagosSchema);


const Pagos = {
    createPago: function (newPago) {
        return pagosCollection
            .create(newPago)
            .then(createdPago => {
                return createdPago;
            })
            .catch(err => {
                console.log(err);
                throw new Error(err);
            });
    },
    //get all pagos
    getPagos: function () {
        return pagosCollection
            .find()
            .then(pago => {
                return pago;
            })
            .catch(err => {
                console.log(err)
                throw new Error(err);
            })
    },
    getPagoById: function (idPago) {
        return pagosCollection
            .findOne({
                id: idPago
            })
            .then(pago => {
                if (!pago) {
                    throw new Error('Pago not found');
                }
                return pago
            })
            .catch(err => {
                console.log(err)
                throw new Error(err);
            });
    },
    getPagoByEmail: function (query) {
        return pagosCollection
            .findOne({
                email: query
            })
            .then(resultByEmail => {
                return resultByEmail;
            })
            .catch(err => {
                return err;
            })
    },
    getPagosByUserId: function (idUser) {
        return pagosCollection
            .find({
                "cliente": idUser
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
    getPagosByCompany: function (company) {
        return pagosCollection.aggregate([
        {$lookup: {
            from:"users",
            localField: "cliente",
            foreignField: "_id",
            as: "cliente"
        }},
        {$match: {
            "cliente.company": company
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
    deletePagoById: function (query) {
        return pagosCollection
            .deleteOne({
                id: query
            })
            .then(pagoToDelete => {
                return pagoToDelete;
            })
            .catch(err => {
                return err;
            });
    },
    patchPagoById: function (id, fecha, ultimoPago, cobroPorMes, dirFactura, deuda, cliente){
        return pagosCollection
            .updateOne({
                id:id
            },
            {
                $set: {
                    id: id,
                    fecha: fecha,
                    ultimoPago: ultimoPago,
                    cobroPorMes: cobroPorMes,
                    dirFactura: dirFactura,
                    deuda: deuda,
                    cliente: cliente
                },
            })
            .then(updatedPago =>{
                return updatedPago;
            })
            .catch(err =>{
                return err;
            });
    }
}



module.exports = {
    Pagos
}