const { middelwareService } = require('../middleware/middleware')


//const { auth } = middelwareService
/*
 * call other imported services, or same service but different functions here if you need to
*/
const checkAuth = async (req, res, next) => {
  const idToken = req.headers.authorization
  
  try {
    const internalresponse = await middelwareService(idToken)
    // other service call (or same service, different function can go here)
    // i.e. - await generateBlogpostPreview()
    if(internalresponse){
      res.status(200).send('Authorisiert!')
    } else {
      res.status(401).send('Nicht Authorisiert!')
    }
    next()
  } catch(e) {
    console.log(e.message)
    res.sendStatus(500) && next(e)
    
  }
}

const register = async (req, res, next) => {
  try {
      res.status(200).send('Register!')
  } catch (e) {
    console.log(e.message)
    res.sendStatus(500) && next(e)
  }
}

const login = async (req, res, next) => {
  try {
      res.status(200).send('Login!')
  } catch (e) {
    console.log(e.message)
    res.sendStatus(500) && next(e)
  }
}


const logout = async (req, res, next) => {
  try {
      res.status(200).send('Logout!')
  } catch (e) {
    console.log(e.message)
    res.sendStatus(500) && next(e)
  }
}

const refresh = async (req, res, next) => {
  try {
      res.status(200).send('Login!')
  } catch (e) {
    console.log(e.message)
    res.sendStatus(500) && next(e)
  }
}

module.exports = {
  checkAuth,
  register,
  login,
  logout,
  refresh
}