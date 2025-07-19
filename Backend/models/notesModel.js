import mongoose from "mongoose";

const notesSchema = new mongoose.Schema({
    title:{type:String,required:true},
    content:{type:String,required:true,unique:true},
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
},{timestamps:true})

const notesModel =  mongoose.model('Note',notesSchema)
export default notesModel