const { db } = require('../connection/db')
const { mongoose } = require('../connection/db')
const { ObjectId } = mongoose.Types.ObjectId
Todo = require('../models/todo_schema')


/* SERVICE CALLS DB LAYER */
const createTodo = async (user, task, due) => {
    try {
        let todo = new Todo()
        todo.user = user
        todo.todo = task
        todo.due = due
        todo.done = false

        const ret = await todo.save();

        return ret;

    } catch (e) {
        return false
    }
}

const getTodoForUser = async (userID) => {
    try {
        if (userID === undefined) {
            throw new Error('undefined id')
        }
        const ret = await Todo.find({ 'user': userID }).exec();
        return ret
    } catch (error) {
        console.log(error)
        return false
    }
}

const getTodo = async (id) => {
    try {
        if (id === undefined) {
            throw new Error('undefined id')
        }
        const ret = await Todo.find({ '_id': ObjectId(id) }).exec();
        return ret
    } catch (error) {
        console.log(error)
        return false
    }
}

const deleteDoto = async (todoID) => {
    try {
        if (todoID === undefined) {
            throw new Error('undefined id')
        }
        const ret = await Todo.find({ '_id': ObjectId(todoID) }).remove().exec();
        return ret
    } catch (error) {
        console.log(error)
        return false
    }
}

const updateTodo = async (todoID, userID, task, due, done) => {
    try {
        if (todoID === undefined && userID === undefined) {
            throw new Error('undefined id')
        }

        var toUpdate = {}
        if (task) toUpdate.todo = task
        if (due) toUpdate.due = due
        if (done) toUpdate.done = done

        console.log(toUpdate)
        
        const filter = { _id: ObjectId(todoID), user: userID };
        // const update = { toUpdate };

        const todoUpdate = await Todo.findOneAndUpdate(filter, toUpdate);
        const ret = await todoUpdate.save();
        
        return ret
    } catch (error) {
        console.log(error)
        return false
    }
}

module.exports = {
    todoServiceCreateTodo: createTodo,
    todoServiceGetTodoForUser: getTodoForUser,
    todoServiceGetTodo: getTodo,
    todoServiceDeleteTodo: deleteDoto,
    todoServiceUpdateTodo: updateTodo,
}