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
    valdiateJobDetails : [
        check('jobTitle','Enter Job Title').exists(),
        check('jobCategory','Enter Job Category').exists(),
        check('minExp','Enter a valid Experience year').exists().isNumeric(),
        check('maxExp','Enter a valid Experience year').exists().isNumeric(),
        check('minSalary','Enter a valid Salary').exists().isNumeric().isLength({min:0}),
        check('maxSalary','Enter a valid Salary').exists().isNumeric().isLength({min:10}),
        check('timeSchedule','Choose Full time or part time').exists(),
        check('qualification','Enter a qualification').exists(),
        check('education','Enter Education').exists(),
        check('jobLocation','Enter Job Location').exists(),
        check('skills','Enter Job Skills').exists(),
        check('language','Enter Job Languages').exists(),
    ]
}



