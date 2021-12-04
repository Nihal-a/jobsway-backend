var {check} = require('express-validator')

module.exports = {
    validateApplyJob : [
        check('email','Enter a valid email address').exists().isEmail(),
        check('firstName','First name must be 3 characters long').exists().isLength({min : 3}),
        check('lastName','Last name cannot be blank').exists().isLength({min : 1}),
        check('location' , 'Enter a valid location').exists(),
        check('phone' , 'Enter a valid Phone number').exists().isLength({min : 10}),
        check('experience' , 'Enter a valid Phone number').exists(),
        check('portfolio' , 'You must upload your Portfolio link').exists(),
        check('upload' , 'You must upload your Resume').notEmpty(),
        check('photo' , 'You must upload your Photo')
    ],
}



