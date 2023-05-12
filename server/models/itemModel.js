import mongoose from "mongoose";
const { Schema } = mongoose;

const itemSchema = new Schema({
  title: {
    type: String,
    required: true,
  },

  author: String,

  price: {
    type: Number,
    required: true,
  },

  image: {
    type: String,
    default: "",
    required: true,
  },

  description: {
    type: String,
    require:true, 
  },

  ageRating:{
    type: String,
    require:true, 
    default:0
  },
  colors: String,

  date: { type: Date, default: Date.now },
});

itemSchema.index({ author:"text", title: 'text', description: 'text'});

const itemModal = mongoose.model("itemModal", itemSchema);

export default itemModal;
