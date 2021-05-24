var mongoose = require('mongoose');

var authSchema = mongoose.Schema({
    userID: {
        type: String,
        required: true
    },
    authUuid: {
        type: String,
        required: true
    }
});

var Auth = module.exports = mongoose.model('Auth', authSchema)

module.exports.get = function (callback) {
    Auth.find(callback)
}