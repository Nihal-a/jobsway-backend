var express = require('express')
var { signin} = require('../controllers/authControllers')
var { getUnVerifiedCompanies,verifyCompany,getVerifiedCompanies,rejectCompany,banCompany,bannedCompanies} = require('../controllers/companyController');
var { getUsers,banUser,bannedUsers,unBanUser} = require('../controllers/userController');
var auth = require('../middlewares/AuthMiddleware')

const router  = express.Router();

//Auth routes
router.post('/signin',signin)


//company routes
router.get('/',getUnVerifiedCompanies)
router.get('/companies', getVerifiedCompanies)
router.patch('/company/approve',verifyCompany)
router.patch('/company/reject',rejectCompany)
router.patch('/company/ban',banCompany)
router.get('/companies/banned',bannedCompanies)


//Users
router.get('/users',getUsers)
router.patch('/user/ban',banUser)
router.patch('/user/unban',unBanUser)
router.get('/users/banned',bannedUsers)






module.exports = router;