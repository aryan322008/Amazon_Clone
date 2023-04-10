import mongoose from 'mongoose';
const { Schema } = mongoose;

const itemSchema = new Schema({
  title: {
    type: String,
    required:true
},
  author: String,

  price:{
    type: Number,
    required:true
},

rating:{
    type: Number,
    required:true
},

image: String,

size:{
    type: String,
},

color:String,

qty:{
    type: Number,
    required:true,
},

  date: { type: Date, default: Date.now },
});


const itemModal = mongoose.model('itemModal', itemSchema);

export default itemModal