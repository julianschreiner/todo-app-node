const db = require('../connection/db')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
Auth = require('../models/auth_schema')

// get config vars
dotenv.config();

const generateAuth = async (userObject) => {
  var tokens = {};
  console.log(userObject)
  
  let firstPayLoad = {
    "email": userObject.Email,
    "forename": userObject.Forename,
    "surname": userObject.Surname,
    "dob": userObject.Dob,
    "role": userObject.Role,
    "active": userObject.Active
  }

  tokens.access = jwt.sign(firstPayLoad, process.env.TOKEN_SECRET, { expiresIn: '5m' })
 
  let authID = uuidv4()
  payload = {
    "user": userObject._id,
    "auth": authID
  }

  tokens.refresh = jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: '6h' });
  tokens.AuthId = authID

  // todo save in auth table
  let auth = new Auth()
  auth.authUuid = authID
  auth.userID = userObject._id
  
  await auth.save();
  
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