const AuthHandler = (req, res, next) => {
  if (!req.userAuth || !req.userAuth.loggedIn) {
    return res.status(401).send({ error: 'Unauthorized', message: 'No active session found on this device' })
  }
  return next()
}

module.exports = AuthHandler