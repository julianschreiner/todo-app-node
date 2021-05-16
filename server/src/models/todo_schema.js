var mongoose = require('mongoose');

var todoSchema = mongoose.Schema({
    user: {
        type: Number,
        required: true
    },
    todo: {
        type: String,
        required: true
    },
    due: {
        type: String,
        default: new Date().toUTCString()
    },
    done: {
        type: Boolean,
        default: false
    }
});


var Todo = module.exports = mongoose.model('Todo', todoSchema)

module.exports.get = function (callback) {
    Todo.find(callback)
}