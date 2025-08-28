import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  orderID: {
    type: String,
    required: true,
    unique: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  email: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  billItems: {
    type: [
      {
        productId: String,
        productName: String,
        image: String,
        quantity: Number,
        price: Number
      }
    ]
  },
  total: {
    type: Number,
    required: true
  }
});

const Order = mongoose.model("Orders", orderSchema);

export default Order;
