var express = require('express')
var {getDashboard,signup,signin} = require('../controllers/controller')

const router  = express.Router();

router.get('/', getDashboard)

router.post('/signup',signup)
router.post('/signin',signin)

module.exports = router;