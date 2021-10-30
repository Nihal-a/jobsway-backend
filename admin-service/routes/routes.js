var express = require('express')
var { signin} = require('../controllers/authControllers')
var {getUnVerifiedCompanies,verifyCompany} = require('../controllers/companyController')

const router  = express.Router();

//company routes
router.get('/', getUnVerifiedCompanies)
router.patch('/',verifyCompany)


//Auth routes
router.post('/signin',signin)


module.exports = router;