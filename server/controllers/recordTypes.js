const { RecordType } = require('../models');
const router = require('express').Router();

router.get('/', async (req, res) => {
    try {

    } catch  (err) {
        console.log(err);
        res.status(500).send(err);
    }
    const recordTypes = await RecordType.findAll();
    res.send(recordTypes);
});

module.exports = router;