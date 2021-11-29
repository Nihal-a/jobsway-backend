var express = require('express');
const {registerCompany, loginCompany,reregisterCompany} = require('../controllers/Auth');
const { getCompanyDetails ,  addJob ,addJobPayment ,verifyPayment, addFreeJob,getCompanyJobs ,addTransaction,stripePayment ,getJobById} = require('../controllers/Company');
const { validateCompanyRegistration, valdiateJobDetails } = require('../middlewares/JobVerification');


const router  = express.Router();

//Auth
router.post('/register',validateCompanyRegistration,registerCompany)
router.post('/login', loginCompany)
router.patch('/reregister', reregisterCompany)


//Company
router.get('/company/:id', getCompanyDetails)

//Jobs
router.post('/add-job' ,valdiateJobDetails,addJob)
router.get('/jobs/:id' , getCompanyJobs)
router.get('/job/:id' , getJobById)




//Payment
        router.post('/add-transaction',addTransaction)
        router.post('/addjobpayment', addJobPayment)
        router.post('/verify-payment', verifyPayment)
        router.post('/add-free-plan', addFreeJob)
        
        //Stripe
        router.post('/create-payment-intent' , stripePayment)
        



module.exports = router;