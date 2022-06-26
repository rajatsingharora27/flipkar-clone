const mongoose =require('mongoose');

const categorySchema =new mongoose.Schema({

    name:{
        type:String,
        trim:true,
        required:true,
        unique:true,
    },
    slug:{
        type:String,
        trim:true,
        required:true,
        unique:true,
    },
    parentId:{
        type:String
    }
},{timestamps:true});

module.exports = mongoose.model('Category',categorySchema);