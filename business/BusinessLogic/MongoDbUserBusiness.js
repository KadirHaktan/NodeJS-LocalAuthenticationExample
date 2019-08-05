
const MongoDbUserDataAccessLayer = require('../../database/MongoDB/MongoDbUserDataAccessLayer')
const validate = require('../../core/validation/ValidationTool').UserValidate
const UserValidation = require('../Validations/UserValidation').UserLoginValidationRules
const bcrypt=require('bcryptjs')

const express=require('express')
const req=express.request


class MongoDbUserBusiness {

    constructor(mongoDal) {
        this.mongoDAL = new MongoDbUserDataAccessLayer()
        mongoDal = this.mongoDAL
    }

    Add(UserName, Password, Email, res, activityPage) {
        const ValidationError = UserValidation(UserName, Password)
        validate(res, activityPage, ValidationError, UserName, Password)
        bcrypt.genSalt(10, (err, salt) => {
            if(err){
                throw err
            }
            bcrypt.hash(Password, salt, (err, hash) => {
                if (err) {
                    throw err
                }

                const promise = this.mongoDAL.Add(UserName, hash, Email)

                return promise.then(user=>{
                    //req.flash("Success","Register success")
                    res.redirect("/")
                }).catch(err=>{
                    console.log(err)
                })
               
            })
        })
       

    }

    GetByUserName(UserName){
        return this.mongoDAL.GetOne(UserName)
    }

    GetByID(id,callback){
          return this.mongoDAL.GetByID(id,callback)
    }


    Delete(_id) {
        return this.mongoDAL.Delete(_id)
    }

    GetAll() {
        return this.mongoDAL.GetAll()
    }

    Update(_id) {
        return this.mongoDAL.Update(_id)
    }


}

module.exports = MongoDbUserBusiness