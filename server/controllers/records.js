const { Record, RecordType } = require('../models');
const router = require('express').Router();

const TokenExtractor = require('../middleware/TokenExtractor');

const RecordFinder = async (req, res, next) => {
  const record = await Record.findByPk(req.params.id);
  if (record) {
    req.record = record;
    next();
  } else {
    res.status(404).end();
  }
}

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
  const blogs = await Record.findAll({
    attributes: { exclude: ['createdAt', 'updatedAt', 'recordTypeId'] },
    include: {
      model: RecordType,
      attributes: ['name']
    }
  });
  res.status(200).json(blogs);
});

router.put('/:id', RecordFinder, TokenExtractor, async (req, res) => {
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

module.exports = router;