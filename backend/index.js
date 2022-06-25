const express=require('express');
const mongoose=require('mongoose');
const env=require('dotenv');
const bodyParser=require('body-parser');
const { json } = require('body-parser');

env.config();

const app=express();
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/flipkartClone')
.then(()=>{
    console.log("connected to database")
}).catch((err)=>{console.log(err)});


const userRouter=require('./routes/user');
const adminRouter=require('./routes/admin/user');

app.use('/api',userRouter);
app.use('/api',adminRouter);


app.listen(process.env.PORT,()=>{
    console.log(`connected to port ${process.env.PORT}`);
})