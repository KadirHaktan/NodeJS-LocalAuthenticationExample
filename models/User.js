

const mongoose=require('mongoose')

const Schema=mongoose.Schema

const GeneralModelStruct=require('../core/model/GeneralModelStruct')

const generalModelStruct=new GeneralModelStruct()


const UserSchema=new Schema({
    UserName:{
        type:String,
        required:true
    },
    Password:{
        type:String,
        required:true
    },
    Email:{
        type:String,
        required:true
    }
})


module.exports=generalModelStruct.ReturnToModel(UserSchema,"User")

