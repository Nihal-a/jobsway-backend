var express = require('express')
var {getDashboard,signup,signin} = require('../controllers/controller')
var auth = require('../middlewares/AuthMiddleware')

const router  = express.Router();

router.get('/',getDashboard)
router.post('/signup',signup)
router.post('/signin',signin)

module.exports = router;