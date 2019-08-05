const mongoose=require('mongoose')

module.exports=(url)=>{
    mongoose.connect(url)

    mongoose.connection.on("error",(err)=>{
        console.log(err)
    })

    mongoose.connection.on("open",()=>{
        console.log("There is no problem about connection!!!")
    })
}
