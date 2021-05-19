const { todoServiceCreateTodo } = require('../services/todos')

/*
 * call other imported services, or same service but different functions here if you need to
*/
const createTodo = async (req, res, next) => {
    try {
        const internalresponse = await todoServiceCreateTodo()
        console.log("internal response")
        console.log(internalresponse)
        // other service call (or same service, different function can go here)
        // i.e. - await generateBlogpostPreview()
        res.json({
            message: "message",
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
        console.log(userID)
        res.status(200).send('Get Todo for User!')
    } catch (e) {
        console.log(e.message)
        res.sendStatus(500) && next(e)
    }
}

const getTodo = async (req, res, next) => {
    try {
        res.status(200).send('Get particular Todo!')
    } catch (e) {
        console.log(e.message)
        res.sendStatus(500) && next(e)
    }
}

const deleteDoto = async (req, res, next) => {
    try {
        res.status(200).send('Delete particular Todo!')
    } catch (e) {
        console.log(e.message)
        res.sendStatus(500) && next(e)
    }
}

const updateTodo = async (req, res, next) => {
    try {
        res.status(200).send('Update Todo!')
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