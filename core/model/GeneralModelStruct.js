const mongoose=require('mongoose')
const Schema=mongoose.Schema

class GeneralModelStruct{

    ReturnToModel(schema=Schema,name=String){
        return mongoose.model(name,schema)
    }
}

module.exports=GeneralModelStruct