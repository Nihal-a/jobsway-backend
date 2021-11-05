var express = require('express')
var {getDashboard,registerCompany, loginCompany,reregisterCompany} = require('../controllers/controller')

const router  = express.Router();

router.get('/', getDashboard)
router.post('/register', registerCompany)
router.post('/login', loginCompany)
router.patch('/reregister', reregisterCompany)


module.exports = router;