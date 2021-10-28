var express = require('express')
var {getDashboard,signup,signin,verifyOtp,sendOtp, googlesign} = require('../controllers/authController')
var auth = require('../middlewares/AuthMiddleware')

const router  = express.Router();

router.get('/',getDashboard)

// Auth Routes.
router.post('/signup',signup)
router.post('/signin',signin)
router.post('/sendotp',sendOtp)
router.post('/verifyotp',verifyOtp)
router.post('/googlesign',googlesign)


module.exports = router;