const { SiteRecord } = require('../models');
const router = require('express').Router();

const SessionExtractor = require('../middleware/SessionExtractor');

router.post('/', SessionExtractor, async (req, res) => {
  const body = req.body;

  try {
    const siteRecord = await SiteRecord.create({
      ...body
    });

    res.status(200).json(siteRecord);
  } catch (err) {
    res.status(400).json({errors: err.message});
  }
})

module.exports = router;