

const express=require('express')
const app=express()
const connectionHelper=require('./database/MongoDB/MongoDbHelper')("mongodb://localhost/LoginDb")
const body_parser=require('body-parser')
const MongoDbUserDataAccessLayer=require('./database/MongoDB/MongoDbUserDataAccessLayer')
const MongoDbUserBusiness=require('./business/BusinessLogic/MongoDbUserBusiness')
const dal=new MongoDbUserDataAccessLayer()
const business=new MongoDbUserBusiness(dal)
const flash=require('connect-flash')
const cookieParser=require('cookie-parser')
const session=require('express-session')
const passport=require('passport')
const passportLocal=require('passport-local')


const exphnbrs=require('express-handlebars')

const PORT=5199 || process.env.PORT

app.engine('handlebars',exphnbrs({"defaultLayout":"mainLayout"}))
app.set('view engine','handlebars')


app.use(cookieParser("passportJS App"))
app.use(session({cookie:{ maxAge: 60000 },resave:true,saveUninitialized:true,secret:"LoginApp"}))
app.use(flash())

app.use(passport.initialize())
app.use(passport.session())

app.use(body_parser.urlencoded({extended:false}))

app.use((req,res,next)=>{
    res.locals.Success=req.flash("Success")
    res.locals.Error=req.flash("Error")

    
    res.locals.success=req.flash("success")
    res.locals.error=req.flash("error")


    req.user=res.locals.user


    next()
})


const userRouter=require('./routes/user')
app.use(userRouter)

app.get('/',(req,res,next)=>{

    business.GetAll().then(users=>{
        res.render('pages/index',{users:users})
    }).catch(err=>console.log(err))
    
})
app.use((req,res,next)=>{
    
    res.render('static/404')
})




app.listen(PORT,()=>{
    console.log("Listening to PORT")
})








