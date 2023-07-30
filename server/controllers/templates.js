const { Template } = require('../models');
const router = require('express').Router();

const TokenExtractor = require('../middleware/TokenExtractor');

router.post('/', TokenExtractor, async (req, res) => {
  const body = req.body;

  try {
    const template = await Template.create({
      ...body
    });

    res.status(200).json(template);
  } catch (err) {
    res.status(400).json({errors: err.message});
  }
});

router.get('/', async (_req, res) => {
  const templates = await Template.findAll({
    attributes: {exclude: ['createdAt', 'updatedAt']}
  });
  res.status(200).json(templates);
});

module.exports = router;