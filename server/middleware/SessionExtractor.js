//import session model
const sessionService = require('../util/sessionService')

const SessionExtractor = async (req, res, next) => {
  console.log('SessionExtractor', req.cookies)
  const token = await req.cookies['token']
  if (!token) {
    req.userAuth = {
      loggedIn: false
    }
    return next()
  }

  // Get session from database using token
  const session = await sessionService.getSession(token)
  if (!session) {
    req.userAuth = {
      loggedIn: false
    }
    return next()
  }
  // Check if session is expired
  if (session.expires < Date.now()) {
    // Delete session from database
    sessionService.deleteSession(session.sid)
    req.userAuth = {
      loggedIn: false
    }
    console.log('session expired')
    return next()
  }
  // Add user to request
  req.userAuth = {
    ...session,
    loggedIn: true
  }
  return next()
}

module.exports = SessionExtractor
