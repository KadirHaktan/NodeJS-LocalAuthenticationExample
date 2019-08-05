
const express=require('express')
const router=express.Router()

const UserController=require('../controllers/userController')

router.get('/login',UserController.getLoginUser)
router.get('/register',UserController.getRegisterUser)
router.post('/login',UserController.PostLoginUser)
router.post('/register',UserController.PostRegisterUser)



module.exports=router