const mongoose=require('mongoose');


const userSchema =new mongoose.Schema({

        first_name:{
            type:String,
            required:true,
            trim:true,
        },
        last_name:{
            type:String,
            required:true,
            trim:true,
        },
        password:{
            type:String,
            required:true
        },
        email:{
            type:String,
            unique:true,
            required:true
        },
        image:{
            type:String
        },
        role:{
            type:String,
            enum:["user","admin"],
            default:"user"
        },
        contact_no:{
            type:String
        }


},{timestamps:true});


userSchema.virtual('fullname')
.get(function(){
    return `${this.first_name} ${this.last_name}`;
})



module.exports=mongoose.model('User',userSchema);
