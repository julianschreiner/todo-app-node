var mongoose = require('mongoose');

var lockerSchema = mongoose.Schema({
    UserID: {
        type: String
    },
    Password: {
        type: String
    }
});

var Locker = module.exports = mongoose.model('Locker', lockerSchema)

module.exports.get = function (callback) {
    Locker.find(callback)
}