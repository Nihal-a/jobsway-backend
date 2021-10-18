var express = require('express')
var {getDashboard,signup} = require('../controllers/controller')

const router  = express.Router();

router.get('/', getDashboard)

router.post('/signup',signup)

module.exports = router;