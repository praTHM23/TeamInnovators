const mongoose=require("mongoose") 

const Post=new mongoose.Schema({
    UserID:{type:mongoose.Schema.Types.ObjectId,required:true,ref: 'user'},
    photo_link:{type:String},
    caption:{type:String}
    
}, { timestamps: true })

module.exports=mongoose.model("Post",Post) 