const router=require('express').Router();
const { requireSignin, adminMiddleWare } = require('../common-middleware');
const { createCategory, getCategory } = require('../controller/category');



router.post('/category/create',requireSignin,adminMiddleWare,createCategory);
router.get('/category/fetchall',getCategory);

module.exports=router;