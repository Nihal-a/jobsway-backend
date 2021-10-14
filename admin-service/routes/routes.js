var express = require('express')
var {getDashboard} = require('../controllers/controllers')

const router  = express.Router();

router.get('/', getDashboard)


module.exports = router;