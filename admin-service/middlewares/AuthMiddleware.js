var jwt = require('jsonwebtoken')
var {check,validationResult} = require('express-validator')

module.exports = {
    validateSignin : [
        check('email','Enter a valid email address').exists().isEmail(),
        check('password','Password must be 8 characters long').exists().isLength({min : 8}),
    ]
}
