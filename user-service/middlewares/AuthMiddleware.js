var {check} = require('express-validator')

module.exports = {
    validateSignUp : [
        check('email','Enter a valid email address').exists().isEmail(),
        check('password').exists().isLength({min : 8}).withMessage('Password Must be 8 char long'),
        check('firstName','First name must be 3 characters long').exists().isLength({min : 3}),
        check('lastName','Last name cannot be blank').exists().isLength({min : 1})
    ]
}
