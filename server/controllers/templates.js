const { Template } = require('../models');
const router = require('express').Router();

const SessionExtractor = require('../middleware/SessionExtractor');
const AuthHandler = require('../middleware/AuthHandler');

const TemplateFinder = async (req, res, next) => {
  const template = await Template.findByPk(req.params.id);
  if (template) {
    req.template = template;
    next();
  } else {
    res.status(404).end();
  }
}

router.post('/', SessionExtractor, AuthHandler, async (req, res) => {
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

router.put('/:id', TemplateFinder, SessionExtractor, AuthHandler, async (req, res) => {
  if (req.body) {
    try {
      await req.template.update({...req.body})
      await req.template.save();
      res.status(200).json(req.template);
    } catch (err) {
      res.status(400).json({errors: err.message});
    }
  } else {
    return res.status(400).json({error: 'malformed request'});
  }
});

router.delete('/:id', TemplateFinder, SessionExtractor, AuthHandler, async (req, res) =>{
  try {
    await req.template.destroy();
    res.status(200).end();
  } catch (err) {
    err.status(400).json({errors: err.message});
  }
})

module.exports = router;