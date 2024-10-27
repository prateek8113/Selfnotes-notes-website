const mongoose = require('mongoose');
const { Schema } = mongoose;

const userNotes = new Schema({
    user:{
        type : mongoose.Schema.Types.ObjectId,
        ref:'user'

    },
    title:{type:String },
    description:{type:String },
    tag:{type:String },
    date:{type:Date , default:Date.now} 
 
});
module.exports=mongoose.model('notes',userNotes);