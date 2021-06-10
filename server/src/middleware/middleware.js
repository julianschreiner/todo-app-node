const db = require('../connection/db')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
Auth = require('../models/auth_schema')

// get config vars
dotenv.config();

const generateAuth = async (userObject) => {
  var tokens = {};
  console.log("##generateAuth: ", userObject)

  let authID = uuidv4()

  let firstPayLoad = {
    "email": userObject.Email,
    "forename": userObject.Forename,
    "surname": userObject.Surname,
    "dob": userObject.Dob,
    "role": userObject.Role,
    "active": userObject.Active,
    "auth": authID,
    "user": userObject._id
  }

  tokens.access = jwt.sign(firstPayLoad, process.env.TOKEN_SECRET, { expiresIn: '5m' })

 
  payload = {
    "user": userObject._id,
    "auth": authID
  }

  tokens.refresh = jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: '6h' });
  tokens.AuthId = authID

  console.log("##before new auth: ", authID, userObject._id)

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
  jwt.verify(refreshToken, process.env.TOKEN_SECRET, function (err, decoded) {
    if (err) {
      console.log("##validate refresh: ", err)
       /*
      err = {
        name: 'TokenExpiredError',
        message: 'jwt expired',
        expiredAt: 1408621000
      }
    */
      ret = false
    }
  });
  return ret
}

const validateRefreshToken = async (refreshToken) => {
  var claims = jwt.decode(refreshToken);
  console.log("##decoded claims: ", claims)

  // query auth with claims
  try {
    if (claims === undefined) {
      throw new Error('undefined claims')
    }

    const ret = await Auth.find({ 'userID': claims.user, 'authUuid': claims.auth }).remove().exec();

    return new Promise((resolve, reject) => {
      resolve({"userID": claims.user})
    })
  } catch (error) {
    console.log(error)
    return false
  }
}

module.exports = {
  securityGenerateJWT: generateAuth,
  securityValidateRefresh: validateRefresh,
  securityValidateRefreshToken: validateRefreshToken
}