const { SiteRecord, Record, RecordType } = require('../models');
const router = require('express').Router();

const SessionExtractor = require('../middleware/SessionExtractor');
const AuthHandler = require('../middleware/AuthHandler');

router.post('/', SessionExtractor, AuthHandler, async (req, res) => {
  const body = req.body;

  try {
    // Check if record already exists with both recordId and siteId
    const checkRecord = await SiteRecord.findOne({
      where: {
        recordId: parseInt(body.recordId),
        siteId: parseInt(body.siteId),
      }
    });

    if (checkRecord) {
      return res.status(400).json({error: 'Record already exists for this site.'}); 
    }

    const siteRecord = await SiteRecord.create({
      ...body,
      recordId: parseInt(body.recordId),
    });

    const record = await Record.findByPk(siteRecord.recordId, {
      attributes: { exclude: ['createdAt', 'updatedAt'] },
      include: {
        model: RecordType,
      }, 
    });

    const returnRecord = {...record.dataValues, siteRecord: {id: siteRecord.id } };


    res.status(200).json(returnRecord);
  } catch (err) {
    res.status(400).json({errors: err.message});
  }
});

router.delete('/:id', SessionExtractor, AuthHandler, async (req, res) => {
  const siteRecord = await SiteRecord.findByPk(req.params.id);
  console.log(siteRecord)
  if (siteRecord) {
    await siteRecord.destroy();
    res.status(200).end();
  } else {
    res.status(404).end();
  }
});

module.exports = router;