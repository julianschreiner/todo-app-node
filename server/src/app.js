// server.js
'use strict';
const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const app = express()

app.set('port', process.env.port || 3000) 
app.use(morgan('combined'))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.use(cors())

/* CONTROLLERS */
const authController = require("./controllers/AuthController")
const todoController = require("./controllers/TodoController")

/* ===== ROUTES ====== */
app.listen(app.get('port'), server =>{
  console.info(`Server listen on port ${app.get('port')}`);
})


/* AUTH */
app.get('/', authController.checkAuth)

app.post('/auth/register', authController.register)

app.post('/auth/login', authController.login)

app.get('/auth/logout', authController.logout)

app.get('/auth/refresh', authController.refresh)


/* ToDo */
app.post('/todo', todoController.createTodo)

app.get('/todo/user/:userID', todoController.getTodoForUser)

app.get('/todo/:todoID', todoController.getTodo)

app.delete('/todo/:todoID', todoController.deleteDoto)

app.put('/todo/:todoID', todoController.updateTodo)
