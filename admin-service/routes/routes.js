var express = require('express')
var {getDashboard ,signin} = require('../controllers/controllers')

const router  = express.Router();

router.get('/', getDashboard)
router.post('/signin',signin)


module.exports = router;