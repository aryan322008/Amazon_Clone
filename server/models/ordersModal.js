import mongoose from "mongoose";
const { Schema } = mongoose;

const ordersSchema = new Schema({
  user: {
    type: String,
    required: true,
  },
  orders: [
    {
      products: [
        {
          item: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "itemModal",
            required: true,
          },
          qty: {
            type: Number,
            required: true,
          },
        },
      ],
      subtotal : {
        required: true,
        type:Number
      },
      date: { type: Date, default: Date.now },
    },
  ],
});

const ordersModal = mongoose.model("ordersModal", ordersSchema);

export default ordersModal;
