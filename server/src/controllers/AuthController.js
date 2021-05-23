const { securityGenerateJWT } = require('../middleware/middleware')
const { securityValidateRefresh } = require('../middleware/middleware')
const { authServiceSignIn } = require('../services/auths')
const { authServiceSignOut } = require('../services/auths')
const { authServiceRefresh } = require('../services/auths')
const { authServiceRegister } = require('../services/auths')

const SUCCESSMSG = "SUCCESS"

//const { auth } = middelwareService
/*
 * call other imported services, or same service but different functions here if you need to
*/
const checkAuth = async (req, res, next) => {
  const idToken = req.headers.authorization
  let refresh = ""
  try {
    const ka = await securityGenerateJWT(120)
    refresh = ka.refresh
  } catch (e) {
    console.log("error: ", e.message)
  }

  try {
    console.log("refresh: ", refresh)
    const internalresponse = await securityValidateRefresh(refresh)
    console.log("after validate: ", internalresponse)
    // other service call (or same service, different function can go here)
    // i.e. - await generateBlogpostPreview()
    if (internalresponse) {
      //res.status(200).send('Authorisiert!')
      next()
    } else {
      res.status(401).send('Nicht Authorisiert!')
    }
  } catch (e) {
    console.log(e.message)
    res.sendStatus(500) && next(e)

  }
}

const register = async (req, res, next) => {
  try {
    const email = req.body.email
    const password = req.body.password
    const forename = req.body.forename
    const surname = req.body.surname
    const dob = req.body.dob

    const internalresponse = await authServiceRegister(email, password, forename, surname, dob)

    res.json({
      message: SUCCESSMSG,
      data: internalresponse
    })
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