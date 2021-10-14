var express = require('express')
var {getDashboard} = require('../controllers/controller')

const router  = express.Router();

router.get('/', getDashboard)


module.exports = router;