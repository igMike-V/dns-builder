const { SiteRecord } = require('../models');
const router = require('express').Router();

const TokenExtractor = require('../middleware/TokenExtractor');

router.post('/', TokenExtractor, async (req, res) => {
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