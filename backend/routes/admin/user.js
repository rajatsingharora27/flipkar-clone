const router = require('express').Router();

const { signup, signin }=require('../../controller/admin/auth');
const { validateRequest, isRequestValidated, validateRequestSignIn } = require('../../validators/auth');



router.post('/admin/signup',validateRequest,isRequestValidated,signup );
router.post('/admin/signin',validateRequestSignIn,isRequestValidated, signin);


// router.post('/profile', requireSignin, (req,res)=>{
//     res.status(200).json("user profile")
// });


module.exports = router;
