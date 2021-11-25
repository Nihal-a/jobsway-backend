var {check} = require('express-validator')

module.exports = {
    validateCompanyRegistration : [
        check('companyName','Company should have a name.').exists(),
        check('industry','Company should have an industry').exists(),
        check('location','Company should have a location').exists(),
        check('email','Enter a valid email address').exists().isEmail(),
        check('bio','Bio should be 20 words long').exists().isLength({min:100}),
        check('phone','Enter a valid mobile number').exists().isLength({min:10,max:10}),
        check('image','Company logo should be uploaded').exists().isLength({min:10,max:10}),
        check('password').exists().isLength({min : 8}).withMessage('Password Must be 8 char long'),
    ],
}



