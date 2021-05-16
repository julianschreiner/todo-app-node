const { db } = require('../connection/db')
const { mongoose } = require('../connection/db')
const { ObjectId } = mongoose.Types.ObjectId

Todo = require('../models/todo_schema')


/* SERVICE CALLS DB LAYER */
const createTodo = async() => {
    return true
}

module.exports = {
    todoServiceCreateTodo: createTodo
}