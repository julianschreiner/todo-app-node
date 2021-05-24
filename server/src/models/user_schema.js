var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    password: {
        type: String
    },
    Email: {
        type: String
    },
    Role: {
        type: Number
    },
    Dob: {
        type: String
    },
    Active: {
        type: Boolean
    },
    Forename: {
        type: String
    },
    Surname: {
        type: String
    }
});

var User = module.exports = mongoose.model('User', userSchema)

module.exports.get = function (callback) {
    User.find(callback)
}