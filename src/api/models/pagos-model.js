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
    }
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
    }
}



module.exports = {
    Pagos
}