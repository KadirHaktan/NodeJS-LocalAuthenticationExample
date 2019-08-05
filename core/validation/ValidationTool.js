


module.exports.UserValidate=(res,activityPage,errors=[],UserName,Password)=>{
    if(errors.length>0){
      return res.render(`pages/${activityPage}`,{
          Errors:errors,
          username:UserName,
          password:Password
       })   

    }

    return res.redirect('/')
}