var express = require('express')
const {registerCompany, loginCompany,reregisterCompany} = require('../controllers/Auth');
const { getCompanyDetails ,  addJob ,addJobPayment ,verifyPayment, addFreeJob,getCompanyJobs ,addTransaction} = require('../controllers/Company');


const router  = express.Router();

//Auth
router.get('/company/:id', getCompanyDetails)
router.post('/register', registerCompany)
router.post('/login', loginCompany)
router.patch('/reregister', reregisterCompany)


//Company
router.post('/add-job' , addJob)
router.get('/jobs/:id' , getCompanyJobs)


//Payment
    //Razorpay
        router.post('/addjobpayment', addJobPayment)
        router.post('/verify-payment', verifyPayment)
        router.post('/add-free-plan', addFreeJob)
        
        //Stripe
        
        



module.exports = router;