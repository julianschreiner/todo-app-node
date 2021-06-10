const { securityGenerateJWT } = require('../middleware/middleware')
const { securityValidateRefresh } = require('../middleware/middleware')
const { securityValidateRefreshToken } = require('../middleware/middleware')
const { authServiceSignIn } = require('../services/auths')
const { authServiceRegister } = require('../services/auths')
const { userServiceGetUser } = require('../services/users')

const SUCCESSMSG = "SUCCESS"
const LOGOUTMSG = "LOGOUT"

//const { auth } = middelwareService
/*
 * call other imported services, or same service but different functions here if you need to
*/

const checkAuth = async (req, res, next) => {
  let refreshRequest = req.cookies["refresh"]
  console.log(refreshRequest)

  try {
    const internalresponse = await securityValidateRefresh(refreshRequest)
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

    if (!userObject) res.sendStatus(500) && next(e)

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
    let password = req.body.password
    let email = req.body.email

    const userObject = await authServiceSignIn(email, password)
    console.log("##controller-login: ", userObject)

    if (!userObject) res.status(403).send('Wrong password or Email!')

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


const logout = async (req, res, next) => {
  try {
    let access = req.cookies["access"]
    console.log("##access: ", access)

    const internalresponse = await securityValidateRefresh(access)
    console.log("## after validate: ", internalresponse)

    if (internalresponse) {
      const retDestroyAuth = await securityValidateRefreshToken(access)
      console.log("## destroyed auth: ", retDestroyAuth)
      if (retDestroyAuth === false || retDestroyAuth === undefined) res.status(403).send('Something went wrong!')

      res.json({
        message: LOGOUTMSG
      })

    } else {
      res.status(403).send('Something went wrong!')
    }
  } catch (e) {
    console.log(e.message)
    res.sendStatus(500) && next(e)
  }
}

const refresh = async (req, res, next) => {
  try {
    let refresh = req.cookies["refresh"]
    let access = req.cookies["access"]
    console.log("##refresh: ", refresh)
    console.log('##access', access)

    const internalresponse = await securityValidateRefresh(access)
    console.log("## after validate: ", internalresponse)

    if (!internalresponse) {
      // expired
      const retDestroyAuth = await securityValidateRefreshToken(access)
      console.log("## destroyed auth: ", retDestroyAuth)
      if (retDestroyAuth === false || retDestroyAuth === undefined) res.status(403).send('Something went wrong!')

      // call user server with retDestroyAuth.userID
      const userObject = await userServiceGetUser(retDestroyAuth.userID)
      console.log("##controller user: ", userObject)
      
      // sign in 
      const jwt = await securityGenerateJWT(userObject)
      
      res.json({
        message: SUCCESSMSG,
        data: {
          "access": access,
          "refresh": jwt,
        }
      })

    }

    res.json({
      message: SUCCESSMSG,
      data: {
        "access": access,
        "refresh": refresh,
      }
    })

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