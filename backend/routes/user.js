const router = require('express').Router();

const { signup, signin }=require('../controller/auth');
const { validateRequest, isRequestValidated, validateRequestSignIn } = require('../validators/auth');



router.post('/signup',validateRequest,isRequestValidated,signup );
router.post('/signin', validateRequestSignIn,isRequestValidated,signin);


// router.post('/profile', requireSignin, (req,res)=>{
//     res.status(200).json("user profile")
// });


module.exports = router;
