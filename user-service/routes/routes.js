var express = require('express')
var {getDashboard,signup,signin,verifyOtp,sendOtp} = require('../controllers/controller')
var auth = require('../middlewares/AuthMiddleware')

const router  = express.Router();

router.get('/',getDashboard)
router.post('/signup',signup)
router.post('/signin',signin)
router.post('/sendotp',sendOtp)
router.post('/verifyotp',verifyOtp)
module.exports = router;