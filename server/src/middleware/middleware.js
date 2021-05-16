const db = require('../connection/db')

const createAuth = async (idToken) => {
    /* TODO CHECK AUTH 
    try {
        const decodedToken = await admin.auth().verifyIdToken(idToken)
        if(decodedToken){
          req.body.uid = decodedToken.uid
          return true
        } else {
          //return res.status(401).send('Nicht Authorisiert!')
          return false
        }  
    } catch (e) {
        return false
    } */
    return true
}

module.exports = {
    middelwareService: createAuth
}