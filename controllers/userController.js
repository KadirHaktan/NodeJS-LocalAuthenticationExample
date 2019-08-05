const MongoDbUserDataAccessLayer = require('../database/MongoDB/MongoDbUserDataAccessLayer')
const MongoDbUserBusiness = require('../business/BusinessLogic/MongoDbUserBusiness')
const passport=require('passport')

require('../business/Authentication/PassportJS/LocalStrategy')

const dal = new MongoDbUserDataAccessLayer()
const business = new MongoDbUserBusiness(dal)






module.exports.getLoginUser = (req, res, next) => {
    res.render('pages/login')
}


module.exports.getRegisterUser = (req, res, next) => {
    res.render('pages/register')
}


module.exports.PostLoginUser = (req, res, next) => {
    passport.authenticate("local",{
        successRedirect:"/",
        failureRedirect:"/login",
        failureFlash:true,
        successFlash:true
    })(req,res,next)
}

module.exports.PostRegisterUser = (req, res, next) => {
    const UserName = req.body.UserName
    const Password = req.body.Password
    const Email = req.body.Email
    const errors = []


    business.mongoDAL.User.findOne({ UserName }).then(user => {
        if (user) {
            errors.push({ "message": "UserName already in exists" })
            return res.render('pages/register', {
                UserName: UserName,
                Password: Password,
                Email: Email,
                errors: errors
            })
        }

         business.Add(UserName, Password, Email, res, "/register")
    })


    




}


