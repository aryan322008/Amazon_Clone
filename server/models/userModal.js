import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },

  admin: {
    type: Boolean,
    required: true,
  },

  admin_id:{
    type: String,
    required: true,
  },

  cart: [
    {
      item: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "itemModal",
        required:true
      },
      
      qty:{
        type:Number,
        required:true,
        default:1
      }
    },
  ],

  my_products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "itemModal",
    },
  ],

  date: {
    type: Date,
    default: Date.now,
  },
  verification_code:{
    type: String
  },
});

const userModal = mongoose.model("userModal", userSchema);

export default userModal;
