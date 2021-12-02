var express = require('express')
const {getDashboard,signup,signin,verifyOtp,sendOtp, googlesign} = require('../controllers/authController');
const { getCompanyDetails, getAllCompanies } = require('../controllers/compnayControllers');
const { getFeaturedJobs, getAllJobs } = require('../controllers/jobControllers');
const {validateSignUp} = require('../middlewares/AuthMiddleware')

const router  = express.Router();

router.get('/',getDashboard)

// Auth Routes.
router.post('/signup',validateSignUp,signup)
router.post('/signin',signin)
router.post('/sendotp',sendOtp)
router.post('/verifyotp',verifyOtp)
router.post('/googlesign',googlesign)

//Jobs
router.get('/getfeaturedjobs',getFeaturedJobs)
router.get('/getjobs' , getAllJobs)

//company
router.get('/companies' , getAllCompanies)
router.get('/getcompany/:id' , getCompanyDetails)

module.exports = router;