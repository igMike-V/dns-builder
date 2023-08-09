const { Site, Template, Record } = require('../models');
const router = require('express').Router();

const SessionExtractor = require('../middleware/SessionExtractor');
const AuthHandler = require('../middleware/AuthHandler');

const SiteFinder = async (req, res, next) => {
  const site = await Site.findByPk(req.params.id);
  if (site) {
    req.site = site;
    next();
  } else {
    res.status(404).end();
  }
}

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

router.put('/:id', SiteFinder, SessionExtractor, AuthHandler, async (req, res) => {
  if (req.body) {
    try {
      await req.site.update({...req.body})
      await req.site.save();
      res.status(200).json(req.site);
    } catch (err) {
      const errorMessages = err.errors.map(error => {
        return { type: error.type, message: error.message, path: error.path, value: error.value };
      });
      res.status(400).json({errors: errorMessages});
    }
  } else {
    return res.status(400).json({error: 'malformed request'});
  }
});

router.delete('/:id', SiteFinder, SessionExtractor, AuthHandler, async (req, res) =>{
  try {
    await req.site.destroy();
    res.status(200).end();
  } catch (err) {
    err.status(400).json({errors: err.message});
  }
});

module.exports = router;