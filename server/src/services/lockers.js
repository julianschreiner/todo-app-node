const { db } = require('../connection/db')
const { mongoose } = require('../connection/db')
const { ObjectId } = mongoose.Types.ObjectId
Locker = require('../models/locker_schema')

const getLockerEntry = async (userId) => {

}

const createLockerEntry = (userId, password) => {
    try {
        let locker = new Locker()
        locker.UserID = userId
        locker.Password = password   
        const ret = locker.save();
        return ret
    } catch (error) {
        console.log(error)
        return false
    }
}

module.exports = {
    lockerServiceGetEntry: getLockerEntry,
    lockerServiceCreateLockerEntry: createLockerEntry
}