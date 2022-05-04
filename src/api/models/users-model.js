const mongoose = require('mongoose');

const usersSchema = mongoose.Schema({
    id: {
        type: String,
        unique: true,
        required: true,
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique:true,
        required: true,
        match:/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    company: {
        type: String,
        required: true
    },
    telephone: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    userPicture: {
        type: String,
        required: true
    },
    companyPicture: {
        type: String,
        required: true
    },
    lastReportDate: {
        type: String,
        required: true
    },
    memberSince: {
        type: String,
        required: true
    },
    userType: { // a = admin, c = cliente, o = operador
        type: String,
        required: true
    },
    pagos: [{
        required: false,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'pagos'
    }],
    reportes: [{
        required: false,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'reportes'
    }],
    moldes: [{
        required: false,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'moldes'
    }],
    operadores: [{
        required: false,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    }]
});

const usersCollection = mongoose.model('users', usersSchema);


const Users = {
    createUser: function (newUser) {
        return usersCollection
            .create(newUser)
            .then(createdUser => {
                return createdUser;
            })
            .catch(err => {
                throw new Error(err);
            });
    },
    addOperador: function (idUser, idOperador) {
        return usersCollection
        .findOne({
            id: idUser
        })
        .then(user => {
            if (!user) {
                throw new Error('User not found');
            }
            if (!user.operadores.includes(idOperador)){
                user.operadores.push(idOperador);
                user.save();
            }
            return user;
        })
        .catch(err => {
            console.log(err)
            throw new Error(err);
        });
    },
    addReporte: function (idUser, idReporte) {
        return usersCollection
        .findOne({
            id: idUser
        })
        .then(user => {
            if (!user) {
                throw new Error('User not found');
            }
            if (!user.reportes.includes(idReporte)){
                user.reportes.push(idReporte);
                user.save();
            }
            return user;
        })
        .catch(err => {
            console.log(err)
            throw new Error(err);
        });
    },
    addMolde: function (idUser, idMolde) {
        return usersCollection
        .findOne({
            id: idUser
        })
        .then(user => {
            if (!user) {
                throw new Error('User not found');
            }
            if (!user.moldes.includes(idMolde)){
                user.moldes.push(idMolde);
                user.save();
            }
            return user;
        })
        .catch(err => {
            console.log(err)
            throw new Error(err);
        });
    },
    addPago: function (idUser, idPago) {
        return usersCollection
        .findOne({
            id: idUser
        })
        .then(user => {
            if (!user) {
                throw new Error('User not found');
            }
            if (!user.pagos.includes(idPago)){
                user.pagos.push(idPago);
                user.save();
            }
            return user;
        })
        .catch(err => {
            console.log(err)
            throw new Error(err);
        });
    },
    //get all users
    getUsers: function () {
        return usersCollection
            .find()
            .then(users => {
                return users;
            })
            .catch(err => {
                console.log(err)
                throw new Error(err);
            })
    },
    getUsersByCompany: function (company) {
        return usersCollection
            .find({company: company})
            .then(users => {
                if (!users) {
                    throw new Error('User not found');
                }
                return users
            })
            .catch(err => {
                console.log(err)
                throw new Error(err);
            });
    },
    getUsersByUser: function (user) {
        return usersCollection
        .findOne({
            id: user
        })
        .then(user =>{
            if(!user){
                throw new Error('User not found');
            }
            return user.operadores
        })
        .catch(err =>{
            console.log(err);
            throw new Error(err);
        })
    },
    getUserById: function (idUser) {
        return usersCollection
            .findOne({
                id: idUser
            })
            .then(user => {
                if (!user) {
                    throw new Error('User not found');
                }
                return user
            })
            .catch(err => {
                console.log(err)
                throw new Error(err);
            });
    },
    getUserByEmail: function (query) {
        return usersCollection
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
    deleteUserById: function (query) {
        return usersCollection
            .deleteOne({
                id: query
            })
            .then(userToDelete => {
                return userToDelete;
            })
            .catch(err => {
                return err;
            });
    },
    patchUserById: function (id, firstName, lastName, email, password, company, telephone, userPicture, companyPicture, lastReportDate, memberSince, userType) {
        return usersCollection
            .updateOne({
                id: id
            }, {
                $set: {
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    password: password,
                    company: company,
                    telephone: telephone, 
                    userPicture: userPicture,
                    companyPicture: companyPicture,
                    lastReportDate: lastReportDate,
                    memberSince: memberSince,
                    userType: userType
                },
            })
            .then(updatedUser => {
                return updatedUser;
            })
            .catch(err => {
                return err;
            })
    }
}



module.exports = {
    Users
}