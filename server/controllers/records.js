const { Record } = require('../models');
const router = require('express').Router();

const TokenExtractor = require('../middleware/TokenExtractor');

router.post('/', TokenExtractor, async (req, res) => {
  const body = req.body;

  try {
    const record = await Record.create({
      ...body
    });

    res.status(200).json(record);
  } catch (err) {
    console.log(err);
    res.status(400).json({
      error: 'invalid record'
    });
  }
});

router.get('/', async (_req, res) => {
  const blogs = await Record.findAll();
  res.status(200).json(blogs);
});

module.exports = router;