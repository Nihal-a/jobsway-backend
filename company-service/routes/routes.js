var express = require('express')
const {registerCompany, loginCompany,reregisterCompany} = require('../controllers/Auth');
const { getCompanyDetails ,  addJob} = require('../controllers/Company');


const router  = express.Router();

//Auth
router.get('/company/:id', getCompanyDetails)
router.post('/register', registerCompany)
router.post('/login', loginCompany)
router.patch('/reregister', reregisterCompany)


//Company
router.post('/add-job' , addJob)

module.exports = router;