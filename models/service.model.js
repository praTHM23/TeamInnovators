const mongoose=require("mongoose") 

const Service=new mongoose.Schema({
    userID:{type:mongoose.Schema.Types.ObjectId,required:true,ref: 'user'},
    occupation:{type:String},
    serviceTitle:{type:String,required:true},
    serviceDescription:{type:String},
    location:{type:String},
    serviceImage: {type:String},
    tags:{type:String}
},{ timestamps: true })

module.exports=mongoose.model("Service",Service)