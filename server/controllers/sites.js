const { Site, Template, Record } = require('../models');
const router = require('express').Router();

const SessionExtractor = require('../middleware/SessionExtractor');
const AuthHandler = require('../middleware/AuthHandler');

router.post('/', SessionExtractor, AuthHandler, async (req, res) => {
  const body = req.body;

  try {
    const site = await Site.create({
      ...body
    });

    res.status(200).json(site);
  } catch (err) {
    const errorMessages = err.errors.map(error => {
      return { type: error.type, message: error.message, path: error.path, value: error.value };
    });
    res.status(400).json({errors: errorMessages});
  }
});

router.get('/', SessionExtractor, AuthHandler,  async (req, res) => {
  const sites = await Site.findAll({
    attributes: {exclude: ['createdAt', 'updatedAt']},
    include: [
      {
        model: Template,
        include: { 
          model: Record,
          attributes: {exclude: ['createdAt', 'updatedAt']}
        },
        attributes: {exclude: ['createdAt', 'updatedAt']}
      },
      {
        model: Record,
        attributes: {exclude: ['createdAt', 'updatedAt']}
      }
  ],
  });
  res.status(200).json(sites);
});

module.exports = router;