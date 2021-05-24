const { db } = require('../connection/db')
const { mongoose } = require('../connection/db')
const { ObjectId } = mongoose.Types.ObjectId
const bcrypt = require('bcrypt');
const saltRounds = 10
Auth = require('../models/auth_schema')
const { userServiceGetActiveByEmail } = require('./users')
const { userServiceCreateUser } = require('./users')
const { lockerServiceGetEntry } = require('./lockers')
const { lockerServiceCreateLockerEntry } = require('./lockers')
const { securityGenerateJWT } = require('../middleware/middleware')

const signIn = async () => {
    try {

    } catch (error) {
        console.log(error)
        return false
    }
}

const signOut = async () => {
    try {

    } catch (error) {
        console.log(error)
        return false
    }
}

const refresh = async () => {
    try {

    } catch (error) {
        console.log(error)
        return false
    }
}

const register = async(email, password, forename, surname, dob) => {
    var pwSecure = false

    try {
        // LOOK IF USER IS NOT EXISTING
        const userObject = await userServiceGetActiveByEmail(email)
        // IF user not existing:
        if (userObject.length === 0) {
            // check if pw is secure
            pwSecure = checkIfPWSecure(password)
        }
    } catch (error) {
        console.log(error)
        return false
    }

    var hashedPw = ""
    
    var userCreate = {} 
    try {
         // THEN CREATE USER IN USER SERVICE
        userCreate = await userServiceCreateUser(email, forename, surname, dob, true, 3)
    } catch (error) {
        console.log(error)
        return false
    }

    try {
        if (pwSecure) {
            // CREATE BCRYPT of PW AND STORE INTO LOCKER
            bcrypt.hash(password, saltRounds, function(err, pw) {
                // Now we can store the password hash in db.
                if (err == null) {
                    hashedPw = pw
                    // THEN SAVE PW AND USER ID IN LOCKER
                    let lockerCreate = lockerServiceCreateLockerEntry(userCreate._id, hashedPw)
                }
            });
        } else {
            throw new Error('weak password.')
        }
    } catch (error) {
        console.log(error)
        return false
    }

    return userCreate
}

const checkIfPWSecure = (pw) => {
    return pw.length > 7
}

module.exports = {
    authServiceSignIn: signIn,
    authServiceSignOut: signOut,
    authServiceRefresh: refresh,
    authServiceRegister: register
}