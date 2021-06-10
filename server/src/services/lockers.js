const { db } = require('../connection/db')
const { mongoose } = require('../connection/db')
const { ObjectId } = mongoose.Types.ObjectId
Locker = require('../models/locker_schema')

const getLockerEntry = async (userID) => {
    try {
        if (userID === undefined) {
            throw new Error('undefined id')
        }
        
        const ret = await Locker.findOne({ 'UserID': userID }).exec();
        console.log("##lockerentry: ", ret)
        
        return new Promise((resolve, reject) => {
            resolve(ret)
        })
    } catch (error) {
        console.log(error)
        return false
    }
}

const createLockerEntry = (userId, password) => {
    try {
        let locker = new Locker()
        locker.UserID = userId
        locker.Password = password   
        const ret = locker.save();
        return new Promise((resolve, reject) => {
            resolve(ret)
        })
    } catch (error) {
        console.log(error)
        return false
    }
}

module.exports = {
    lockerServiceGetEntry: getLockerEntry,
    lockerServiceCreateLockerEntry: createLockerEntry
}