const { db } = require('../connection/db')
const { mongoose } = require('../connection/db')
const { ObjectId } = mongoose.Types.ObjectId
User = require('../models/user_schema')

const createUser = async (email, forename, surname, dob, active, role) => {
    try {
        let user = new User()
        user.Email = email
        user.Forename = forename
        user.Surname = surname
        user.Dob = dob
        user.Active = active
        user.Role = role
        user._id = new mongoose.Types.ObjectId().toHexString()
   
        const ret = await user.save();
        return new Promise((resolve, reject) => {
            resolve(ret)
        })
    } catch (error) {
        console.log(error)
        return false
    }
}

const saveUser = async (userId, email, forename, surname, dob, role) => {
    try {
        if (userId === undefined) {
            throw new Error('undefined id')
        }

        var userUpdate = {}
        if (email) userUpdate.email = email
        if (forename) userUpdate.forename = forename
        if (surname) userUpdate.surname = surname
        if (dob) userUpdate.dob = dob
        if (role) userUpdate.role = role

        console.log(userUpdate)

        const filter = { _id: ObjectId(userId) }
        // const update = { userUpdate }

        const updateProcess = await User.findOneAndUpdate(filter, userUpdate)
        const ret = await updateProcess.save()

        return new Promise((resolve, reject) => {
            resolve(ret)
        })
    } catch (error) {
        console.log(error)
        return false
    }
}

const deleteUserById = async (userId) => {
    try {
        if (userId === undefined) {
            throw new Error('undefined id')
        }
        const ret = await User.find({ '_id': ObjectId(userId) }).remove().exec();
        return ret
    } catch (error) {
        console.log(error)
        return false
    }
}

const getUserById = async (userId) => {
    try {
        if (userId === undefined) {
            throw new Error('undefined id')
        }
        const ret = await User.find({ '_id': ObjectId(userId) }).exec();

        return new Promise((resolve, reject) => {
            resolve(ret)
        })
    } catch (error) {
        console.log(error)
        return false
    }
}

const getActiveUserByEmail = async (email) => {
    try {
        if (email === undefined) {
            throw new Error('undefined email')
        }

        const ret = await User.findOne({ "Email": email, Active: true}).exec();
    
        return new Promise((resolve, reject) => {
            resolve(ret)
        })
    } catch (error) {
        console.log(error)
        return false
    }
}

const getAllUsersByRole = async (roleId) => {
    try {
        if (roleId === undefined) {
            throw new Error('undefined email')
        }

        const ret = await User.find({ "role": roleId, "active": true }).exec();
        return new Promise((resolve, reject) => {
            resolve(ret)
        })
    } catch (error) {
        console.log(error)
        return false
    }
}

module.exports = {
    userServiceGetUserByRole: getAllUsersByRole,
    userServiceCreateUser: createUser,
    userServiceSaveUser: saveUser,
    userServiceDeleteUser: deleteUserById,
    userServiceGetUser: getUserById,
    userServiceGetActiveByEmail: getActiveUserByEmail,
}
