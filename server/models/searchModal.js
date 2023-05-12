import mongoose from "mongoose";
const { Schema } = mongoose;

const searchSchema = new Schema({
  user: {
    required: true,
    type: String,
  },
  search_items: [
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "itemModal",
        required: true,
      
    }
  ],

  searchTxt : {
    required: true,
    type:String
  },

  totalSearchItems : {
    required: true,
    type:Number
  },

  date: { type: Date, default: Date.now },
});

const searchModal = mongoose.model("searchModal", searchSchema);

export default searchModal;
