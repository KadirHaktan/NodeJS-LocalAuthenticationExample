
module.exports.UserLoginValidationRules=(UserName,Password)=>{

    const errors=[]

    if(UserName === ""){
        errors.push("UserName can not pass to Null")
    }

    if(Password=== ""){
        errors.push("Password can not be Null")
    }

    if(Password.length<6){
        errors.push("Password minimum length should be 6 ")
    }
    return errors
}