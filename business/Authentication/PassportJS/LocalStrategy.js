

const LocalStrategy=require('passport-local').Strategy
const passport=require('passport')
const bcrypt=require('bcryptjs')
const MongoDbUserDataAccessLayer=require('../../../database/MongoDB/MongoDbUserDataAccessLayer')
const MongoDbUserBusiness=require('../../BusinessLogic/MongoDbUserBusiness')

const dal=new MongoDbUserDataAccessLayer()
const business=new MongoDbUserBusiness(dal)

passport.use(new LocalStrategy({usernameField:"UserName",passwordField:"Password"},(UserName,Password,done)=>{

    business.mongoDAL.User.findOne({UserName},(err,user)=>{
        if(err){
            return done(err,null,"There is a error!!!")
        }

        if(!user){
            return done(null,false,"User can not be found!!!")
        }

        bcrypt.compare(Password,user.Password,(err,res)=>{
            if(res){
                return done(null,user,"Succesfully Logged In")
            }
           
            return done(null,false,"Incorrect password or name")
        
        })
    })     
}))

passport.serializeUser((user, done) => {
     done(null, user._id);
  });
  
  passport.deserializeUser((id, done) => {
   
    business.mongoDAL.User.findById(id,(err,res)=>{
        done(err,user)
    })
    
})
