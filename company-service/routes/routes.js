var express = require('express')
var {getCompanyDetails,registerCompany, loginCompany,reregisterCompany} = require('../controllers/controller')

const router  = express.Router();

router.get('/company/:id', getCompanyDetails)
router.post('/register', registerCompany)
router.post('/login', loginCompany)
router.patch('/reregister', reregisterCompany)


module.exports = router;