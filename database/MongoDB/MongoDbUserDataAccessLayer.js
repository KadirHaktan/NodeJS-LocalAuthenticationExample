
const User=require('../../models/User')

class MongoDbUserDataAccessLayer{


    constructor(){
        this.User=User
    }

    Add(userName,Password,Email){  
        const user=new this.User({
            UserName:userName,
            Password:Password,
            Email:Email
        })

        return user.save()
    }

    GetAll(){
        return this.User.find({})
    }

    GetByID(id,callback){
        return this.User.findById(id)
    }

    Delete(_id){
       return this.User.findByIdAndRemove(_id)
    }

    Update(_id){
       return this.User.findByIdAndUpdate(_id)
    }

    GetOne(object){
        return this.User.findOne({
            object
        })
    }
}

module.exports=MongoDbUserDataAccessLayer