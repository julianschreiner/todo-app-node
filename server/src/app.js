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


/* ToDo */
app.post('/todo', todoController.createTodo)

app.get('/todo/{userID}', (req, res, next) =>{
  res.send('get todo for user');
})

app.get('/todo/{id}', (req, res, next) =>{
  res.send('get particular todo');
})

app.delete('/todo/{id}', (req, res, next) =>{
  res.send('delete particular todo');
})

app.put('/todo/{id}', (req, res, next) =>{
  res.send('update todo');
})
