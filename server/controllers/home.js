const router = require('express').Router()

router.get('/', (_req, res) => {
  res.send('DNS Helper API is go!')
})

module.exports = router
