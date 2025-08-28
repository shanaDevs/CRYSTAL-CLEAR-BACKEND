import bodyParser from "body-parser";
import express from "express";
import mongoose from "mongoose";
import userRouter from "./routes/userRouter.js";
import productRouter from "./routes/productRouter.js";
import verifyJwt from "./middleware/auth.js";
import orderRouter from "./routes/orderRouter.js";

let app = express();
mongoose
  .connect(
    "mongodb+srv://root:1234@cluster1.0v7ki1f.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1"
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

app.use(bodyParser.json());
app.use(verifyJwt);

app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/order", orderRouter);

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
