const {check ,validationResult}=require('express-validator');


module.exports.validateRequest =[
    check('first_name')
    .notEmpty()
    .withMessage("First name is required"),
    check('last_name')
    .notEmpty()
    .withMessage("Last name is required"),
    check('email')
    .notEmpty()
    .withMessage("Email name is required"),
    check('password')
    .isLength({min:6})
    .withMessage("passwrod length is minimum 6")
    .notEmpty()
    .withMessage("password name is required"),
   
    
]


module.exports.validateRequestSignIn =[
    check('email')
    .notEmpty()
    .withMessage("Email name is required"),
    check('password')
    .isLength({min:6})
    .withMessage("passwrod length is minimum 6")
    .notEmpty()
    .withMessage("password name is required"),
    
]

module.exports.isRequestValidated = (req,res,next)=>{

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array()[0].msg});
    }
    next();
}