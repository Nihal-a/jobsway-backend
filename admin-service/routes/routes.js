var express = require('express')
var { signin} = require('../controllers/authControllers')
var {getUnVerifiedCompanies,verifyCompany,getVerifiedCompanies,rejectCompany} = require('../controllers/companyController')

const router  = express.Router();

//company routes
router.get('/', getUnVerifiedCompanies)
router.get('/companies', getVerifiedCompanies)
router.patch('/company/approve',verifyCompany)
router.patch('/company/reject',rejectCompany)


//Auth routes
router.post('/signin',signin)


module.exports = router;