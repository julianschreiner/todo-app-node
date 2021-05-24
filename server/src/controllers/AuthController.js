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
  console.log(req.cookies["refresh"])
  const refreshToken = "asd"

  try {
    console.log("refresh: ", refreshToken)
    const internalresponse = await securityValidateRefresh(refreshToken.refresh)
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

    const userObject = await authServiceRegister(email, password, forename, surname, dob)

    // THEN CALL MIDDLEWARE SIGNIN
    const signInResponse = await securityGenerateJWT(userObject)

    res.json({
      message: SUCCESSMSG,
      data: signInResponse
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