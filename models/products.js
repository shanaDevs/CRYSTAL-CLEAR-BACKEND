import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  productId: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  altnames:{
    type: [String],
    default: [],
  },
  price: {
    type: Number,
    required: true,
  },
  labeledPrice:{
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  images:{
    type: [String],
    required: true,
    default: ["https://tse4.mm.bing.net/th/id/OIP.-TtQuPhug-niTY5lVHc7agHaHa?pid=Api&P=0&h=220"],
  },
  stock: {
    type: Number,
    required: true,
  },
});

const Products = mongoose.model("Products", productSchema);
export default Products;
