const { todoServiceCreateTodo } = require('../services/todos')
const { todoServiceGetTodoForUser } = require('../services/todos')
const { todoServiceGetTodo } = require('../services/todos')
const { todoServiceDeleteTodo } = require('../services/todos')
const { todoServiceUpdateTodo } = require('../services/todos')

const SUCCESSMSG = "SUCCESS"

/*
 * call other imported services, or same service but different functions here if you need to
*/
const createTodo = async (req, res, next) => {
    try {
        const user = req.body.user
        const todo = req.body.todo
        const due = req.body.due
        
        const internalresponse = await todoServiceCreateTodo(user, todo, due)
    
        // other service call (or same service, different function can go here)
        // i.e. - await generateBlogpostPreview()
        res.json({
            message: SUCCESSMSG,
            data: internalresponse
        })
    } catch (e) {
        console.log(e.message)
        res.sendStatus(500) && next(error)
    }
}

const getTodoForUser = async (req, res, next) => {
    try {
        let userID = req.params.userID
        const internalresponse = await todoServiceGetTodoForUser(userID)
    
        // other service call (or same service, different function can go here)
        // i.e. - await generateBlogpostPreview()
        res.json({
            message: SUCCESSMSG,
            data: internalresponse
        })
    } catch (e) {
        console.log(e.message)
        res.sendStatus(500) && next(e)
    }
}

const getTodo = async (req, res, next) => {
    try {
        let todoID = req.params.todoID
        const internalresponse = await todoServiceGetTodo(todoID)
    
        // other service call (or same service, different function can go here)
        // i.e. - await generateBlogpostPreview()
        res.json({
            message: SUCCESSMSG,
            data: internalresponse
        })
    } catch (e) {
        console.log(e.message)
        res.sendStatus(500) && next(e)
    }
}

const deleteDoto = async (req, res, next) => {
    try {
        let todoID = req.params.todoID
        const internalresponse = await todoServiceDeleteTodo(todoID)
    
        // other service call (or same service, different function can go here)
        // i.e. - await generateBlogpostPreview()
        res.json({
            message: SUCCESSMSG,
            data: internalresponse
        })
    } catch (e) {
        console.log(e.message)
        res.sendStatus(500) && next(e)
    }
}

const updateTodo = async (req, res, next) => {
    try {
        const todoID = req.params.todoID
        const userID = req.body.user
        const todo = req.body.todo
        const due = req.body.due
        const done = req.body.done

        const internalresponse = await todoServiceUpdateTodo(todoID, userID, todo, due, done)
    
        // other service call (or same service, different function can go here)
        // i.e. - await generateBlogpostPreview()
        res.json({
            message: SUCCESSMSG,
            data: internalresponse
        })
    } catch (e) {
        console.log(e.message)
        res.sendStatus(500) && next(e)
    }
}


module.exports = {
    createTodo,
    getTodoForUser,
    getTodo,
    deleteDoto,
    updateTodo
}