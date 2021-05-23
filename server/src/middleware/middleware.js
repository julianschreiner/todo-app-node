const db = require('../connection/db')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
Auth = require('../models/auth_schema')

// get config vars
dotenv.config();

const generateAuth = async (userID) => {
  payload = {
    "user": userID,
    "email": "email@email.com",
    "forename": "forename",
    "surname": "surname",
    "role": 1,
    "active": true,
    "created_at": "2020-12-10",
    "dob": "1999-07-04"
  }

  // todo save in auth table
  var tokens = {};
  tokens.access = jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: '5m' })

  let authID = uuidv4()
  payload = {
    "user": userID,
    "auth": authID
  }

  tokens.refresh = jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: '6h' });
  tokens.AuthId = authID

  return tokens
}

const uuidv4 = function () {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

const validateRefresh = async (refreshToken) => {
  //decode the JWT Token 
  var ret = true
  jwt.verify(refreshToken, process.env.TOKEN_SECRET, function(err, decoded) {
    if (err) {
      ret = false
    }
  });
  return ret
}

module.exports = {
  securityGenerateJWT: generateAuth,
  securityValidateRefresh: validateRefresh
}