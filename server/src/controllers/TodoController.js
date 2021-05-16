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
            message: 'success',
            data: internalresponse
        })
    } catch (e) {
        console.log(e.message)
        res.sendStatus(500) && next(error)
    }
}


module.exports = {
    createTodo
}