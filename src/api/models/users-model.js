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
        required: true
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
    getUserById: function (idUser) {
        console.log("hola",usersCollection)
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
    }
}



module.exports = {
    Users
}