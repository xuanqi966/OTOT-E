let router = require('express').Router()
var recordController = require('../controller/recordController')

router.route('/')
    .get(recordController.index)


module.exports = router;