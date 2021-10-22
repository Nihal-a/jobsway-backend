var express = require('express')
var {getDashboard,registerCompany, loginCompany} = require('../controllers/controller')

const router  = express.Router();

router.get('/', getDashboard)
router.post('/register', registerCompany)
router.post('/login', loginCompany)


module.exports = router;