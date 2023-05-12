import mongoose from "mongoose";
const { Schema } = mongoose;

const currentOrdersModalSchema = new Schema({
  user: {
    required: true,
    type: String,
  },
  orders: [ {
    item: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "itemModal",
      required:true
    },
    qty:{
      type: Number,
      required: true
    }
  }],

  date: { type: Date, default: Date.now },
});

const currentOrdersModal = mongoose.model(
  "currentOrdersModal",
  currentOrdersModalSchema
);

export default currentOrdersModal;
