const mongoose = require('mongoose');

const adminSchema = mongoose.Schema({
    id: {
        type: String,
        unique: true,
        required: true,
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    users: [{
        required: false,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    }]
});

const adminsCollection = mongoose.model('admins', adminSchema);


const Admins = {
    createAdmin: function (newAdmin) {
        return adminsCollection
            .create(newAdmin)
            .then(createdAdmin => {
                return createdAdmin;
            })
            .catch(err => {
                throw new Error(err);
            });
    },
    //get all admins
    getAdmins: function () {
        return adminsCollection
            .find()
            .then(admins => {
                return admins;
            })
            .catch(err => {
                console.log(err)
                throw new Error(err);
            })
    },
    getAdminById: function (idAdmin) {
        return adminsCollection
            .findOne({
                id: idAdmin
            })
            .then(admin => {
                if (!admin) {
                    throw new Error('Admin not found');
                }
                return admin
            })
            .catch(err => {
                console.log(err)
                throw new Error(err);
            });
    },
    getAdminByEmail: function (query) {
        return adminsCollection
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
    deleteAdminById: function (query) {
        return adminsCollection
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
    Admins
}