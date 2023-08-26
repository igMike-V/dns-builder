const { Record, RecordType } = require('../models');
const router = require('express').Router();

const SessionExtractor = require('../middleware/SessionExtractor');
const AuthHandler = require('../middleware/AuthHandler');

const RecordFinder = async (req, res, next) => {
  const record = await Record.findByPk(req.params.id);
  if (record) {
    req.record = record;
    next();
  } else {
    res.status(404).end();
  }
}

router.post('/', SessionExtractor, async (req, res) => {
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
  const blogs = await Record.findAll({
    attributes: { exclude: ['createdAt', 'updatedAt', 'recordTypeId'] },
    include: {
      model: RecordType,
      attributes: ['name']
    }
  });
  res.status(200).json(blogs);
});

router.put('/:id', RecordFinder, SessionExtractor, AuthHandler, async (req, res) => {
  if (req.body) {
    try {
      await req.record.update({...req.body})
      await req.record.save();
      res.status(200).json(req.record);
    } catch (err) {
      console.log(err);
      res.status(400).json({
        error: `Problem updating record: "${err.message}"`
      });
    }
  } else {
    return res.status(400).json({error: 'malformed request'});
  }
});

router.delete('/:id', RecordFinder, SessionExtractor, AuthHandler, async (req, res) => {
  try {
    await req.record.destroy();
    res.status(200).end();
  } catch (err) {
    console.log(err);
    res.status(400).json({
      error: `Problem deleting record: "${err.message}"`
    });
  }
});

module.exports = router;