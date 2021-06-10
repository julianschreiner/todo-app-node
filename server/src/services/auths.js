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

const signIn = async (email, password) => {
    console.log(email, password)
    var userObject = {}
    var lockerObject = {}
    try {
        userObject = await userServiceGetActiveByEmail(email)
        console.log("##userobject: ", userObject)
        console.log("##parsed objectID: ", userObject._id)
        
        if (userObject !== undefined) {
            let parsedObjectId = userObject._id
            lockerObject = await lockerServiceGetEntry(parsedObjectId)
    
            if (lockerObject === undefined) {
                return false
            }
        }

      

    } catch (error) {
        console.log(error)
        return error
    }



    if (lockerObject.length !== 0) {
        const retPW = await bcrypt.compare(password, lockerObject.Password);

        if (retPW === true) {
            return new Promise((resolve, reject) => {
                resolve(userObject)
            })
        } else {
            return new Promise((resolve, reject) => {
                resolve(false)
            })
        }

    }
}

const register = async (email, password, forename, surname, dob) => {
    var pwSecure = false

    try {
        // LOOK IF USER IS NOT EXISTING
        const userObject = await userServiceGetActiveByEmail(email)
        console.log("##user: ", userObject)
        // IF user not existing:
        if (userObject === undefined || userObject === null) {
            // check if pw is secure
            pwSecure = checkIfPWSecure(password)
            console.log("##pwsecure: ", pwSecure)
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
        console.log("##userCreate: ", userCreate)
    } catch (error) {
        console.log(error)
        return false
    }

    try {
        if (pwSecure) {
            // CREATE BCRYPT of PW AND STORE INTO LOCKER
            bcrypt.hash(password, saltRounds, function (err, pw) {
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

    return new Promise((resolve, reject) => {
        resolve(userCreate)
    })
}

const checkIfPWSecure = (pw) => {
    console.log("### pw length: ", pw)
    return pw.length > 7
}

module.exports = {
    authServiceSignIn: signIn,
    authServiceRegister: register
}