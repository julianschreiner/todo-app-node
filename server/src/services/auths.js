const { db } = require('../connection/db')
const { mongoose } = require('../connection/db')
const { ObjectId } = mongoose.Types.ObjectId
Locker = require('../models/locker_schema')
Auth = require('../models/auth_schema')

const signIn = async () => {

}

const signOut = async () => {

}

const refresh = async () => {

}

const register = async (email, password, forename, surname, dob) => {
    // LOOK IF USER IS NOT EXISTING

    
}

module.exports = {
    authServiceSignIn: signIn,
    authServiceSignOut: signOut,
    authServiceRefresh: refresh,
    authServiceRegister: register
}