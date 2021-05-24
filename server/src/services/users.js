const { db } = require('../connection/db')
const { mongoose } = require('../connection/db')
const { ObjectId } = mongoose.Types.ObjectId
User = require('../models/user_schema')

const createUser = async(email, forename, surname, dob, active, role) => {
    try {
        let user = new User()
        user.Email = email
        user.Forename = forename
        user.Surname = surname
        user.Dob = dob
        user.Active = active
        user.Role = role
        
        const ret = await user.save();
        return ret
    } catch (error) {
        console.log(error)
        return false
    }
}

const saveUser = async(userId, email, forename, surname, dob, active, role) => {
    try {
        
    } catch (error) {
        console.log(error)
        return false
    }
}

const deleteUserById = async(userId) => {
    
}

const getUserById = async(userId) => {
    
}

const getActiveUserByEmail = async(email) => {
    try {
        if (email === undefined) {
            throw new Error('undefined email')
        }
        const ret = await User.find({"email": email}).exec();
        return ret
    } catch (error) {
        console.log(error)
        return false
    }
}

const getAllUsersByRole = async(roleId) => {
    
}

module.exports = {
    userServiceGetUserByRole: getAllUsersByRole,
    userServiceCreateUser: createUser,
    userServiceSaveUser: saveUser,
    userServiceDeleteUser: deleteUserById,
    userServiceGetUser: getUserById,
    userServiceGetActiveByEmail: getActiveUserByEmail,

}
