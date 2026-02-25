import mongoose from "mongoose";
const todoSchema = new mongoose.Schema ({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    Status:{
        type:String,
        enum:["pending","inprogress","completed"],
        default:"pending"
    }

},{timestamps:true});
const Todomodel = mongoose.model("Todo",todoSchema);
export default Todomodel;
